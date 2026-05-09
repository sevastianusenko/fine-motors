import { useState } from "react";
import { StringInputProps, useFormValue, useDocumentOperation } from "sanity";

// ── NHTSA API mappers ──────────────────────────────────────────────────────

function mapBody(v: string): string {
  const s = v.toLowerCase();
  if (s.includes("sedan") || s.includes("saloon"))                       return "Sedan";
  if (s.includes("pickup") || s.includes("truck"))                       return "Truck";
  if (s.includes("sport utility") || s.includes("suv") || s.includes("multi-purpose")) return "SUV";
  if (s.includes("crossover"))                                           return "Crossover";
  if (s.includes("coupe"))                                               return "Coupe";
  if (s.includes("convertible") || s.includes("cabriolet"))             return "Convertible";
  if (s.includes("van") || s.includes("minivan") || s.includes("cargo")) return "Van";
  return "SUV";
}

function mapFuel(v: string): string {
  const s = v.toLowerCase();
  if (s.includes("plug-in") || s.includes("phev"))  return "Plug-in Hybrid";
  if (s.includes("hybrid"))                          return "Hybrid";
  if (s.includes("electric"))                        return "Electric";
  if (s.includes("diesel"))                          return "Diesel";
  return "Gas";
}

function mapDrive(v: string): string {
  const s = v.toLowerCase();
  if (s.includes("all-wheel") || s.includes("awd")) return "AWD";
  if (s.includes("4-wheel")   || s.includes("4wd")) return "4WD";
  if (s.includes("rear-wheel") || s.includes("rwd")) return "RWD";
  return "FWD";
}

function mapTransmission(v: string): string {
  const s = v.toLowerCase();
  if (s.includes("cvt"))       return "CVT";
  if (s.includes("manual"))    return "Manual";
  return "Automatic";
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// ── Custom Input Component ─────────────────────────────────────────────────

export function VinDecoderInput(props: StringInputProps) {
  const [loading, setLoading]   = useState(false);
  const [result,  setResult]    = useState<{ ok: boolean; msg: string } | null>(null);

  // Get document ID + type for patching sibling fields
  const rawId  = useFormValue(["_id"])   as string;
  const docType = useFormValue(["_type"]) as string;
  const docId   = rawId?.replace(/^drafts\./, "") ?? "";
  const { patch } = useDocumentOperation(docId, docType);

  const vin = props.value ?? "";

  async function decode() {
    if (vin.length !== 17) {
      setResult({ ok: false, msg: "VIN must be exactly 17 characters" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res  = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin.toUpperCase()}?format=json`
      );
      const json = await res.json();
      const r    = json.Results?.[0];

      if (!r) throw new Error("No results");

      // ErrorCode "0" or "1" (minor) are OK; "6" = invalid VIN
      if (r.ErrorCode === "6") {
        setResult({ ok: false, msg: "Invalid VIN — not found in database" });
        return;
      }

      // Build patch object from NHTSA fields
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fields: Record<string, any> = {};

      if (r.Make)      fields.make  = titleCase(r.Make);
      if (r.Model)     fields.model = r.Model;
      if (r.ModelYear) fields.year  = parseInt(r.ModelYear, 10);
      if (r.BodyClass) fields.body  = mapBody(r.BodyClass);
      if (r.FuelTypePrimary)    fields.fuel         = mapFuel(r.FuelTypePrimary);
      if (r.DriveType)          fields.drivetrain   = mapDrive(r.DriveType);
      if (r.TransmissionStyle)  fields.transmission = mapTransmission(r.TransmissionStyle);

      // Engine string
      const engineParts: string[] = [];
      if (r.DisplacementL)    engineParts.push(`${parseFloat(r.DisplacementL).toFixed(1)}L`);
      if (r.EngineCylinders)  engineParts.push(`${r.EngineCylinders}-cylinder`);
      if (r.EngineModel)      engineParts.push(r.EngineModel);
      if (engineParts.length) fields.engine = engineParts.join(" ");

      // Color hints (usually not in NHTSA but sometimes in ext. color)
      // VIN stays as-is (already set by user)

      if (Object.keys(fields).length === 0) {
        setResult({ ok: false, msg: "VIN found but no data returned. Fill fields manually." });
        return;
      }

      patch.execute([{ set: fields }]);

      setResult({
        ok: true,
        msg: `✓ Auto-filled: ${r.ModelYear} ${titleCase(r.Make)} ${r.Model}`,
      });
    } catch {
      setResult({ ok: false, msg: "Could not reach VIN decoder. Check connection and try again." });
    } finally {
      setLoading(false);
    }
  }

  const ready = vin.length === 17;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* Sanity's default text input for the VIN value */}
      {props.renderDefault(props)}

      {/* Decode button row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={decode}
          disabled={!ready || loading}
          style={{
            padding: "9px 18px",
            background: ready ? "#f97316" : "#e5e7eb",
            color:      ready ? "#fff"    : "#9ca3af",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "13px",
            cursor: ready ? "pointer" : "not-allowed",
            transition: "background 0.15s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {loading ? "⏳ Decoding…" : "🔍 Decode VIN — Auto-fill all fields"}
        </button>

        {vin.length > 0 && !ready && (
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>
            {17 - vin.length} more character{17 - vin.length !== 1 ? "s" : ""} needed
          </span>
        )}

        {ready && !loading && (
          <span style={{ fontSize: "12px", color: "#6b7280" }}>
            VIN ready — click to auto-fill
          </span>
        )}
      </div>

      {/* Result message */}
      {result && (
        <div style={{
          padding: "9px 14px",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: "500",
          background: result.ok ? "#dcfce7" : "#fee2e2",
          color:      result.ok ? "#15803d" : "#dc2626",
          border: `1px solid ${result.ok ? "#bbf7d0" : "#fca5a5"}`,
        }}>
          {result.msg}
        </div>
      )}
    </div>
  );
}
