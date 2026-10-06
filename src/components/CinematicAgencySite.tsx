import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { galleryItems } from '../data/gallery';
import { services } from '../data/services';
import { GalleryPreview } from './Gallery';
import SiteFooter from './SiteFooter';
import SiteNavigation from './SiteNavigation';

function PremiumCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest('a, button')));
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
      style={{ transform: `translate3d(${position.x - 18}px, ${position.y - 18}px, 0)` }}
    >
      <div className={`h-9 w-9 rounded-full border transition-all duration-200 ${active ? 'scale-125 border-brand bg-brand/15 shadow-[0_0_30px_rgba(255,138,0,0.3)]' : 'border-white/25 bg-white/5'}`} />
    </div>
  );
}

function Particles() {
  const particles = useMemo(
    () => Array.from({ length: 12 }, (_, index) => ({
      left: `${(index * 29) % 100}%`,
      top: `${(index * 37) % 100}%`,
      delay: index * 0.14,
    })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 noise-layer opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(255,138,0,0.15),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(44,63,66,0.2),transparent_26%)]" />
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-brand/70"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -12, 0], opacity: [0.18, 0.7, 0.18] }}
          transition={{ duration: 5 + index * 0.3, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function SectionKicker({ children }: { children: string }) {
  return <p className="section-kicker">{children}</p>;
}

function ContactSection() {
  const sendInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const service = String(form.get('service') ?? '');
    const message = String(form.get('message') ?? '');
    const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`;
    window.location.href = `mailto:fourzamedia@gmail.com?subject=${encodeURIComponent(`Project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(255,138,0,0.12),transparent_22%),radial-gradient(circle_at_82%_45%,rgba(44,63,66,0.2),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <SectionKicker>Let&apos;s work together · 05</SectionKicker>
          <h2 className="section-title mt-5">Your next story <span className="text-brand">starts here.</span></h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            Share a little about your event, brand, or creative brief. We&apos;ll be in touch to start shaping the details.
          </p>
          <div className="mt-9 space-y-4">
            <a href="mailto:fourzamedia@gmail.com" className="flex items-center gap-4 text-sm text-white/70 transition-colors hover:text-brand">
              <Mail className="h-4 w-4 text-brand" /> fourzamedia@gmail.com
            </a>
            <a href="tel:+917845116624" className="flex items-center gap-4 text-sm text-white/70 transition-colors hover:text-brand">
              <Phone className="h-4 w-4 text-brand" /> +91 78451 16624 <span className="text-white/25">/</span> +91 88838 81200
            </a>
            <p className="flex items-center gap-4 text-sm text-white/45">
              <MapPin className="h-4 w-4 text-brand" /> Rathinam Group of Institutions and beyond
            </p>
          </div>
        </div>
        <form onSubmit={sendInquiry} className="grid gap-4 border border-white/10 bg-white/[0.03] p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-[9px] uppercase tracking-[0.18em] text-white/45">
              Your name
              <input name="name" required autoComplete="name" className="rounded-none border border-white/12 bg-black/35 px-4 py-3 text-sm normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-brand" placeholder="Name" />
            </label>
            <label className="grid gap-2 text-[9px] uppercase tracking-[0.18em] text-white/45">
              Email address
              <input name="email" type="email" required autoComplete="email" className="rounded-none border border-white/12 bg-black/35 px-4 py-3 text-sm normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-brand" placeholder="you@example.com" />
            </label>
          </div>
          <label className="grid gap-2 text-[9px] uppercase tracking-[0.18em] text-white/45">
            Service
            <select name="service" className="rounded-none border border-white/12 bg-black/35 px-4 py-3 text-sm tracking-normal text-white outline-none transition-colors focus:border-brand">
              {services.map((service) => <option key={service.slug} value={service.title} className="bg-zinc-950">{service.title}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-[9px] uppercase tracking-[0.18em] text-white/45">
            Tell us about it
            <textarea name="message" required rows={5} className="resize-y rounded-none border border-white/12 bg-black/35 px-4 py-3 text-sm normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-brand" placeholder="A few details about the project, timing, and what you have in mind..." />
          </label>
          <button type="submit" className="mt-1 inline-flex items-center justify-center gap-3 bg-brand px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white">
            Send an enquiry <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

const featuredSlugs = ['college-events', 'wedding-events', 'creative-model-shoots'];

export default function CinematicAgencySite() {
  const featured = featuredSlugs.map((slug) => services.find((service) => service.slug === slug)).filter((service) => service !== undefined);

  return (
    <div className="relative overflow-hidden bg-black text-white">
      <SiteNavigation />
      <PremiumCursor />
      <main id="home">
        <header className="relative min-h-[90vh] overflow-hidden pt-[76px] lg:min-h-screen">
          <Particles />
          <div className="relative mx-auto grid min-h-[calc(90vh-76px)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:min-h-[calc(100vh-76px)] lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-16">
            <div className="relative z-10">
              <SectionKicker>Creative media · Photography · Events</SectionKicker>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mt-7 max-w-4xl font-display text-[clamp(3.6rem,10vw,8.3rem)] font-bold uppercase leading-[0.84] tracking-[-0.06em]"
              >
                We make <span className="text-brand">moments</span> move.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-7 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8"
              >
                A creative media team bringing ideas to life through photography, films, branding, advertising, social media, web design, and event coverage.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href="/portfolio" className="inline-flex items-center gap-3 rounded-full bg-brand px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-transform hover:-translate-y-0.5">
                  Explore Portfolio <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-brand hover:text-brand">
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
              <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { value: '400+', label: 'Events handled' },
                  { value: '25+', label: 'Government events' },
                  { value: '2023—26', label: 'Rathinam coverage' },
                  { value: 'F-Series', label: '2024 & 2025' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                    className="border-t border-white/20 pt-3"
                  >
                    <div className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">{stat.value}</div>
                    <div className="mt-1 text-[8px] uppercase leading-4 tracking-[0.14em] text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.figure
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative mx-auto w-full max-w-xl lg:justify-self-end"
            >
              <div className="absolute -right-5 top-10 h-24 w-24 rounded-full border border-brand/30 bg-brand/10 blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden border border-white/15 bg-zinc-950">
                <img
                  src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=85"
                  alt="A live performance captured beneath stage lights"
                  fetchPriority="high"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/55">Stories captured in light</p>
                    <p className="mt-2 font-display text-xl font-semibold uppercase">Every frame, considered.</p>
                  </div>
                  <Sparkles className="mb-1 h-5 w-5 shrink-0 text-brand" />
                </div>
              </div>
              <figcaption className="mt-3 flex justify-between gap-4 text-[8px] uppercase tracking-[0.17em] text-white/35">
                <span>On the ground. In the moment.</span>
                <span>Fourza Media</span>
              </figcaption>
            </motion.figure>
          </div>
        </header>

        <section id="about" className="relative border-y border-white/10 py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
            <div>
              <SectionKicker>Our craft · 01</SectionKicker>
              <h2 className="section-title mt-5">Creativity meets <span className="text-brand">purpose.</span></h2>
            </div>
            <div className="max-w-3xl">
              <p className="text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">
                We are a creative media team focused on branding, social media marketing, advertisements, and web design. Our goal is to create visually powerful and result-driven digital experiences for every brand.
              </p>
              <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                From creative concepts to final execution, we bring ideas to life with modern design and strategy. We believe every business deserves a unique identity that stands out in the digital world. At Fourza Media, creativity meets innovation to build impactful brand stories.
              </p>
              <div className="mt-8 border-l border-brand pl-5 text-[10px] uppercase leading-6 tracking-[0.15em] text-white/50">
                Rathinam Group of Institutions · Naga Rathinam College · Sagar International School
              </div>
            </div>
          </div>
        </section>

        <section id="selected-work" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <SectionKicker>Selected portfolio · 02</SectionKicker>
              <h2 className="section-title mt-5">Stories worth <span className="text-brand">staying for.</span></h2>
            </div>
            <a href="/portfolio" className="inline-flex items-center gap-2 pb-2 text-[10px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:text-brand">
              All services <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {featured.map((service, index) => (
              <motion.a
                key={service.slug}
                href={`/portfolio/${service.slug}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group relative flex min-h-[390px] flex-col justify-end overflow-hidden border border-white/10 bg-zinc-950 p-6 sm:min-h-[460px]"
              >
                <img src={service.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="relative">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-brand">{service.category}</span>
                  <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.04em]">{service.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">{service.summary}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4 text-[9px] uppercase tracking-[0.18em] text-white/65">
                    View the story <ArrowUpRight className="h-4 w-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <GalleryPreview items={galleryItems} />

        <section className="border-t border-white/10 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,138,0,0.12),transparent_65%)] py-20 text-center sm:py-24">
          <p className="section-kicker justify-center">The next frame is yours</p>
          <h2 className="section-title mx-auto mt-5 max-w-4xl">Let&apos;s make something <span className="text-brand">memorable.</span></h2>
          <a href="#contact" className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-[10px] uppercase tracking-[0.2em] transition-colors hover:border-brand hover:text-brand">
            Tell us about your project <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
