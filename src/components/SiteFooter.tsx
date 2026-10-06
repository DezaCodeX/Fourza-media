import { useEffect, useState } from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { defaultContact } from '../data/contact';

const links = [
  ['Home', '/#home'],
  ['Portfolio', '/portfolio'],
  ['Gallery', '/gallery'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
  ['Send Enquiry', '/#contact'],
];

export default function SiteFooter() {
  const [contact, setContact] = useState(defaultContact);
  useEffect(() => { fetch('/api/contact').then((response) => response.ok ? response.json() : null).then((data) => { if (data) setContact({ email: data.email, phones: data.phones }); }).catch(() => {}); }, []);
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
          <div className="grid gap-2 text-[9px] uppercase tracking-[0.15em] text-white/40">
            <span className="text-white/65">Contact</span>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 normal-case tracking-normal transition-colors hover:text-brand"><Mail className="h-3.5 w-3.5 text-brand" />{contact.email}</a>
            {contact.phones.map((phone) => <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-2 normal-case tracking-normal transition-colors hover:text-brand"><Phone className="h-3.5 w-3.5 text-brand" />{phone}</a>)}
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Fourza Media. All rights reserved.</span>
          <span className="normal-case tracking-[0.12em]">Developed by <a href="https://dezacodex.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-brand/80 transition-colors duration-300 hover:text-brand">DEZACODEX <ArrowUpRight className="inline h-3 w-3 transition-transform duration-300 hover:-translate-y-0.5" /></a></span>
        </div>
      </div>
    </footer>
  );
}
