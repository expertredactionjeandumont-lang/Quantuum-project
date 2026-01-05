import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Target, 
  Crosshair, 
  Skull, 
  Lock, 
  Zap, 
  Menu, 
  X, 
  ArrowRight,
  Shell,
  ShoppingBag,
  Radio,
  Globe,
  Users,
  SearchCode,
  Briefcase,
  EyeOff,
  MapPin,
  Phone,
  Terminal,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Eye
} from 'lucide-react';

const MDiv = motion.div as any;

type ViewType = 'home' | 'about' | 'services' | 'armory' | 'contact';

interface ServiceItem {
  title: string;
  desc: string;
  longDesc: string;
  icon: React.ReactNode;
  requirements: string[];
}

const Navbar = ({ currentView, setView }: { currentView: ViewType, setView: (v: ViewType) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'HOME', id: 'home' },
    { name: 'WHO WE ARE', id: 'about' },
    { name: 'SERVICES', id: 'services' },
    { name: 'ARMORY', id: 'armory' },
    { name: 'CONTACT', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
          <Shell className="text-army-olive w-8 h-8 rotate-45" />
          <span className="text-2xl font-bold tracking-tighter text-gray-900 font-stencil uppercase">QRSI<span className="text-army-olive">.WAR</span></span>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          {links.map((link) => (
            <button 
              key={link.name} 
              onClick={() => { setView(link.id as ViewType); window.scrollTo(0, 0); }}
              className={`font-bold text-[10px] tracking-[0.3em] uppercase relative py-2 ${currentView === link.id ? 'text-gray-900 nav-link-active' : 'text-gray-400 hover:text-army-olive transition-colors'}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
           <button 
            onClick={() => setView('contact')}
            className="btn-tactical bg-army-olive text-white text-[10px] scale-75"
           >
             ENGAGE NOW <ArrowRight size={14} className="ml-2" />
           </button>
        </div>

        <button className="lg:hidden text-gray-800" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <MDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {links.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => { setView(link.id as ViewType); window.scrollTo(0, 0); setMobileMenu(false); }}
                  className="font-bold text-left text-lg text-gray-800 uppercase tracking-widest"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </MDiv>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1579935110378-8126281bd75d?auto=format&fit=crop&q=80&w=2000",
      title: "QUANTUM REAPER STEEL",
      subtitle: "Silent. Precise. Inevitable."
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
      title: "TACTICAL INTELLIGENCE",
      subtitle: "Global Hub Settled in Africa."
    },
    {
      url: "https://images.unsplash.com/photo-1508197146414-0f752e03924f?auto=format&fit=crop&q=80&w=2000",
      title: "INDUSTRIAL DEFENSE",
      subtitle: "USA Army Veteran Leadership."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen flex items-center pt-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <MDiv
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].url} 
              className="w-full h-full object-cover grayscale brightness-[0.3] sepia-[0.3] hue-rotate-[60deg]"
              alt="Tactical Footage"
            />
          </MDiv>
        </AnimatePresence>
        <div className="absolute inset-0 bg-army-olive/25 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 footage-overlay opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-20">
        <MDiv 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]"></span>
            <p className="text-white text-xl font-bold tracking-[0.4em] uppercase font-stencil">LIVE FEED // SECURE LINK</p>
          </div>
          <h1 className="text-6xl md:text-[8rem] font-bold text-white uppercase leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl">
            {slides[currentSlide].title.split(' ').slice(0, 2).join(' ')} <br/>
            <span className="text-army-olive">{slides[currentSlide].title.split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="text-white/80 text-2xl font-light max-w-2xl mb-12 border-l-8 border-army-olive pl-8 backdrop-blur-sm bg-black/20 py-4 uppercase tracking-widest">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-wrap gap-6">
            <button onClick={() => setView('contact')} className="btn-tactical bg-army-olive text-white shadow-xl">
              ENGAGE UNIT
            </button>
            <button onClick={() => setView('services')} className="btn-tactical border-2 border-white/20 text-white hover:bg-white/10">
              CORE SERVICES
            </button>
          </div>
        </MDiv>
      </div>

      <div className="absolute bottom-12 left-6 z-30 flex items-center gap-8 px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/10 hidden md:flex">
         <div className="flex gap-2">
           {slides.map((_, i) => (
             <div key={i} className={`h-1 transition-all duration-500 ${currentSlide === i ? 'w-12 bg-army-olive' : 'w-4 bg-white/20'}`}></div>
           ))}
         </div>
         <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">UP-LINK ACTIVE // AFRICA COMMAND HUB</span>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-10 text-white">
        <Crosshair size={500} strokeWidth={0.5} />
      </div>
    </section>
  );
};

const ServiceModal = ({ service, onClose }: { service: ServiceItem, onClose: () => void }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
    <MDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
    <MDiv
      initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }}
      className="relative w-full max-w-5xl bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border-l-8 border-army-olive"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors z-50"><X size={32} /></button>
      <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        <div className="md:w-1/3 bg-gray-100 p-12 flex flex-col items-center justify-center border-r border-gray-200">
           <div className="text-army-olive mb-8">{React.cloneElement(service.icon as any, { size: 100, strokeWidth: 1 })}</div>
           <div className="text-center">
             <h4 className="font-stencil text-army-drab text-xs tracking-widest uppercase mb-4">IDENT: RESTRICTED</h4>
             <span className="py-1 px-4 bg-army-olive text-white text-[10px] font-bold tracking-[0.2em] uppercase">TIER 1 ACCESS</span>
           </div>
        </div>
        <div className="md:w-2/3 p-12 bg-white">
           <h2 className="text-4xl font-bold uppercase mb-8 tracking-tighter text-gray-900 border-b-4 border-gray-100 pb-6">{service.title}</h2>
           <p className="text-gray-500 text-xl leading-relaxed mb-10">{service.longDesc}</p>
           <div className="space-y-6 mb-12">
             <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-army-drab flex items-center gap-2"><Terminal size={14} /> MISSION REQ:</h5>
             <div className="grid grid-cols-1 gap-3">
               {service.requirements.map((req, i) => (
                 <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100"><ChevronRight size={18} className="text-army-olive" /><span className="font-bold text-sm text-gray-800 uppercase tracking-widest">{req}</span></div>
               ))}
             </div>
           </div>
           <button onClick={onClose} className="btn-tactical bg-army-olive text-white w-full">REQUEST ENGAGEMENT</button>
        </div>
      </div>
    </MDiv>
  </div>
);

const ServicesTeaser = ({ onServiceClick }: { onServiceClick: (s: ServiceItem) => void }) => {
  const items = [
    { title: 'HVT Elimination', icon: <Skull />, desc: 'Surgical elimination of priority threats using advanced kinetic and quantum-assisted targeting.', longDesc: 'Our HVT protocols utilize ballistic superiority and predictive modeling for terminal phase execution. Operations conducted under strict non-attribution.', requirements: ['Quantum Uplink Active', 'Tier-1 Operative Lead'] },
    { title: 'Counter-Terrorism', icon: <Zap />, desc: 'Pre-emptive strikes against localized and global insurgent threats using precision tactical assets.', longDesc: 'We identify insurgent nodes in African theaters and execute precision strikes to destabilize hostile command structures.', requirements: ['Africa Command Authorization', 'Precision Munitions'] },
    { title: 'Asset Protection', icon: <Shield />, desc: 'Tier-1 physical and cyber protection for multi-national corporate assets and high-net-worth leadership.', longDesc: '360-degree protection shells including executive security details and hardened facility defense layers integrated with quantum encryption.', requirements: ['24/7 Monitoring', 'Encrypted Comms Hub'] }
  ];
  return (
    <section className="py-24 bg-white crosshair crosshair-tl crosshair-br border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-stencil text-army-olive text-xs tracking-[0.5em] uppercase block mb-4">Engagement Dossier</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight">SERVICES & PORTFOLIO</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 shadow-2xl">
          {items.map((item, i) => (
            <div key={i} onClick={() => onServiceClick(item as any)} className="bg-white p-12 hover:bg-gray-50 transition-all group cursor-pointer border-b md:border-b-0">
              <div className="text-army-olive mb-10 group-hover:scale-110 transition-transform duration-500">{React.cloneElement(item.icon as any, { size: 56, strokeWidth: 1 })}</div>
              <h3 className="text-2xl font-bold uppercase mb-6 tracking-tight group-hover:text-army-olive">{item.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 line-clamp-3">{item.desc}</p>
              <div className="flex items-center gap-2 text-army-olive font-bold text-xs tracking-[0.3em] uppercase">VIEW DOSSIER <ArrowRight size={14} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MilitaryShopTeaser = ({ onArmoryClick }: { onArmoryClick: () => void }) => {
  const items = [
    { img: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&q=80&w=600', name: 'Tactical Vest', price: '$499' },
    { img: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600', name: 'Reaper Pistol', price: '$899' },
    { img: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=600', name: 'NVG Helmet', price: '$1,200' },
    { img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600', name: 'Reaper Boots', price: '$299' }
  ];
  return (
    <section className="py-24 bg-gray-50 crosshair crosshair-tr crosshair-bl border-y border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div><span className="font-stencil text-army-olive text-xs tracking-[0.5em] uppercase block mb-4">Logistics Supply</span><h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight">MILITARY SHOP</h2></div>
          <button onClick={onArmoryClick} className="btn-tactical border-2 border-army-olive text-army-olive hover:bg-army-olive hover:text-white text-[10px]">FULL ARMORY</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((p, i) => (
            <div key={i} className="bg-white p-6 shadow-xl group border border-gray-200 hover:border-army-olive transition-colors">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-gray-100 clip-tactical">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                <div className="absolute top-4 right-4 bg-army-olive text-white p-3"><ShoppingBag size={18} /></div>
              </div>
              <h5 className="font-bold text-xl uppercase mb-2 tracking-tight">{p.name}</h5>
              <p className="font-bold text-2xl text-army-olive mb-6">{p.price}</p>
              <button className="w-full py-4 bg-gray-900 text-white font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-army-olive transition-all">ADD TO LOADOUT</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SteelForgedStrength = () => {
  const strengths = [
    { title: 'Industrial-Grade Equipment', desc: 'Hardware that exceeds NATO standards and battle-tested in extreme African theaters.', icon: <Shell /> },
    { title: 'Armored Personnel', desc: 'Operators trained beyond special forces level, led by USA Army Veterans.', icon: <Skull /> },
    { title: 'Zero-Failure Protocols', desc: 'Mission-critical standards integrated into every layer of operational doctrine.', icon: <Target /> },
    { title: 'Resource Superiority', desc: 'Unlimited logistics backing for any scale operation, from local to global.', icon: <Zap /> }
  ];
  return (
    <section className="py-24 bg-white relative crosshair crosshair-tl crosshair-br border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-stencil text-army-olive text-xs tracking-[0.4em] uppercase block mb-4">Core Capability</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight">STEEL-FORGED STRENGTH</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {strengths.map((item, i) => (
            <div key={i} className="flex gap-8 items-start p-10 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gray-200 group">
              <div className="text-army-olive group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon as any, { size: 48, strokeWidth: 1.5 })}
              </div>
              <div>
                <h4 className="font-bold text-2xl text-gray-900 mb-3 uppercase tracking-tight">{item.title}</h4>
                <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  return (
    <section id="contact-home" className="py-24 container mx-auto px-6 relative crosshair crosshair-tl crosshair-br">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-4xl font-bold uppercase mb-12 tracking-tight border-l-8 border-army-olive pl-8">CONTACT US</h2>
          <p className="text-gray-500 text-xl leading-relaxed mb-12 italic">"Our leadership is composed of decorated Veteran USA Army officers. Every briefing is handled with Tier-1 confidentiality."</p>
          <div className="space-y-10">
            <div className="flex gap-6"><MapPin className="text-army-olive" /><div><h4 className="font-bold uppercase tracking-widest text-sm">Primary HQ</h4><p className="text-gray-400">Settled in Africa | Operational Command Centre Delta</p></div></div>
            <div className="flex gap-6"><Radio className="text-army-olive" /><div><h4 className="font-bold uppercase tracking-widest text-sm">Secure Frequency</h4><p className="text-gray-400 font-mono tracking-tighter">COMS-CHANNEL-001-QRSI-SECURE</p></div></div>
            <div className="flex gap-6"><Phone className="text-army-olive" /><div><h4 className="font-bold uppercase tracking-widest text-sm">Priority Uplink</h4><p className="text-gray-400">+1-800-QRSI-WAR</p></div></div>
          </div>
        </div>
        <div className="bg-white p-12 shadow-2xl border border-gray-100 relative">
          <div className="absolute top-0 right-0 w-24 h-24 camo-pattern opacity-10 pointer-events-none"></div>
          {status === 'sent' ? (
            <div className="text-center py-24"><Shield size={80} className="text-army-olive mx-auto mb-8 animate-pulse" /><h3 className="text-4xl font-bold uppercase mb-4">TRANSMISSION OK</h3><p className="text-gray-400 uppercase tracking-widest text-sm">Stand by for encrypted command response.</p><button onClick={() => setStatus('idle')} className="mt-8 border-b-2 border-army-olive text-[10px] font-bold uppercase tracking-widest">Send New Dossier</button></div>
          ) : (
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setStatus('sending'); setTimeout(() => setStatus('sent'), 2000); }}>
              <div className="space-y-2"><label className="text-[10px] font-stencil tracking-[0.4em] text-army-drab uppercase">Ident / Callsign</label><input required type="text" placeholder="ENTER NAME" className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-lg tracking-widest uppercase placeholder:text-gray-200 bg-transparent transition-colors" /></div>
              <div className="space-y-2"><label className="text-[10px] font-stencil tracking-[0.4em] text-army-drab uppercase">Secure Link</label><input required type="email" placeholder="ENTER EMAIL" className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-lg tracking-widest uppercase placeholder:text-gray-200 bg-transparent transition-colors" /></div>
              <div className="space-y-2"><label className="text-[10px] font-stencil tracking-[0.4em] text-army-drab uppercase">Mission Parameters</label><textarea required rows={4} placeholder="DESCRIBE ENGAGEMENT" className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-lg tracking-widest uppercase placeholder:text-gray-200 resize-none bg-transparent transition-colors"></textarea></div>
              <button disabled={status === 'sending'} className="btn-tactical bg-army-olive text-white w-full uppercase tracking-[0.5em]">{status === 'sending' ? 'ENCRYPTING...' : 'TRANSMIT MISSION BRIEF'}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setView }: { setView: (v: ViewType) => void }) => (
  <footer className="bg-army-dark py-24 text-white relative crosshair crosshair-bl overflow-hidden border-t border-white/5">
    <div className="absolute inset-0 camo-pattern opacity-5 pointer-events-none"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-8 cursor-pointer group" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
            <Shell className="text-army-olive w-10 h-10 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-4xl font-bold tracking-tighter uppercase font-stencil">QRSI<span className="text-army-olive">.WAR</span></span>
          </div>
          <p className="text-gray-500 text-lg leading-relaxed mb-10">Next generation private military excellence. Born from quantum science, forged in industrial might. Deployed in Africa theaters with Tier-1 precision.</p>
          <div className="flex gap-4">
             {[Shield, Target, Lock].map((Icon, i) => (
               <div key={i} className="w-12 h-12 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-army-olive hover:text-white hover:border-army-olive transition-all cursor-pointer group">
                 <Icon size={20} className="group-hover:scale-110 transition-transform" />
               </div>
             ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-6">
            <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-army-drab border-l-4 border-army-olive pl-4 mb-8">COMMAND</h5>
            <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Base HQ</button>
            <button onClick={() => { setView('about'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Doctrine</button>
            <button onClick={() => { setView('services'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Operations</button>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-army-drab border-l-4 border-army-olive pl-4 mb-8">LOGISTICS</h5>
            <button onClick={() => { setView('armory'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[10px] tracking-widest font-bold text-left transition-colors">The Armory</button>
            <button onClick={() => { setView('contact'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Secure Intel</button>
            <a href="#" className="block text-gray-500 hover:text-white uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Archive</a>
          </div>
        </div>
      </div>
      <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-gray-600 text-[10px] tracking-[0.4em] uppercase font-bold leading-relaxed">© 2026 QUANTUM REAPER STEEL INTERNATIONAL. SECURED CHANNEL.</p>
          <p className="text-gray-700 text-[9px] tracking-[0.2em] uppercase mt-2">OPERATING UNDER REAPER-PROTOCOL 9 // AUTHORIZATION REQ: TIER 1</p>
        </div>
        <div className="flex gap-6 items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {['mastercard', 'visa', 'paypal'].map(p => <img key={p} src={`https://img.icons8.com/ios-filled/50/ffffff/${p}.png`} alt={p} className="h-6" />)}
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [selectedHomeService, setSelectedHomeService] = useState<ServiceItem | null>(null);

  return (
    <div className="min-h-screen selection:bg-army-olive selection:text-white bg-white font-body">
      <Navbar currentView={view} setView={setView} />
      <main>
        {view === 'home' && (
          <>
            <Hero setView={setView} />
            <section id="who-we-are-teaser" className="py-24 bg-white relative crosshair crosshair-tl crosshair-br">
              <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                   <div className="lg:w-1/2">
                      <span className="font-stencil text-army-olive text-xs tracking-[0.4em] uppercase mb-4 block">Our Doctrine</span>
                      <h2 className="text-5xl font-bold uppercase mb-8 leading-tight tracking-tighter">STEEL-FORGED <br/> OPERATIONAL SUPREMACY</h2>
                      <p className="text-gray-500 text-xl mb-10 leading-relaxed italic border-l-8 border-army-olive pl-8">"QRSI represents the next generation of private military excellence. Our operators redefined security through technological supremacy and surgical precision."</p>
                      <button onClick={() => { setView('about'); window.scrollTo(0, 0); }} className="btn-tactical bg-army-olive text-white shadow-xl">READ DOCTRINE</button>
                   </div>
                   <div className="lg:w-1/2 relative group">
                      <div className="absolute -inset-4 border border-army-olive/20 -z-10 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform"></div>
                      <img src="https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&q=80&w=1200" className="w-full shadow-2xl grayscale sepia-[0.3] hue-rotate-[60deg] clip-tactical group-hover:grayscale-0 transition-all duration-700" alt="Tactical Ops" />
                      <div className="absolute top-8 right-8 text-white/50"><Target size={40} strokeWidth={1} /></div>
                   </div>
                </div>
              </div>
            </section>

            <section className="py-20 bg-gray-900 text-white border-y border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 camo-pattern opacity-5 pointer-events-none"></div>
               <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
                  {[
                    ['99.8%', 'PRECISION RATE'], 
                    ['24/7', 'MONITORING'], 
                    ['AFRICA', 'HQ HUB'], 
                    ['USA', 'VETERAN LEAD']
                  ].map(([val, label]) => (
                    <div key={label}>
                      <h4 className="text-5xl font-bold mb-2 font-stencil text-white drop-shadow-lg">{val}</h4>
                      <p className="text-army-olive text-[10px] tracking-[0.4em] uppercase font-bold">{label}</p>
                    </div>
                  ))}
               </div>
            </section>

            <ServicesTeaser onServiceClick={(s) => setSelectedHomeService(s)} />
            
            <MilitaryShopTeaser onArmoryClick={() => { setView('armory'); window.scrollTo(0, 0); }} />
            
            <SteelForgedStrength />
            
            <ContactSection />

            <AnimatePresence>
              {selectedHomeService && (
                <ServiceModal service={selectedHomeService} onClose={() => setSelectedHomeService(null)} />
              )}
            </AnimatePresence>
          </>
        )}
        
        {view === 'about' && (
          <div className="pt-24 min-h-screen bg-white">
            <section className="bg-gray-900 py-40 relative overflow-hidden text-center text-white">
              <div className="absolute inset-0 footage-overlay opacity-20"></div>
              <MDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 px-6">
                <span className="font-stencil text-army-olive text-sm tracking-[0.5em] uppercase mb-6 block">Command Doctrine</span>
                <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter mb-8 font-stencil">WHO WE ARE</h1>
                <p className="text-white/60 text-2xl max-w-4xl mx-auto font-light leading-relaxed">Converging quantum science, tactical precision, and industrial military might into a single global force.</p>
              </MDiv>
            </section>
            <section className="py-24 container mx-auto px-6 text-xl text-gray-500 leading-relaxed max-w-5xl text-center md:text-left">
              <div className="p-12 bg-gray-50 border-l-8 border-army-olive shadow-sm mb-16">
                 <p className="mb-8 font-bold text-gray-900 uppercase tracking-widest text-sm">Born from Excellence.</p>
                 <p className="mb-8">Quantum Reaper Steel International (QRSI) represents the absolute pinnacle of private military excellence. Our team is composed of decorated Veteran USA Army Leadership, bringing decades of combat-tested strategy to the digital and physical frontlines of the 21st century.</p>
                 <p>Every mission is executed with surgical precision, leaving no trace except neutralized threats. We operate extensively in Africa, maintaining a strategic HQ that serves as the nexus for our global operations.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div>
                    <h3 className="text-4xl font-bold uppercase mb-6 tracking-tight text-gray-900">THE REAPER PHILOSOPHY</h3>
                    <p>We don't just neutralization threats—we redefine the concept of security through technological supremacy. Our operators are trained to embody the Reaper philosophy: Silent. Precise. Inevitable. In an era of asymmetric warfare, QRSI is the ultimate deterrent.</p>
                 </div>
                 <img src="https://images.unsplash.com/photo-1544022613-e842b7c6c5f6?auto=format&fit=crop&q=80&w=800" className="w-full clip-tactical shadow-2xl grayscale sepia-[0.3]" alt="Operator" />
              </div>
            </section>
          </div>
        )}

        {view === 'services' && (
          <div className="pt-24">
            <ServicesTeaser onServiceClick={(s) => setSelectedHomeService(s)} />
            <AnimatePresence>
              {selectedHomeService && (
                <ServiceModal service={selectedHomeService} onClose={() => setSelectedHomeService(null)} />
              )}
            </AnimatePresence>
            <section className="pb-24 container mx-auto px-6">
               <div className="bg-army-olive p-16 text-white text-center relative overflow-hidden clip-tactical">
                  <div className="absolute inset-0 camo-pattern opacity-10"></div>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase mb-8 relative z-10">Custom Engagement Briefings</h2>
                  <p className="text-xl max-w-2xl mx-auto mb-12 relative z-10 opacity-80">Our capabilities extend beyond standard protocols. Contact Command for bespoke operational planning and asset deployment.</p>
                  <button onClick={() => setView('contact')} className="btn-tactical bg-white text-army-olive relative z-10">ENGAGE NOW</button>
               </div>
            </section>
          </div>
        )}

        {view === 'armory' && (
          <div className="pt-24 min-h-screen">
             <section className="bg-white py-12 border-b border-gray-100">
                <div className="container mx-auto px-6 text-center">
                   <h1 className="text-6xl font-bold uppercase tracking-tighter font-stencil text-gray-900">THE ARMORY</h1>
                   <p className="text-gray-400 mt-4 uppercase tracking-[0.3em] font-bold text-xs">Tier-1 Hardware Supply</p>
                </div>
             </section>
             <MilitaryShopTeaser onArmoryClick={() => {}} />
          </div>
        )}

        {view === 'contact' && (
          <div className="pt-24 min-h-screen bg-white">
            <section className="bg-gray-50 py-20 border-b border-gray-100 mb-12">
               <div className="container mx-auto px-6 text-center">
                  <h1 className="text-7xl font-bold uppercase tracking-tighter font-stencil mb-4">SECURE COMMS</h1>
                  <p className="text-army-olive uppercase tracking-[0.5em] font-bold text-xs">Uplink Status: Encrypted</p>
               </div>
            </section>
            <ContactSection />
          </div>
        )}
      </main>
      <Footer setView={setView} />
      
      {/* Tactical Support Hub */}
      <div className="fixed bottom-8 right-8 z-[150] group flex flex-col items-end cursor-pointer">
        <MDiv 
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="bg-white px-8 py-4 rounded-2xl shadow-2xl mb-4 text-xs font-bold text-gray-800 border-l-8 border-army-olive hidden group-hover:block transition-all"
        >
          STANDING BY FOR MISSION ORDERS.
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45"></div>
        </MDiv>
        <div className="w-16 h-16 bg-army-olive rounded-full overflow-hidden border-4 border-white shadow-2xl hover:scale-110 transition-all duration-300 ring-4 ring-army-olive/10 relative">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" 
            alt="Support" 
            className="w-full h-full object-cover grayscale sepia-[0.5] hue-rotate-[60deg]" 
          />
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
