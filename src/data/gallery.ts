export type GalleryCategory =
  | 'Weddings'
  | 'College Events'
  | 'School Events'
  | 'Official Events'
  | 'Model Shoots'
  | 'Advertisements'
  | 'Branding'
  | 'Photography';

export type GalleryItem = {
  src: string;
  thumbnail?: string;
  alt: string;
  category: GalleryCategory | string;
};

export const galleryItems: GalleryItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=85',
    alt: 'Graduates celebrating a college milestone',
    category: 'College Events',
  },
  {
    src: '/services/photo-shoot-images/IMG_5790.JPG.jpeg',
    thumbnail: '/gallery-preview/IMG_5790.jpg',
    alt: 'Bridal portrait in traditional wedding attire',
    category: 'Weddings',
  },
  {
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=85',
    alt: 'Students learning together in a classroom',
    category: 'School Events',
  },
  {
    src: '/services/photo-shoot-images/DSC01993-Edited.png',
    thumbnail: '/gallery-preview/DSC01993-Edited.jpg',
    alt: 'Fashion portrait from a creative model shoot',
    category: 'Model Shoots',
  },
  {
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=85',
    alt: 'People gathered together at a public event',
    category: 'Official Events',
  },
  {
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85',
    alt: 'Fashion campaign imagery for advertising',
    category: 'Advertisements',
  },
  {
    src: '/services/photo-shoot-images/IMG_5791.JPG.jpeg',
    thumbnail: '/gallery-preview/IMG_5791.jpg',
    alt: 'Wedding portrait captured in natural light',
    category: 'Weddings',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    alt: 'Thoughtful workspace and brand environment',
    category: 'Branding',
  },
  {
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=85',
    alt: 'Live performance under concert lights',
    category: 'College Events',
  },
  {
    src: '/services/photo-shoot-images/DSC01671-Edited.png',
    thumbnail: '/gallery-preview/DSC01671-Edited.jpg',
    alt: 'Studio fashion portrait in monochrome',
    category: 'Photography',
  },
];
