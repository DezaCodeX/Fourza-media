import { motion } from 'motion/react';
import { Megaphone, Layers, Instagram, Heart, Calendar, Layout, Sparkles, Camera, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'Advertisements',
    desc: 'Cutting-edge digital and physical ad campaigns that capture attention and drive conversions.',
    icon: Megaphone,
    tag: 'Impact',
    href: '/services/advertisements.html',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Branding',
    desc: 'Crafting unique visual identities and brand stories that resonate with your target audience.',
    icon: Layers,
    tag: 'Identity',
    href: '/services/branding.html',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Social Media Marketing',
    desc: 'Strategic social presence across all platforms to build communities and viral momentum.',
    icon: Instagram,
    tag: 'Social',
    href: '/services/social-media-marketing.html',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Wedding Management',
    desc: 'Exquisite planning and execution of weddings, making your special day absolutely perfect.',
    icon: Heart,
    tag: 'Celebrate',
    href: '/services/wedding-management.html',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Event Management',
    desc: 'Seamless production for corporate events, launches, and large-scale gatherings.',
    icon: Calendar,
    tag: 'Live',
    href: '/services/event-management.html',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Website Designing',
    desc: 'High-performance, aesthetic websites designed to convert visitors into loyal customers.',
    icon: Layout,
    tag: 'Digital',
    href: '/services/website-designing.html',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Event Services',
    desc: 'Comprehensive support for all types of events, from sound and light to full production.',
    icon: Sparkles,
    tag: 'Support',
    href: '/services/event-services.html',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Photo Shoot',
    desc: 'Premium photo shoot production that brings your brand to life with compelling imagery and studio-quality visuals.',
    icon: Camera,
    tag: 'Capture',
    href: '/services/photo-shoot.html',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2000&auto=format&fit=crop'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
          <div className="max-w-xl">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand mb-6 block">Our Expertise</span>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Fourza <br />Marketing.
            </h2>
          </div>
          <p className="max-w-xs text-black/50 font-medium leading-relaxed">
            We don't just "do" marketing. We build ecosystems where brands thrive through relentless innovation and Fourza energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {services.map((service, i) => (
            <motion.a
              key={i}
              href={service.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group block cursor-pointer"
            >
              <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center border border-black/5">
                <img 
                  src={service.image} 
                  className="fourza-image-reveal absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  alt={service.title}
                />
                <div className={`absolute top-4 left-4 bg-black text-brand text-[10px] font-black uppercase px-2 py-1 rounded tracking-widest z-10`}>
                  {service.tag}
                </div>
                <service.icon className="relative w-12 h-12 text-black/20 group-hover:opacity-0 transition-opacity duration-300 z-10" />
                <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center p-8 z-20">
                  <p className="text-black text-sm font-black leading-relaxed text-center uppercase tracking-tight">
                    {service.desc}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="text-2xl font-black uppercase tracking-tight">{service.title}</h3>
                <div className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center group-hover:bg-brand group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
