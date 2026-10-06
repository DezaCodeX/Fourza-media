import { useEffect } from 'react';
import CinematicAgencySite from './components/CinematicAgencySite';
import Gallery from './components/Gallery';
import PortfolioPage from './components/PortfolioPage';
import ServiceDetailPage from './components/ServiceDetailPage';
import { galleryItems } from './data/gallery';
import { getService } from './data/services';
import { galleryFiles } from 'virtual:fourza-gallery';

const galleryCollection = [
  ...galleryItems,
  ...galleryFiles.filter((file) => !galleryItems.some((item) => item.src === file.src)),
];

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const slug = pathname.startsWith('/portfolio/') ? pathname.slice('/portfolio/'.length) : '';
  const service = slug ? getService(slug) : undefined;

  useEffect(() => {
    if (pathname === '/gallery') {
      document.title = 'Fourza Media | Gallery';
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'A growing collection of celebrations, portraits and stories seen through the Fourza lens.');
    } else if (pathname === '/portfolio') {
      document.title = 'Fourza Media | Portfolio';
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Explore Fourza Media work across events, photography, wedding films, branding, advertising, and web design.');
    } else if (!service && pathname !== '/') {
      document.title = 'Fourza Media | Page Not Found';
    }
  }, [pathname, service]);

  if (pathname === '/') {
    return <CinematicAgencySite />;
  }
  if (pathname === '/portfolio') {
    return <PortfolioPage />;
  }
  if (service) {
    return <ServiceDetailPage service={service} />;
  }
  if (pathname === '/gallery') {
    return <Gallery items={galleryCollection} />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
      <div>
        <p className="section-kicker justify-center">404 · Page not found</p>
        <h1 className="section-title mt-5">Lost the <span className="text-brand">frame.</span></h1>
        <a href="/" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand">Return home <span aria-hidden="true">→</span></a>
      </div>
    </main>
  );
}
