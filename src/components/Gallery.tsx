import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import type { GalleryItem } from '../data/gallery';
import SiteFooter from './SiteFooter';
import SiteNavigation from './SiteNavigation';

type GalleryProps = {
  items: GalleryItem[];
};

export function GalleryPreview({ items }: GalleryProps) {
  const preview = items.slice(0, 5);

  return (
    <section className="relative border-y border-white/10 py-24 sm:py-28" id="gallery-preview">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">A few frames · 03</p>
            <h2 className="section-title mt-5 max-w-3xl">Life, in <span className="text-brand">frames.</span></h2>
          </div>
          <a href="/gallery" className="inline-flex items-center gap-3 self-start border-b border-brand/60 pb-2 text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-brand sm:self-auto">
            View Full Gallery <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="gallery-mosaic grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          {preview.map((item, index) => (
            <a
              href="/gallery"
              key={`${item.src}-${index}`}
              className={`gallery-preview-item group relative block min-h-44 overflow-hidden bg-white/[0.03] ${
                index === 0 ? 'col-span-2 aspect-[1.8/1] lg:col-span-6 lg:row-span-2 lg:aspect-auto' :
                index === 1 ? 'aspect-[0.8/1] lg:col-span-3 lg:row-span-2 lg:aspect-auto' :
                index === 2 ? 'aspect-[1/1] lg:col-span-3 lg:aspect-auto' :
                index === 3 ? 'aspect-[1/1] lg:col-span-3 lg:aspect-auto' :
                'col-span-2 aspect-[1.8/1] lg:col-span-3 lg:aspect-auto'
              }`}
            >
              <img
                src={item.thumbnail ?? item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="fourza-image-reveal absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.2em] text-white/85">{item.category}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Gallery({ items }: GalleryProps) {
  const categories = useMemo(() => ['All', ...Array.from(new Set(items.map(({ category }) => category)))], [items]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleItems = useMemo(
    () => activeCategory === 'All' ? items : items.filter(({ category }) => category === activeCategory),
    [activeCategory, items],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? null : (index + 1) % visibleItems.length);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? null : (index - 1 + visibleItems.length) % visibleItems.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, visibleItems.length]);

  const openImage = visibleItems[activeIndex ?? -1];

  return (
    <>
      <SiteNavigation />
      <main className="min-h-screen bg-black pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <p className="section-kicker">The Fourza archive · 01</p>
            <h1 className="section-title mt-5">A world in <span className="text-brand">moments.</span></h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              A growing collection of celebrations, portraits and stories seen through the Fourza lens.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-y border-white/10 py-4" aria-label="Filter gallery by category">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                aria-pressed={activeCategory === category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveIndex(null);
                }}
                className={`rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.17em] transition-colors sm:text-[10px] ${
                  activeCategory === category
                    ? 'border-brand bg-brand text-black'
                    : 'border-white/15 text-white/55 hover:border-brand/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {visibleItems.map((item, index) => (
              <button
                type="button"
                key={`${item.src}-${index}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Open image: ${item.alt}`}
                className="gallery-tile group mb-4 block w-full break-inside-avoid overflow-hidden border border-white/10 bg-white/[0.02] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.thumbnail ?? item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="fourza-image-reveal block h-auto w-full transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-55 transition-opacity group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.2em] text-white/85">{item.category}</span>
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
          {visibleItems.length === 0 && (
            <p className="py-16 text-center text-sm text-white/50">No images are available in this category yet.</p>
          )}
        </div>
      </main>
      <SiteFooter />

      {openImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:border-brand hover:text-brand sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => setActiveIndex((index) => index === null ? null : (index - 1 + visibleItems.length) % visibleItems.length)}
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:border-brand hover:text-brand sm:left-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <figure className="fourza-image-reveal flex max-h-full max-w-6xl flex-col items-center justify-center">
            <img src={openImage.src} alt={openImage.alt} className="max-h-[78vh] max-w-full object-contain" />
            <figcaption className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-white/60">
              {openImage.category} <span className="mx-2 text-brand">/</span> {openImage.alt}
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setActiveIndex((index) => index === null ? null : (index + 1) % visibleItems.length)}
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:border-brand hover:text-brand sm:right-8"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
}
