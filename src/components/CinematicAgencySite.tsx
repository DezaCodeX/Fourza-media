import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Camera, ChevronDown, Mail, MapPin, Play, Phone, Sparkles, SquareMousePointer, Star, Video, Waves } from 'lucide-react';

const services = [
  {
    title: 'Advertisements',
    href: '/services/advertisements.html',
    copy: 'Campaigns engineered to feel cinematic, precise, and impossible to ignore.',
    accent: 'Impact',
  },
  {
    title: 'Branding',
    href: '/services/branding.html',
    copy: 'Identity systems with sharp geometry, tactile depth, and memorable presence.',
    accent: 'Identity',
  },
  {
    title: 'Social Media Marketing',
    href: '/services/social-media-marketing.html',
    copy: 'Content ecosystems that move fast, hold attention, and compound visibility.',
    accent: 'Social',
  },
  {
    title: 'Wedding Management',
    href: '/services/wedding-management.html',
    copy: 'High-touch event choreography with premium atmosphere and flawless timing.',
    accent: 'Experience',
  },
  {
    title: 'Event Management',
    href: '/services/event-management.html',
    copy: 'Launches, productions, and live moments designed with studio-level control.',
    accent: 'Live',
  },
  {
    title: 'Website Designing',
    href: '/services/website-designing.html',
    copy: 'Luxury digital experiences with motion, depth, and conversion-first clarity.',
    accent: 'Digital',
  },
  {
    title: 'Event Services',
    href: '/services/event-services.html',
    copy: 'Lighting, sound, staging, and support wrapped into one seamless production stack.',
    accent: 'Support',
  },
  {
    title: 'Photo Shoot',
    href: '/services/photo-shoot.html',
    copy: 'Portrait, product, and editorial shoots with cinematic lighting and polish.',
    accent: 'Capture',
  },
];

const portfolio = [
  {
    title: 'Signal / Brand Launch',
    meta: 'Branding · Motion · Web',
    result: 'A luxury identity system built to scale across screens and stages.',
    image:
      '/services/photo-shoot-images/DSC01671-Edited.png',
  },
  {
    title: 'Pulse / Event Film',
    meta: 'Film · Production · Direction',
    result: 'A dynamic live-action narrative shaped for social, screens, and reveal moments.',
    image:
      '/services/photo-shoot-images/DSC01993-Edited.png',
  },
  {
    title: 'Halo / Creative Campaign',
    meta: 'Ads · Content · Strategy',
    result: 'A premium campaign story with visual rhythm and conversion intent.',
    image:
      '/services/photo-shoot-images/DSC02225-Edited.png',
  },
];

const stats = [
  { label: 'Creative Verticals', value: '08' },
  { label: 'Markets Served', value: '12+' },
  { label: 'Premium Projects', value: '240+' },
  { label: 'Client Retention', value: '96%' },
];

const clients = ['Retail', 'Hospitality', 'Fashion', 'Real Estate', 'Events', 'Creators'];

function PremiumCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeLabel, setActiveLabel] = useState('VIEW');
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const hoverLabel = target?.closest('[data-cursor]')?.getAttribute('data-cursor');
      setHovering(Boolean(hoverLabel));
      setActiveLabel(hoverLabel ?? 'VIEW');
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
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ transform: `translate3d(${position.x - 24}px, ${position.y - 24}px, 0)` }}
    >
      <div
        className={`flex h-12 min-w-12 items-center justify-center rounded-full border transition-all duration-300 ${
          hovering
            ? 'scale-125 border-brand bg-brand/15 shadow-[0_0_40px_rgba(255,138,0,0.45)]'
            : 'border-white/30 bg-white/5 backdrop-blur-sm'
        }`}
      >
        <span className="px-3 text-[10px] font-semibold tracking-[0.35em] text-white">{activeLabel}</span>
      </div>
    </div>
  );
}

function FloatingParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        left: `${(index * 17) % 100}%`,
        top: `${(index * 31) % 100}%`,
        delay: `${index * 0.18}s`,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 noise-layer opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,138,0,0.2),_transparent_26%),radial-gradient(circle_at_80%_20%,_rgba(44,63,66,0.35),_transparent_24%)]" />
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-brand/80 blur-[1px]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 5 + index * 0.15, repeat: Infinity, delay: Number.parseFloat(particle.delay), ease: 'easeInOut' }}
        />
      ))}
      <motion.div
        className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-0 h-[32rem] w-[32rem] rounded-full bg-slate/25 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 24, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function SectionLabel({ label, count }: { label: string; count: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
      <span>{label}</span>
      <span className="h-px w-10 bg-white/20" />
      <span className="font-mono text-brand">{count}</span>
    </div>
  );
}

