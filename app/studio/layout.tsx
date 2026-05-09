// Studio has its own full-page layout — no shared nav/footer
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
