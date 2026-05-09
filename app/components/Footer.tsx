import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-8">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Fine Motors LLC"
            width={100}
            height={38}
            className="h-8 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-90 transition-opacity"
          />
        </Link>
        <span className="text-sm text-white/60 text-center">
          © {new Date().getFullYear()} Fine Motors LLC. All rights reserved.
        </span>
        <div className="flex gap-6 text-sm">
          <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms"   className="text-white/60 hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
