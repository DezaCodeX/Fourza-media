import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Ticket, ArrowRight } from 'lucide-react';

const events = [
  {
    title: 'Social Mastery 2026',
    date: 'Oct 15-17',
    location: 'Virtual + Singapore',
    attendees: '2.5k+',
    type: 'Conference',
    image: 'https://images.unsplash.com/photo-1540575861501-7ce0514e1ff3?q=80&w=2070&auto=format&fit=crop',
    featured: true
  },
  {
    title: 'GenAI Marketing Lab',
    date: 'Nov 02',
    location: 'London, UK',
    attendees: '150',
    type: 'Workshop',
    image: 'https://images.unsplash.com/photo-1591115765373-520b7a21765b?q=80&w=2070&auto=format&fit=crop',
    featured: false
  },
  {
    title: 'Influencer Summit',
    date: 'Dec 12',
    location: 'Los Angeles, US',
    attendees: '800',
    type: 'Networking',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
    featured: false
  },
];

export default function Events() {
  return (
    <section id="events" className="py-32 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Live Experiences.</h2>
            <p className="text-white/40 max-w-md font-medium">Join us at the intersection of networking and knowledge. From global conferences to boutique workshops.</p>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            View All Events
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={event.featured ? "group relative overflow-hidden rounded-[2rem] bg-brand border border-white/10" : "group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/5 hover:border-brand/40 transition-all"}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 relative overflow-hidden aspect-[4/3] lg:aspect-auto">
                  <img src={event.image} alt={event.title} className="fourza-image-reveal absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute top-6 left-6 px-3 py-1 bg-black text-brand text-[10px] font-black uppercase tracking-widest rounded">
                    {event.type}
                  </div>
                </div>
                
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
                  <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                    <div>
                      <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-300 ${event.featured ? 'text-black' : 'text-white'}`}>{event.title}</h3>
                      <div className={`flex flex-wrap gap-6 text-sm font-bold ${event.featured ? 'text-black/60' : 'text-white/50'}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 ${event.featured ? 'text-black' : 'text-brand'}`} />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${event.featured ? 'text-black' : 'text-brand'}`} />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className={`w-4 h-4 ${event.featured ? 'text-black' : 'text-brand'}`} />
                          {event.attendees}
                        </div>
                      </div>
                    </div>
                    
                    <button className={event.featured ? "px-8 py-4 bg-black text-brand font-black uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-transform" : "px-8 py-4 bg-brand text-black font-black uppercase text-xs tracking-widest rounded-full border border-white/10 hover:bg-white transition-all"}>
                      Get Ticket
                    </button>
                  </div>
                  
                  <div className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity ${event.featured ? 'text-black' : 'text-white'}`}>
                    <Ticket className="w-4 h-4" />
                    Limited Slots remaining for {event.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
