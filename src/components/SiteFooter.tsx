import { ArrowUpRight, Mail } from 'lucide-react';

const links = [
  ['Home', '/#home'],
  ['Portfolio', '/portfolio'],
  ['Gallery', '/gallery'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-9 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
          <a href="/#home" className="font-display text-xl font-bold uppercase tracking-[0.08em]">
            Fourza <span className="text-brand">Media</span>
          </a>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.22em] text-white/50">
            {links.map(([label, href]) => (
              <a key={label} href={href} className="transition-colors hover:text-brand">{label}</a>
            ))}
          </nav>
          <div className="flex gap-3">
            <a href="mailto:fourzamedia@gmail.com" aria-label="Email Fourza Media" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand hover:text-brand">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Fourza Media. All rights reserved.</span>
          <a href="/portfolio" className="inline-flex items-center gap-2 transition-colors hover:text-brand">
            Made for the moments that matter <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
