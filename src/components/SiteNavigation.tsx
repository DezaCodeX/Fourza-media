import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '/#home', section: 'home' },
  { label: 'Portfolio', href: '/portfolio', section: 'portfolio' },
  { label: 'Gallery', href: '/gallery', section: 'gallery' },
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Contact', href: '/#contact', section: 'contact' },
];

export default function SiteNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = window.location.pathname;
  const currentPage = pathname.startsWith('/portfolio/')
    ? 'portfolio'
    : pathname === '/portfolio'
      ? 'portfolio'
      : pathname === '/gallery'
        ? 'gallery'
        : '';

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-10" aria-label="Main navigation">
        <a href="/#home" className="group flex items-center gap-3" aria-label="Fourza Media home">
          <img src="/logo.png" alt="" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg font-bold uppercase tracking-[0.08em] text-white">Fourza <span className="text-brand">Media</span></span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={currentPage === link.section ? 'page' : undefined}
              className={`relative py-2 text-[11px] uppercase tracking-[0.25em] transition-colors hover:text-brand ${
                currentPage === link.section ? 'text-brand' : 'text-white/65'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:text-brand md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-4 text-xs uppercase tracking-[0.25em] text-white/75 transition-colors hover:text-brand"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 text-brand" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
