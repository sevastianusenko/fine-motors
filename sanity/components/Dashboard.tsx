"use client";

import { useEffect, useState } from "react";
import { useClient } from "sanity";

type Vehicle = {
  _id: string;
  make: string;
  model: string;
  year: number;
  status: string;
  price: number;
  purchasePrice?: number;
  soldPrice?: number;
  soldDate?: string;
  _createdAt: string;
};

function fmt(n: number) { return new Intl.NumberFormat("en-US").format(n); }
function fmtPrice(n: number) { return "$" + fmt(n); }

function getMonthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string) {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function Dashboard() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading]   = useState(true);
  const [calMonth, setCalMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    client.fetch<Vehicle[]>(`
      *[_type == "vehicle"] | order(_createdAt desc) {
        _id, make, model, year, status, price,
        purchasePrice, soldPrice, soldDate, _createdAt
      }
    `).then(data => { setVehicles(data); setLoading(false); });
  }, [client]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#888" }}>
        Loading dashboard…
      </div>
    );
  }

  const now         = new Date();
  const thisMonthKey = getMonthKey(now.toISOString());

  const available = vehicles.filter(v => v.status === "available").length;
  const pending   = vehicles.filter(v => v.status === "pending").length;
  const soldAll   = vehicles.filter(v => v.status === "sold");
  const soldThisMonth = soldAll.filter(v => v.soldDate && getMonthKey(v.soldDate) === thisMonthKey);

  const revenueThisMonth = soldThisMonth.reduce((s, v) => s + (v.soldPrice || v.price || 0), 0);
  const profitThisMonth  = soldThisMonth.reduce((s, v) => {
    const sp = v.soldPrice || v.price || 0;
    const pp = v.purchasePrice || 0;
    return s + (pp ? sp - pp : 0);
  }, 0);

  // Calendar logic
  const [calYear, calMonthNum] = calMonth.split("-").map(Number);
  const daysInMonth = getDaysInMonth(calYear, calMonthNum - 1);
  const firstDow    = new Date(calYear, calMonthNum - 1, 1).getDay();

  type DayEvent = { type: "published" | "sold" | "pending"; label: string; color: string };
  const dayEvents: Record<number, DayEvent[]> = {};

  vehicles.forEach(v => {
    const pub = new Date(v._createdAt);
    if (pub.getFullYear() === calYear && pub.getMonth() + 1 === calMonthNum) {
      const d = pub.getDate();
      dayEvents[d] = dayEvents[d] || [];
      dayEvents[d].push({ type: "published", label: `${v.year} ${v.make} ${v.model}`, color: "#10b981" });
    }
    if (v.soldDate) {
      const sd = new Date(v.soldDate);
      if (sd.getFullYear() === calYear && sd.getMonth() + 1 === calMonthNum) {
        const d = sd.getDate();
        dayEvents[d] = dayEvents[d] || [];
        dayEvents[d].push({ type: "sold", label: `SOLD: ${v.year} ${v.make} ${v.model}`, color: "#ef4444" });
      }
    }
    if (v.status === "pending") {
      const pub2 = new Date(v._createdAt);
      if (pub2.getFullYear() === calYear && pub2.getMonth() + 1 === calMonthNum) {
        const d = pub2.getDate();
        // mark the published dot as pending color instead
        if (dayEvents[d]) {
          dayEvents[d] = dayEvents[d].map(e =>
            e.type === "published" && e.label.includes(`${v.year} ${v.make}`)
              ? { ...e, type: "pending", color: "#f59e0b" }
              : e
          );
        }
      }
    }
  });

  // Monthly sales history (last 6 months)
  const monthHistory: { key: string; count: number; revenue: number; profit: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d  = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mk = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const ms = soldAll.filter(v => v.soldDate && getMonthKey(v.soldDate) === mk);
    monthHistory.push({
      key:     mk,
      count:   ms.length,
      revenue: ms.reduce((s, v) => s + (v.soldPrice || v.price || 0), 0),
      profit:  ms.reduce((s, v) => { const sp = v.soldPrice || v.price || 0; const pp = v.purchasePrice || 0; return s + (pp ? sp - pp : 0); }, 0),
    });
  }
  const maxRev = Math.max(...monthHistory.map(m => m.revenue), 1);

  const prevMonth = () => {
    const d = new Date(calYear, calMonthNum - 2, 1);
    setCalMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  };
  const nextMonth = () => {
    const d = new Date(calYear, calMonthNum, 1);
    setCalMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  };

  const calCells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const recentSold = soldAll
    .filter(v => v.soldDate)
    .sort((a, b) => (b.soldDate! > a.soldDate! ? 1 : -1))
    .slice(0, 5);

  // ── styles ────────────────────────────────────────────────────────────────
  const s: Record<string, React.CSSProperties> = {
    root:       { fontFamily: "system-ui, sans-serif", background: "#f8f9fa", minHeight: "100%", padding: "32px 28px", color: "#1a1a1a" },
    h1:         { fontSize: 22, fontWeight: 800, marginBottom: 6, color: "#111" },
    sub:        { fontSize: 13, color: "#888", marginBottom: 28 },
    grid4:      { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 },
    grid2:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 },
    card:       { background: "#fff", borderRadius: 16, padding: "20px 22px", boxShadow: "0 1px 4px rgba(0,0,0,.07)" },
    cardLabel:  { fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1, color: "#aaa", marginBottom: 6 },
    cardValue:  { fontSize: 30, fontWeight: 900, lineHeight: 1, color: "#111" },
    cardSub:    { fontSize: 12, color: "#aaa", marginTop: 4 },
    sectionH:   { fontSize: 13, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1, color: "#aaa", marginBottom: 14 },
    calHeader:  { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
    calTitle:   { fontSize: 15, fontWeight: 700 },
    calBtn:     { background: "none", border: "1px solid #e5e7eb", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 16, color: "#555" },
    dayLabels:  { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 4 },
    dayLabel:   { textAlign: "center" as const, fontSize: 11, color: "#aaa", fontWeight: 600, padding: "2px 0" },
    calGrid:    { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 },
    dayCell:    { minHeight: 56, background: "#f9fafb", borderRadius: 8, padding: "4px 6px", fontSize: 12, position: "relative" as const },
    dayCellNum: { fontWeight: 700, color: "#555", fontSize: 12, marginBottom: 2 },
    dot:        { fontSize: 10, borderRadius: 4, padding: "1px 5px", marginBottom: 2, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" },
    barWrap:    { display: "flex", alignItems: "flex-end", gap: 8, height: 80, marginBottom: 8 },
    barLabel:   { fontSize: 10, color: "#aaa", textAlign: "center" as const, marginTop: 4 },
    listItem:   { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f0f0" },
    legend:     { display: "flex", gap: 14, marginBottom: 12, flexWrap: "wrap" as const },
    legendDot:  { width: 10, height: 10, borderRadius: 3, display: "inline-block", marginRight: 5 },
  };

  return (
    <div style={s.root}>
      <div style={s.h1}>📊 Business Dashboard</div>
      <div style={s.sub}>Fine Motors LLC · Updated in real-time</div>

      {/* ── KPI CARDS ── */}
      <div style={s.grid4}>
        {[
          { label: "Available",     value: available, color: "#10b981", sub: "on website now" },
          { label: "Sale Pending",  value: pending,   color: "#f59e0b", sub: "in progress" },
          { label: "Sold This Month", value: soldThisMonth.length, color: "#ef4444", sub: monthLabel(thisMonthKey) },
          { label: "Total Sold",    value: soldAll.length, color: "#6366f1", sub: "all time" },
        ].map(k => (
          <div key={k.label} style={{ ...s.card, borderTop: `3px solid ${k.color}` }}>
            <div style={s.cardLabel}>{k.label}</div>
            <div style={{ ...s.cardValue, color: k.color }}>{k.value}</div>
            <div style={s.cardSub}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* ── REVENUE CARDS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, marginBottom: 28 }}>
        <div style={{ ...s.card, borderTop: "3px solid #f59e0b" }}>
          <div style={s.cardLabel}>Revenue This Month</div>
          <div style={{ ...s.cardValue, color: "#f59e0b" }}>{fmtPrice(revenueThisMonth)}</div>
          <div style={s.cardSub}>{soldThisMonth.length} vehicle{soldThisMonth.length !== 1 ? "s" : ""} sold</div>
        </div>
        <div style={{ ...s.card, borderTop: "3px solid #10b981" }}>
          <div style={s.cardLabel}>Profit This Month</div>
          <div style={{ ...s.cardValue, color: profitThisMonth > 0 ? "#10b981" : "#aaa" }}>
            {profitThisMonth > 0 ? "+" : ""}{fmtPrice(profitThisMonth)}
          </div>
          <div style={s.cardSub}>{profitThisMonth > 0 ? "est. from purchase prices" : "enter purchase prices to see profit"}</div>
        </div>
      </div>

      <div style={s.grid2}>

        {/* ── CALENDAR ── */}
        <div style={s.card}>
          <div style={s.calHeader}>
            <div style={s.sectionH}>📅 Calendar</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={s.calBtn} onClick={prevMonth}>‹</button>
              <span style={s.calTitle}>{monthLabel(calMonth)}</span>
              <button style={s.calBtn} onClick={nextMonth}>›</button>
            </div>
          </div>

          <div style={s.legend}>
            {[
              { color: "#10b981", label: "Published" },
              { color: "#f59e0b", label: "Pending" },
              { color: "#ef4444", label: "Sold" },
            ].map(l => (
              <span key={l.label} style={{ fontSize: 11, color: "#666", display: "flex", alignItems: "center" }}>
                <span style={{ ...s.legendDot, background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>

          <div style={s.dayLabels}>
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
              <div key={d} style={s.dayLabel}>{d}</div>
            ))}
          </div>
          <div style={s.calGrid}>
            {calCells.map((day, i) => (
              <div key={i} style={{
                ...s.dayCell,
                background: day === now.getDate() && calMonth === thisMonthKey ? "#fff7ed" : "#f9fafb",
                border: day === now.getDate() && calMonth === thisMonthKey ? "1px solid #f97316" : "1px solid transparent",
              }}>
                {day && (
                  <>
                    <div style={s.dayCellNum}>{day}</div>
                    {(dayEvents[day] || []).slice(0, 2).map((ev, j) => (
                      <div key={j} title={ev.label} style={{ ...s.dot, background: ev.color + "22", color: ev.color }}>
                        {ev.type === "published" ? "📋" : ev.type === "pending" ? "🟡" : "🔴"}
                      </div>
                    ))}
                    {(dayEvents[day] || []).length > 2 && (
                      <div style={{ fontSize: 10, color: "#aaa" }}>+{(dayEvents[day] || []).length - 2}</div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Monthly bar chart */}
          <div style={s.card}>
            <div style={s.sectionH}>📈 Revenue (Last 6 Months)</div>
            <div style={s.barWrap}>
              {monthHistory.map(m => (
                <div key={m.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div title={`${fmtPrice(m.revenue)} · ${m.count} sold`} style={{
                    width: "100%",
                    height: m.revenue > 0 ? `${Math.max(6, (m.revenue / maxRev) * 72)}px` : "4px",
                    background: m.key === thisMonthKey ? "#f97316" : "#e2e8f0",
                    borderRadius: 6,
                    transition: "height .3s",
                    cursor: "default",
                  }} />
                  <div style={s.barLabel}>{new Date(Number(m.key.split("-")[0]), Number(m.key.split("-")[1]) - 1, 1).toLocaleString("en-US", { month: "short" })}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {monthHistory.map(m => (
                <div key={m.key} style={{ flex: 1, textAlign: "center", fontSize: 10, color: m.key === thisMonthKey ? "#f97316" : "#aaa", fontWeight: m.key === thisMonthKey ? 700 : 400 }}>
                  {m.count > 0 ? `${m.count} sold` : "—"}
                </div>
              ))}
            </div>
          </div>

          {/* Recent sales */}
          <div style={s.card}>
            <div style={s.sectionH}>🏁 Recent Sales</div>
            {recentSold.length === 0 && <div style={{ fontSize: 13, color: "#aaa" }}>No sales recorded yet.</div>}
            {recentSold.map(v => (
              <div key={v._id} style={s.listItem}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{v.year} {v.make} {v.model}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>{v.soldDate ? new Date(v.soldDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#10b981" }}>{fmtPrice(v.soldPrice || v.price)}</div>
                  {v.purchasePrice ? (
                    <div style={{ fontSize: 11, color: "#aaa" }}>
                      profit: {v.soldPrice && v.purchasePrice ? `+${fmtPrice(v.soldPrice - v.purchasePrice)}` : "—"}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
