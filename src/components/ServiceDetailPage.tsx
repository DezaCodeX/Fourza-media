import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Service } from '../data/services';
import { services } from '../data/services';
import SiteFooter from './SiteFooter';
import SiteNavigation from './SiteNavigation';

type ServiceDetailPageProps = {
  service: Service;
};

const seoTitles: Record<string, string> = {
  'college-events': 'Fourza Media | College Event Photography & Videography',
  'celebrity-events': 'Fourza Media | Naga Rathinam F-Series Event Coverage',
  'wedding-events': 'Fourza Media | Wedding Photography & Wedding Events',
  'school-events': 'Fourza Media | School Event Photography & Videography',
  'web-design': 'Fourza Media | Website Designing',
  advertisements: 'Fourza Media | Advertising & Promotional Campaigns',
  'official-events': 'Fourza Media | Official & Government Event Coverage',
  'creative-model-shoots': 'Fourza Media | Creative Model Shoots',
  'brand-management': 'Fourza Media | Brand Management & Social Media',
};

export default function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const related = service.related
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is Service => Boolean(item));

  useEffect(() => {
    document.title = seoTitles[service.slug] ?? `Fourza Media | ${service.title}`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', service.summary);
  }, [service]);

  return (
    <>
      <SiteNavigation />
      <main className="bg-black pt-[76px]">
        <section className="relative flex min-h-[72vh] items-end overflow-hidden border-b border-white/10">
          <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20">
            <a href="/portfolio" className="mb-14 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:text-brand">
              <ArrowLeft className="h-4 w-4" /> Back to Portfolio
            </a>
            <p className="section-kicker">{service.category} <span className="mx-2 text-brand">/</span> Fourza Media</p>
            <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.3rem,10vw,8rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em]">
              {service.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{service.summary}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.65fr_1.35fr] lg:px-10 lg:py-32">
          <div>
            <p className="section-kicker">The story · {service.category}</p>
            <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.04em] sm:text-4xl">
              Thoughtfully made. <span className="text-brand">Made to matter.</span>
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-white/65 sm:text-lg sm:leading-9">{service.description}</p>
        </section>

        {service.highlights && (
          <section className="border-y border-white/10 bg-white/[0.02]">
            <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
              {service.highlights.map((highlight) => (
                <div key={highlight.label} className="py-8 sm:px-7 sm:py-10 first:sm:pl-0 last:sm:pr-0">
                  <div className="font-display text-3xl font-bold uppercase tracking-[-0.04em] text-brand sm:text-4xl">{highlight.value}</div>
                  <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-white/45">{highlight.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="section-kicker">A closer look · {String(service.images.length).padStart(2, '0')} frames</p>
              <h2 className="section-title mt-4 text-4xl sm:text-6xl">Visual <span className="text-brand">notes.</span></h2>
            </div>
            <a href="/gallery" className="hidden items-center gap-2 pb-2 text-[9px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-brand sm:inline-flex">
              Full gallery <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {service.images.map((image, index) => (
              <motion.figure
                key={image}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={`relative overflow-hidden border border-white/10 bg-white/[0.03] ${index === 0 ? 'md:row-span-2' : ''}`}
              >
                <img
                  src={image}
                  alt={`${service.title} visual ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className={`h-full min-h-64 w-full object-cover transition-transform duration-700 hover:scale-[1.025] ${index === 0 ? 'md:min-h-[540px]' : 'md:min-h-[260px]'}`}
                />
              </motion.figure>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-white/10 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
              <p className="section-kicker">Continue exploring · Related work</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <a key={item.slug} href={`/portfolio/${item.slug}`} className="group flex items-center justify-between border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-brand/50">
                    <span>
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-white/40">{item.category}</span>
                      <span className="mt-2 block font-display text-xl font-semibold uppercase">{item.title}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-brand transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-white/10 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,138,0,0.12),transparent_60%)] px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="section-kicker justify-center">Have a story to tell?</p>
          <h2 className="section-title mx-auto mt-5 max-w-4xl">Let&apos;s make <span className="text-brand">it matter.</span></h2>
          <a
            href={`mailto:fourzamedia@gmail.com?subject=${encodeURIComponent(`Let's talk about ${service.title}`)}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-transform hover:-translate-y-0.5"
          >
            Let&apos;s Work Together <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
