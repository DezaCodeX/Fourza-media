import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import SiteFooter from './SiteFooter';
import SiteNavigation from './SiteNavigation';

export default function PortfolioPage() {
  return (
    <>
      <SiteNavigation />
      <main className="min-h-screen bg-black pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <header className="max-w-4xl">
            <p className="section-kicker">The Fourza portfolio · 02</p>
            <h1 className="section-title mt-5">Made to <span className="text-brand">move you.</span></h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              From campus celebrations and wedding stories to campaigns and digital experiences, explore the work we bring to life.
            </p>
          </header>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.a
                key={service.slug}
                href={`/portfolio/${service.slug}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.07 }}
                className="portfolio-card group relative flex min-h-[450px] flex-col justify-between overflow-hidden border border-white/12 bg-white/[0.025] p-6 transition-colors duration-500 hover:border-brand/50 sm:p-7"
              >
                <img
                  src={service.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="fourza-image-reveal absolute inset-0 h-full w-full object-cover opacity-35 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/10" />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/65">{service.category}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-black">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
                <div className="relative mt-auto">
                  <div className="mb-4 font-mono text-[10px] tracking-[0.2em] text-brand">{String(index + 1).padStart(2, '0')}</div>
                  <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-4xl">{service.title}</h2>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">{service.summary}</p>
                  <div className="mt-7 border-t border-white/15 pt-4 text-[9px] uppercase tracking-[0.22em] text-white/50 transition-colors group-hover:text-brand">
                    Explore the story
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