export default function CinematicAgencySite() {
  return (
    <div className="relative overflow-hidden bg-black text-white">
      <PremiumCursor />
      <div className="relative">
        <header className="relative min-h-screen overflow-hidden">
          <FloatingParticleField />
          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-12 pt-6 lg:px-10">
            <nav className="glass-panel flex items-center justify-between gap-6 rounded-[28px] px-5 py-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.5em] text-white/45">Fourza Media</div>
                <div className="mt-1 text-sm uppercase tracking-[0.3em] text-brand">Creative agency</div>
              </div>
              <div className="hidden items-center gap-7 md:flex">
                {['Home', 'Portfolio', 'Services', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-[0.35em] text-white/60 transition-colors hover:text-white">
                    {item}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                data-cursor="OPEN"
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80 transition-all hover:border-brand/60 hover:bg-brand/10"
              >
                <span>Book</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </nav>

            <div className="mt-10 grid flex-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative z-10 max-w-4xl">
                <SectionLabel label="Premium production studio" count="01" />
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="mt-6 max-w-5xl text-[clamp(3.6rem,10vw,8.8rem)] font-display font-bold uppercase leading-[0.84] tracking-[-0.06em] text-glow"
                >
                  We don&apos;t follow trends.
                  <span className="block text-white/40">We create them.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-8 max-w-2xl text-base leading-8 text-white/60 md:text-lg"
                >
                  Fourza Media is a high-end creative partner for photography, films, branding, advertising, social media, web experiences, and live events. The experience is designed like a luxury production studio with sharp geometry, cinematic motion, and a dark editorial atmosphere.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="mt-10 flex flex-wrap items-center gap-4"
                >
                  <a
                    href="#portfolio"
                    data-cursor="VIEW"
                    className="group inline-flex items-center gap-3 rounded-full bg-brand px-7 py-4 text-xs font-semibold uppercase tracking-[0.4em] text-black transition-transform hover:-translate-y-0.5"
                  >
                    View Portfolio
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href="#contact"
                    data-cursor="OPEN"
                    className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-xs font-semibold uppercase tracking-[0.4em] text-white/90 transition-all hover:border-white/30 hover:bg-white/10"
                  >
                    Book Your Project
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </a>
                  <div className="glass-panel inline-flex items-center gap-3 rounded-full px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white/60">
                    <Sparkles className="h-4 w-4 text-brand" />
                    cinematic direction · premium execution
                  </div>
                </motion.div>

                <div className="mt-14 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 24, rotateX: 18 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.7, delay: 0.18 * index }}
                      className="glass-panel clip-card relative overflow-hidden rounded-[24px] p-5"
                    >
                      <div className="text-3xl font-display font-bold tracking-[-0.05em]">{stat.value}</div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/45">{stat.label}</div>
                      <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,transparent,rgba(255,138,0,0.08))]" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94, rotate: 8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative mx-auto w-full max-w-xl"
              >
                <div className="absolute -left-6 top-10 h-px w-28 bg-gradient-to-r from-transparent via-brand to-transparent" />
                <div className="absolute right-0 top-24 h-28 w-28 rounded-full border border-brand/30 bg-brand/10 blur-2xl" />
                <div className="glass-panel relative overflow-hidden rounded-[36px] p-4 shadow-[0_24px_120px_rgba(0,0,0,0.7)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-neutral-950">
                    <img
                      src="/services/photo-shoot-images/DSC07283.jpg"
                      alt="Cinematic Fourza Media production still"
                      className="h-full w-full object-cover object-center opacity-90 transition-transform duration-1000 hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent,rgba(0,0,0,0.55))]" />
                    <motion.div
                      className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.35em] backdrop-blur-md"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_20px_rgba(255,138,0,0.8)]" />
                      live studio feed
                    </motion.div>
                    <motion.button
                      type="button"
                      data-cursor="PLAY"
                      className="absolute bottom-6 left-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform hover:scale-105"
                      whileHover={{ scale: 1.06 }}
                    >
                      <Play className="h-6 w-6 fill-white text-white" />
                    </motion.button>
                    <div className="absolute bottom-6 right-6 max-w-[220px] text-right">
                      <div className="text-[10px] uppercase tracking-[0.35em] text-white/55">Featured sequence</div>
                      <div className="mt-2 text-2xl font-display font-bold uppercase leading-none tracking-[-0.05em]">Lens / Light / Motion</div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/45">
                  <span>mouse parallax enabled</span>
                  <span>scroll to reveal</span>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden border-t border-white/10 py-8">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,138,0,0.05),transparent)]" />
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-[10px] uppercase tracking-[0.5em] text-white/45 lg:px-10">
            {clients.map((client) => (
              <span key={client} className="border border-white/10 bg-white/5 px-4 py-2">
                {client}
              </span>
            ))}
          </div>
        </section>

        <section id="portfolio" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <SectionLabel label="Selected portfolio" count="02" />
              <h2 className="mt-6 text-[clamp(2.6rem,6vw,6rem)] font-display font-bold uppercase leading-[0.88] tracking-[-0.05em]">
                Case studies that feel like trailers.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/60 md:text-lg">
                Instead of flat grids, the portfolio unfolds as a sequence of editorial case studies with cinematic imagery, project context, and motion-first composition.
              </p>
              <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-white/50">
                <SquareMousePointer className="h-4 w-4 text-brand" />
                hover to open project story
              </div>
            </div>

            <div className="space-y-6">
              {portfolio.map((project, index) => (
                <motion.a
                  key={project.title}
                  href="/services/photo-shoot.html"
                  data-cursor="OPEN"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.75, delay: index * 0.12 }}
                  className="group block"
                >
                  <div className="glass-panel overflow-hidden rounded-[32px] border-white/15 transition-all duration-500 hover:border-brand/40 hover:shadow-[0_30px_120px_rgba(255,138,0,0.12)]">
                    <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                      <div className="relative min-h-[320px] overflow-hidden">
                        <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.08),rgba(0,0,0,0.65))]" />
                        <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.35em] backdrop-blur-md">
                          {project.meta}
                        </div>
                      </div>
                      <div className="relative flex flex-col justify-between gap-10 p-8 lg:p-10">
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.5em] text-white/35">Project {String(index + 1).padStart(2, '0')}</div>
                          <h3 className="mt-4 max-w-md text-4xl font-display font-bold uppercase leading-[0.92] tracking-[-0.05em] text-white">
                            {project.title}
                          </h3>
                          <p className="mt-6 max-w-md text-base leading-8 text-white/60">{project.result}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                          <span className="text-[10px] uppercase tracking-[0.35em] text-brand">View case study</span>
                          <ArrowUpRight className="h-5 w-5 text-white/70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="relative overflow-hidden border-y border-white/10 py-24 lg:py-32">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,138,0,0.04),transparent_35%,rgba(44,63,66,0.1))]" />
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <SectionLabel label="Services" count="03" />
                <h2 className="mt-6 text-[clamp(2.6rem,6vw,5.5rem)] font-display font-bold uppercase leading-[0.88] tracking-[-0.05em]">
                  Angular services.
                  <span className="block text-white/40">Crystal execution.</span>
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-white/60 md:ml-auto md:text-lg">
                Each service is framed like a production module rather than a card. Thin borders, diagonal rhythm, and hover glow create a more premium surface for the real offerings.
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => (
                <motion.a
                  key={service.title}
                  href={service.href}
                  data-cursor="OPEN"
                  initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                  className="group relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 transition-all hover:border-brand/50 hover:shadow-[0_0_50px_rgba(255,138,0,0.12)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/35">{service.accent}</div>
                    <div className="rounded-full border border-brand/30 bg-brand/10 p-2 text-brand transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-16 flex min-h-[180px] flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.45em] text-white/35">0{index + 1}</div>
                      <h3 className="mt-4 text-3xl font-display font-bold uppercase leading-[0.9] tracking-[-0.05em]">{service.title}</h3>
                    </div>
                    <p className="mt-8 max-w-xs text-sm leading-7 text-white/60">{service.copy}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
              <SectionLabel label="Motion language" count="04" />
              <h2 className="mt-6 max-w-2xl text-[clamp(2.4rem,5vw,4.8rem)] font-display font-bold uppercase leading-[0.88] tracking-[-0.05em]">
                Every section moves differently.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/60 md:text-lg">
                The page mixes slide-ins, depth shifts, zoom reveals, and diagonal composition changes so the experience feels authored instead of templated.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Video, label: 'Film direction' },
                  { icon: Camera, label: 'Photo production' },
                  { icon: Waves, label: 'Brand rhythm' },
                  { icon: Sparkles, label: 'Launch systems' },
                ].map((item, index) => (
                  <div key={item.label} className="glass-panel flex items-center gap-4 rounded-[24px] p-4" style={{ transform: `translateY(${index % 2 === 0 ? 0 : 16}px)` }}>
                    <div className="rounded-full border border-white/10 bg-white/5 p-3 text-brand">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm uppercase tracking-[0.3em] text-white/70">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="glass-panel clip-card overflow-hidden rounded-[34px] p-8">
                <SectionLabel label="Audience" count="05" />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {['Brands', 'Founders', 'Creators', 'Productions'].map((item) => (
                    <div key={item} className="rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm uppercase tracking-[0.35em] text-white/65">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel overflow-hidden rounded-[34px] p-8">
                <SectionLabel label="Client promise" count="06" />
                <blockquote className="mt-6 text-3xl font-display font-bold uppercase leading-[1.05] tracking-[-0.05em] text-white md:text-4xl">
                  Luxury isn&apos;t decoration. It&apos;s precision, restraint, and timing.
                </blockquote>
                <p className="mt-6 max-w-lg text-base leading-8 text-white/60">
                  Fourza Media is designed to feel like a premium international creative studio: focused typography, controlled motion, and a black-orange palette that carries the full experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden border-t border-white/10 py-24 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,138,0,0.14),transparent_20%),radial-gradient(circle_at_80%_40%,rgba(44,63,66,0.22),transparent_28%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.95fr] lg:px-10">
            <div>
              <SectionLabel label="Contact" count="07" />
              <h2 className="mt-6 text-[clamp(2.8rem,6vw,5.8rem)] font-display font-bold uppercase leading-[0.88] tracking-[-0.05em]">
                Book the next frame.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
                If you want a premium digital presence, a cinematic campaign, or a production partner that treats every detail seriously, this is the starting point.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <a href="mailto:fourzamedia@gmail.com" data-cursor="OPEN" className="glass-panel group rounded-[26px] p-5 transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <Mail className="h-5 w-5 text-brand" />
                    <ArrowUpRight className="h-5 w-5 text-white/55 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div className="mt-12 text-[10px] uppercase tracking-[0.45em] text-white/35">Email</div>
                  <div className="mt-3 text-lg text-white/90">fourzamedia@gmail.com</div>
                </a>
                <a href="tel:+917845116624" data-cursor="OPEN" className="glass-panel group rounded-[26px] p-5 transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <Phone className="h-5 w-5 text-brand" />
                    <ArrowUpRight className="h-5 w-5 text-white/55 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div className="mt-12 text-[10px] uppercase tracking-[0.45em] text-white/35">Phone</div>
                  <div className="mt-3 text-lg text-white/90">+91 78451 16624</div>
                  <div className="mt-1 text-lg text-white/90">+91 88838 81200</div>
                </a>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-white/55">
                <MapPin className="h-4 w-4 text-brand" />
                Operating across premium creative, event, and digital production briefs.
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-[36px] p-6 lg:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/35">Inquiry form</div>
                  <div className="mt-2 text-2xl font-display font-bold uppercase tracking-[-0.05em]">Tell us the brief.</div>
                </div>
                <Star className="h-5 w-5 text-brand" />
              </div>
              <form className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="rounded-[20px] border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand/60" placeholder="Full name" />
                  <input className="rounded-[20px] border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand/60" placeholder="Email address" />
                </div>
                <input className="rounded-[20px] border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand/60" placeholder="Service interest" />
                <textarea className="min-h-[160px] rounded-[24px] border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand/60" placeholder="Tell us about the project, timeline, and desired outcome." />
                <button type="button" data-cursor="PLAY" className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-brand px-7 py-4 text-xs font-semibold uppercase tracking-[0.45em] text-black transition-transform hover:-translate-y-0.5">
                  Send the brief
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
