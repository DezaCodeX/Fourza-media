export type Service = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  images: string[];
  highlights?: { value: string; label: string }[];
  related: string[];
};

const imageRoot = '/gallery-preview';

export const services: Service[] = [
  {
    slug: 'college-events',
    title: 'College Events',
    category: 'Campus stories',
    summary: 'The best memories, emotions and milestones of campus life, captured frame by frame.',
    description:
      'The photos and videos capture the best memories, emotions, and unforgettable moments of campus life. From culturals and events to friendships and celebrations, every frame tells a unique story. We proudly worked with Rathinam Group of Institutions from 2023 to 2026, successfully handling 400+ events through professional photography, videography, editing, and creative content production. We have also covered 25+ Government Events, delivering high-quality visual documentation with precision and professionalism. Beyond event coverage, our team has managed digital marketing, social media handling, branding, and promotional content, helping organizations strengthen their online presence. With creative storytelling, cinematic visuals, and professional editing, we transform every moment into a lasting memory.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=85',
    images: [
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=85',
    ],
    highlights: [
      { value: '400+', label: 'Events handled' },
      { value: '2023—26', label: 'Rathinam Group coverage' },
      { value: '25+', label: 'Government events covered' },
    ],
    related: ['celebrity-events', 'school-events', 'official-events'],
  },
  {
    slug: 'celebrity-events',
    title: 'Celebrity Events',
    category: 'College celebrations',
    summary: 'Cinematic photography and films for Naga Rathinam College’s F-Series and College Day.',
    description:
      'At Fourza Media, we capture college events with creativity and cinematic excellence. We are proud to have provided photography and videography services for Naga Rathinam College (Deemed to be University) during F-Series 2024 and F-Series 2025. Our team also covered College Day celebrations, capturing memorable moments, stage performances, and student achievements. Through professional photography, cinematic videos, reels, and event highlights, we transform every campus event into lasting memories. With modern equipment and creative storytelling, Fourza Media delivers high-quality visual experiences that students and institutions cherish for years.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=85',
    images: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1800&q=85',
    ],
    highlights: [
      { value: 'F-Series', label: '2024 & 2025' },
      { value: 'College Day', label: 'Photography & videography' },
    ],
    related: ['college-events', 'official-events', 'advertisements'],
  },
  {
    slug: 'wedding-events',
    title: 'Wedding Events',
    category: 'Wedding stories',
    summary: 'Wedding photography, candid moments and cinematic coverage made to last.',
    description:
      'At Fourza Media, we turn wedding moments into timeless visual stories filled with love, emotion, and elegance. From grand wedding celebrations to intimate events, we capture every detail with creativity and cinematic perfection. Our team specializes in wedding photography, videography, candid moments, and premium event coverage. With modern editing and high-quality production, we create memories that last forever. Every wedding is unique, and at Fourza Media, we make every frame unforgettable.',
    image: `${imageRoot}/IMG_5790.jpg`,
    images: [`${imageRoot}/IMG_5790.jpg`, `${imageRoot}/IMG_5791.jpg`],
    related: ['creative-model-shoots', 'photography', 'all-event-services'],
  },
  {
    slug: 'school-events',
    title: 'School Events',
    category: 'School stories',
    summary: 'Annual days, culturals, sports and the joyful moments that make school life.',
    description:
      'The photos and videos capture the best memories, emotions, and unforgettable moments of campus and school life. From culturals, annual day celebrations, and sports events to special programs, friendships, and achievements, every frame tells a unique story. We are proud to have provided professional photography and videography services for Sagar International School, Rathinam International Public School, and Sri Thiyagaraja Matriculation Higher Secondary School, capturing their memorable events with creativity and precision. Our team creates cinematic visuals, engaging highlight videos, and vibrant photographs that preserve every special moment. With high-quality editing and professional coverage, we turn ordinary school moments into timeless visual memories cherished forever.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=85',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85',
    ],
    highlights: [
      { value: '3 schools', label: 'Schools covered' },
      { value: 'Annual days', label: 'Culturals & sports' },
    ],
    related: ['college-events', 'all-event-services', 'photography'],
  },
  {
    slug: 'web-design',
    title: 'Website Design',
    category: 'Digital experiences',
    summary: 'Responsive business, portfolio and event websites built around clear, user-friendly design.',
    description:
      'At Fourza Media, we create modern, responsive, and visually engaging websites that help brands grow online. Our web design solutions combine creativity, user-friendly layouts, and powerful branding to deliver a professional digital experience. From business websites to portfolio and event pages, we design websites that are fast, clean, and mobile-friendly. We focus on creating designs that not only look attractive but also improve user engagement and brand identity. Fourza Media transforms ideas into impactful websites with creativity, innovation, and smart design.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=85',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=85',
    ],
    related: ['brand-management', 'advertisements', 'social-media-marketing'],
  },
  {
    slug: 'advertisements',
    title: 'Advertisements',
    category: 'Creative campaigns',
    summary: 'Poster design, cinematic promotional videos, product promotions and digital campaign creatives.',
    description:
      'At Fourza Media, we create powerful advertisements that help brands reach the right audience and grow faster. From creative poster designs to cinematic promotional videos, we deliver impactful advertising solutions. Our team focuses on modern visuals, engaging content, and smart marketing strategies that attract attention. We handle social media advertisements, branding campaigns, product promotions, and digital marketing creatives. Every advertisement is designed to increase brand visibility, audience engagement, and business growth.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85',
      `${imageRoot}/DSC01993-Edited.jpg`,
    ],
    related: ['brand-management', 'social-media-marketing', 'creative-model-shoots'],
  },
  {
    slug: 'official-events',
    title: 'Official Events',
    category: 'Public & government events',
    summary: 'Professional coverage for government programmes, public ceremonies and official occasions.',
    description:
      'Fourza Media professionally handles official events with high-quality photography, videography, and cinematic event coverage. From government programs and public ceremonies to inaugurations and awareness campaigns, we capture every important moment with precision and creativity. Our team focuses on delivering clear visuals, professional editing, and impactful storytelling that reflects the importance of the event. We provide live coverage, highlight videos, promotional content, and social-media-ready creatives for official programs. With modern equipment and experienced professionals, we ensure every event is documented with excellence and professionalism. Fourza Media transforms official moments into memorable visual stories with quality, dedication, and creative execution.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=85',
    images: [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1800&q=85',
    ],
    related: ['college-events', 'celebrity-events', 'all-event-services'],
  },
  {
    slug: 'creative-model-shoots',
    title: 'Creative Model Shoots',
    category: 'Fashion & lifestyle',
    summary: 'Fashion, lifestyle and promotional shoots shaped by creative direction and considered light.',
    description:
      'Fourza Media specializes in creative model shoots that blend fashion, style, and cinematic visual storytelling. We create high-quality photos and videos that highlight personality, confidence, and unique aesthetics with a professional touch. From fashion portfolios and lifestyle shoots to promotional and brand collaborations, our team delivers visually striking content. Using creative direction, modern lighting techniques, and premium editing, we produce impactful and stylish visuals. Our shoots are designed to enhance personal branding, social media presence, and professional portfolios. Fourza Media transforms every model shoot into a bold and memorable visual experience with creativity and perfection.',
    image: `${imageRoot}/DSC01993-Edited.jpg`,
    images: [
      `${imageRoot}/DSC01993-Edited.jpg`,
      `${imageRoot}/DSC01671-Edited.jpg`,
      `${imageRoot}/DSC02057.jpg`,
    ],
    related: ['advertisements', 'photography', 'wedding-events'],
  },
  {
    slug: 'brand-management',
    title: 'Brand Management',
    category: 'Brand growth',
    summary: 'A consistent digital presence built through content, community and performance-led campaigns.',
    description:
      'Fourza Media specializes in professional brand management, helping businesses build a strong and consistent presence across digital platforms. Our team strategically handles social media management, content creation, audience engagement, and Meta advertising campaigns to maximize brand visibility and growth. From designing creative marketing materials to managing targeted Meta Ads, we ensure every campaign reaches the right audience and delivers measurable performance. Through performance-driven strategies, Fourza Media transforms brands into recognizable and trusted market leaders, driving engagement, leads, and long-term business success.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1800&q=85',
    ],
    related: ['social-media-marketing', 'advertisements', 'web-design'],
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    category: 'Digital marketing',
    summary: 'Social media management, engaging content and targeted Meta advertising campaigns.',
    description:
      'Fourza Media manages social media presence with strategic content creation, audience engagement, and targeted Meta advertising campaigns. We create marketing materials for digital platforms, plan campaigns for the right audiences, and use performance-driven strategies to build visibility and measurable growth. Social media management, branding, and promotional content work together to help organizations strengthen their online presence and connect with their communities.',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1800&q=85',
    images: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1800&q=85',
    ],
    related: ['brand-management', 'advertisements', 'web-design'],
  },
  {
    slug: 'photography',
    title: 'Photography',
    category: 'Photography & film',
    summary: 'Professional event photography and visual storytelling, from meaningful moments to final edits.',
    description:
      'Fourza Media creates high-quality photographs that preserve the moments, people, and atmosphere that matter. Our photography work spans campus celebrations, school events, weddings, official programmes, and creative shoots. With careful coverage, cinematic visual storytelling, and professional editing, we turn each brief into a lasting visual record.',
    image: `${imageRoot}/IMG_5791.jpg`,
    images: [
      `${imageRoot}/IMG_5791.jpg`,
      `${imageRoot}/IMG_5790.jpg`,
      `${imageRoot}/DSC02057.jpg`,
    ],
    related: ['wedding-events', 'college-events', 'creative-model-shoots'],
  },
  {
    slug: 'all-event-services',
    title: 'All Type of Event Services',
    category: 'Event production',
    summary: 'Photography, videography and creative production for events of every kind.',
    description:
      'Fourza Media provides event services for campus celebrations, school programmes, weddings, public ceremonies, and other special occasions. From photography and videography to editing, highlight films, and social-media-ready creative content, each event is documented with care and shaped into a memorable visual story. Our team brings professional coverage and cinematic production together to support the character and needs of every event.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85',
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1800&q=85',
    ],
    related: ['college-events', 'school-events', 'wedding-events'],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
