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
  ChevronDown,
  Cloud,
  Home,
  Tag,
  Heart,
  Activity,
  GraduationCap,
  ArrowRight,
  Shell,
  Cpu,
  Eye,
  ShoppingBag,
  Radio,
  Search,
  Globe,
  Award,
  Users,
  SearchCode,
  Briefcase,
  UserCheck,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  Layers,
  Terminal,
  AlertTriangle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// --- Type Casting for Framer Motion ---
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
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <Shell className="text-army-olive w-6 h-6 rotate-45" />
          <span className="text-2xl font-bold tracking-tighter text-gray-800">QRSI<span className="text-black">.WAR</span></span>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          {links.map((link) => (
            <button 
              key={link.name} 
              onClick={() => {
                setView(link.id as ViewType);
                window.scrollTo(0, 0);
              }}
              className={`font-bold text-[10px] tracking-[0.2em] uppercase relative group ${currentView === link.id ? 'text-gray-900 nav-link-active' : 'text-gray-400 hover:text-black transition-colors'}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
           <button 
            onClick={() => setView('contact')}
            className="bg-army-olive text-white px-8 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-black transition-all flex items-center gap-2"
           >
             ENGAGE NOW <ArrowRight size={14} />
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
                  onClick={() => {
                    setView(link.id as ViewType);
                    window.scrollTo(0, 0);
                    setMobileMenu(false);
                  }}
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
      alt: "Tactical soldier in desert operations"
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
      alt: "Security monitoring and control room"
    },
    {
      url: "https://images.unsplash.com/photo-1508197146414-0f752e03924f?auto=format&fit=crop&q=80&w=2000",
      alt: "Night vision tactical engagement"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative h-screen flex items-center pt-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <MDiv
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].url} 
              className="w-full h-full object-cover grayscale brightness-[0.3] sepia-[0.3] hue-rotate-[60deg]"
              alt={slides[currentSlide].alt}
            />
          </MDiv>
        </AnimatePresence>
        <div className="absolute inset-0 bg-army-olive/20 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-20">
        <MDiv 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
            <p className="text-white text-xl font-bold drop-shadow-md tracking-[0.3em] uppercase">REC // STATUS: DEPLOYED</p>
          </div>
          <h1 className="text-6xl md:text-[7rem] font-bold text-white uppercase leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl">
            QUANTUM REAPER <br/> STEEL INTERNATIONAL
          </h1>
          <p className="text-white/80 text-2xl font-light max-w-2xl mb-12 border-l-4 border-army-olive pl-8 backdrop-blur-sm bg-black/10 py-2">
            The evolution of warfare. Cutting-edge quantum technology meets uncompromising lethality in a digital battlefield.
          </p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => setView('contact')}
              className="btn-rounded bg-army-olive text-white font-bold px-12 py-5 uppercase tracking-[0.2em] text-sm shadow-2xl hover:scale-105 active:scale-95"
            >
              ENGAGE NOW
            </button>
            <button 
              onClick={() => setView('services')}
              className="btn-rounded border-2 border-white/20 text-white font-bold px-12 py-5 uppercase tracking-[0.2em] text-sm backdrop-blur-md hover:bg-white/10 transition-all"
            >
              VIEW SERVICES
            </button>
          </div>
        </MDiv>
      </div>

      <div className="absolute bottom-12 right-12 z-30 flex items-center gap-6">
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 transition-all duration-300 ${currentSlide === idx ? 'w-12 bg-army-olive' : 'w-4 bg-white/20'}`}
            ></button>
          ))}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-3 border border-white/20 text-white hover:bg-army-olive hover:border-army-olive transition-all rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-3 border border-white/20 text-white hover:bg-army-olive hover:border-army-olive transition-all rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 opacity-20 text-army-olive">
        <Crosshair size={300} strokeWidth={0.5} />
      </div>
    </section>
  );
};

const WhoWeArePage = () => (
  <div className="pt-24 min-h-screen bg-white">
    <section className="bg-gray-50 py-24 border-b border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
        <Shell className="w-full h-full rotate-12" />
      </div>
      <div className="container mx-auto px-6 text-center">
        <MDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="font-stencil text-army-olive text-sm tracking-[0.4em] uppercase mb-6 block">Command Doctrine</span>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 uppercase tracking-tighter mb-8">WHO WE ARE</h1>
          <p className="text-gray-500 text-2xl font-light leading-relaxed">
            Born from the convergence of quantum science, tactical precision, and industrial might, QRSI represents the pinnacle of private military excellence.
          </p>
        </MDiv>
      </div>
    </section>

    <section className="py-24 container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 space-y-10">
          <div className="p-12 bg-army-olive text-white shadow-2xl relative">
             <div className="absolute top-0 right-0 p-6 opacity-20">
               <Skull size={80} />
             </div>
             <h2 className="text-4xl font-bold uppercase mb-6 tracking-tight">The Reaper Philosophy</h2>
             <p className="text-xl font-light leading-relaxed opacity-90">
               Our operators don't just neutralize threats—they redefine the very concept of security through technological supremacy and surgical precision. We embody the Reaper philosophy: Silent. Precise. Inevitable.
             </p>
          </div>
          <p className="text-gray-500 text-lg leading-relaxed">
            Every mission is executed with surgical precision, leaving no trace except the complete neutralization of threats. We don't engage in conflicts—we end them. Our team is composed of decorated Veteran USA Army Leadership, bringing decades of combat experience to modern private operations.
          </p>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1544022613-e842b7c6c5f6?auto=format&fit=crop&q=80&w=600" className="w-full h-80 object-cover shadow-lg hover:scale-105 transition-transform duration-500 grayscale sepia-[0.2] hue-rotate-[60deg]" alt="Training Drill" />
          <img src="https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&q=80&w=600" className="w-full h-80 object-cover shadow-lg translate-y-8 hover:scale-105 transition-transform duration-500 grayscale sepia-[0.2] hue-rotate-[60deg]" alt="Live Fire Exercise" />
        </div>
      </div>
    </section>
  </div>
);

const ServicesPortfolio = ({ onServiceClick }: { onServiceClick: (s: ServiceItem) => void }) => {
  const teaserServices: ServiceItem[] = [
    { 
      title: 'High-Value Target Elimination', 
      desc: 'Surgical elimination of priority threats using advanced kinetic and quantum-assisted targeting.', 
      longDesc: 'Our HVT elimination protocols utilize a combination of long-range ballistic superiority and quantum-assisted predictive modeling. Operations are conducted under strict non-attribution frameworks.',
      icon: <Skull />,
      requirements: ['Quantum Uplink Active', 'Tier-1 Operative Lead', 'Clear Mission Authorization']
    },
    { 
      title: 'Counter-Terrorism Strikes', 
      icon: <Zap />, 
      desc: 'Pre-emptive strikes against localized and global insurgent threats using precision tactical assets.',
      longDesc: 'By leveraging our global intelligence network settled in Africa, we identify insurgent nodes and execute precision strikes to destabilize hostile command structures.',
      requirements: ['Ground Intel Verification', 'Precision Munitions', 'Low Collateral Protocol']
    },
    { 
      title: 'Corporate Asset Protection', 
      icon: <Shield />, 
      desc: 'Tier-1 physical and cyber protection for multi-national corporate assets and high-net-worth leadership.',
      longDesc: 'We provide 360-degree protection shells that include executive security details and hardened facility defense layers integrated with quantum encryption.',
      requirements: ['24/7 Command Monitoring', 'Encrypted Comm Hub', 'Tier-2 Protection Detail']
    }
  ];

  return (
    <section className="py-24 bg-white relative crosshair crosshair-tl crosshair-br border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-stencil text-army-olive text-xs tracking-[0.4em] uppercase mb-4 block">Operation Hub</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight">SERVICES & PORTFOLIO</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 shadow-2xl">
          {teaserServices.map((service, i) => (
            <MDiv 
              key={i}
              whileHover={{ y: -5 }}
              onClick={() => onServiceClick(service)}
              className="bg-white p-12 hover:bg-gray-50 transition-all duration-300 group border-gray-100 cursor-pointer text-center md:text-left"
            >
              <div className="text-army-olive mb-10 group-hover:scale-110 transition-transform duration-500 flex justify-center md:justify-start">
                {React.cloneElement(service.icon as React.ReactElement<any>, { size: 56, strokeWidth: 1 })}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 uppercase mb-6 tracking-tight group-hover:text-army-olive transition-colors">{service.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 line-clamp-3">{service.desc}</p>
              <div className="flex items-center gap-2 text-army-olive font-bold text-xs tracking-widest uppercase justify-center md:justify-start">
                Full Dossier <ArrowRight size={14} />
              </div>
            </MDiv>
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
    <section className="py-24 bg-gray-50 relative crosshair crosshair-tr crosshair-bl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="font-stencil text-army-olive text-xs tracking-[0.4em] uppercase mb-4 block">Supply Chain</span>
            <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight">MILITARY SHOP</h2>
            <p className="text-gray-500 text-xl mt-4">Premium tactical gear and light firearms. Quantum-forged for the elite operator.</p>
          </div>
          <button 
            onClick={onArmoryClick}
            className="bg-army-olive text-white font-bold px-10 py-4 uppercase tracking-widest text-xs flex items-center gap-3 shadow-lg"
          >
            Visit Armory <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((p, i) => (
            <div key={i} className="bg-white p-6 shadow-xl group border border-gray-100 flex flex-col hover:border-army-olive transition-all">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-gray-100">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale hue-rotate-[60deg] brightness-75 group-hover:grayscale-0 group-hover:brightness-100" />
                <div className="absolute top-4 right-4 bg-army-olive text-white p-3 rounded-full">
                  <ShoppingBag size={18} />
                </div>
              </div>
              <h5 className="font-bold text-xl text-gray-900 uppercase mb-2 tracking-tight">{p.name}</h5>
              <p className="font-bold text-2xl text-army-olive mb-6">{p.price}</p>
              <button className="w-full py-4 border-2 border-army-olive text-army-olive font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-army-olive hover:text-white transition-all">
                ADD TO LOADOUT
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SteelForgedStrength = () => {
  const strengths = [
    { title: 'Industrial-Grade Equipment', desc: 'Military hardware that exceeds NATO standards and battle-tested in extreme environments.', icon: <Shell /> },
    { title: 'Armored Personnel', desc: 'Operators trained beyond special forces level, with veteran USA Army leadership.', icon: <Skull /> },
    { title: 'Uncompromising Standards', desc: 'Zero-failure mission protocols integrated into every layer of our operational doctrine.', icon: <Target /> },
    { title: 'Resource Superiority', desc: 'Unlimited backing for any operation scale, from local strikes to global defense.', icon: <Zap /> }
  ];

  return (
    <section className="py-24 bg-white relative crosshair crosshair-tl crosshair-br border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-stencil text-army-olive text-xs tracking-[0.4em] uppercase mb-4 block">Core Capability</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight">STEEL-FORGED STRENGTH</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {strengths.map((item, i) => (
            <div key={i} className="flex gap-8 items-start p-10 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gray-200">
              <div className="text-army-olive">
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 48, strokeWidth: 1.5 })}
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

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const allServices: ServiceItem[] = [
    { 
      title: 'High-Value Target Elimination', 
      desc: 'Surgical elimination of priority threats using advanced kinetic and quantum-assisted targeting.', 
      longDesc: 'Our HVT elimination protocols utilize a combination of long-range ballistic superiority and quantum-assisted predictive modeling. We provide end-to-end mission planning from intelligence gathering to terminal phase execution. Operations are conducted under strict non-attribution frameworks, ensuring complete deniability and absolute mission success.',
      icon: <Skull />,
      requirements: ['Quantum Uplink Active', 'Tier-1 Operative Lead', 'Clear Mission Authorization']
    },
    { 
      title: 'Hostage Recovery Operations', 
      icon: <Target />, 
      desc: 'Rapid insertion and extraction protocols for the safe recovery of personnel in high-risk zones.',
      longDesc: 'Time is the critical vector in recovery missions. QRSI recovery teams are trained in zero-light breaching and high-speed extraction techniques. We maintain specialized transit assets capable of deep insertion into hostile territories, providing a lifeline when all other options are exhausted.',
      requirements: ['Instant Response Team', 'Secure Extraction Point', 'Aerial Support On-call']
    },
    { 
      title: 'Counter-Terrorism Strikes', 
      icon: <Zap />, 
      desc: 'Pre-emptive strikes against localized and global insurgent threats using precision tactical assets.',
      longDesc: 'Preventative action is the core of counter-terrorism. By leveraging our global intelligence network settled in Africa, we identify insurgent nodes and execute precision strikes to destabilize hostile command structures before they mobilize. Our strikes are calculated for maximum disruption with minimum overhead.',
      requirements: ['Ground Intel Verification', 'Precision Munitions', 'Low Collateral Protocol']
    },
    { 
      title: 'Corporate Asset Protection', 
      icon: <Shield />, 
      desc: 'Tier-1 physical and cyber protection for multi-national corporate assets and high-net-worth leadership.',
      longDesc: 'The modern corporate battlefield is both physical and digital. We provide 360-degree protection shells that include executive security details and hardened facility defense layers integrated with quantum encryption, safeguarding both life and intellectual property against industrial espionage.',
      requirements: ['24/7 Command Monitoring', 'Encrypted Comm Hub', 'Tier-2 Protection Detail']
    },
    { 
      title: 'Government Facility Security', 
      icon: <Lock />, 
      desc: 'Comprehensive defensive layer integration for critical national infrastructure and government assets.',
      longDesc: 'National security demands zero-failure protocols. QRSI integrates with existing government frameworks to provide advanced surveillance, automated counter-measures, and hardened perimeter defense systems, ensuring that critical infrastructure remains operational under any threat level.',
      requirements: ['Authorized Clearance', 'Infrastructure Integration', 'System Redundancy']
    },
    { 
      title: 'Private Security', 
      icon: <Users />, 
      desc: 'Specialized close-protection units for high-risk transits and static location security.',
      longDesc: 'Our close protection units are composed of veterans with extensive experience in urban and rural combat environments. We prioritize discretion and effective threat neutralization while maintaining the principal\'s itinerary, providing a "quiet professional" shield in volatile regions.',
      requirements: ['Advance Scout Team', 'Armored Transport', 'Medical Liaison']
    },
    { 
      title: 'Private Investigation', 
      icon: <SearchCode />, 
      desc: 'Discreet background and logistical investigations using quantum data analysis and ground intel.',
      longDesc: 'Knowledge is the foundation of strategic advantage. Our investigative units deploy deep-dive data forensics alongside traditional boots-on-the-ground intelligence gathering to uncover hidden liabilities, hostile intent, and logistical vulnerabilities that others miss.',
      requirements: ['Data Mining License', 'Secure Evidence Locker', 'Ground Intel Network']
    },
    { 
      title: 'Private Detective Services', 
      icon: <Briefcase />, 
      desc: 'Professional surveillance and discovery services with total confidentiality and zero trace.',
      longDesc: 'We provide specialized surveillance services for high-stakes corporate and legal discoveries. Our techniques involve zero-footprint observation protocols and high-resolution optical and thermal documentation, delivering irrefutable proof with absolute operational security.',
      requirements: ['Confidentiality Agreement', 'Surveillance Assets', 'Zero-Trace Equipment']
    },
    { 
      title: 'Intelligence & Spy Unit Ops', 
      icon: <EyeOff />, 
      desc: 'Deep-cover intelligence gathering and psychological operations to destabilize hostile agendas.',
      longDesc: 'Operational success often depends on what is not seen. Our spy units operate in the shadows to manipulate hostile perception, gather critical intelligence, and sabotage opposing logistical chains from within, winning the war of information before a single shot is fired.',
      requirements: ['Deep Cover Identity', 'Encrypted Burst Transmitter', 'Non-Attributable Assets']
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="bg-gray-900 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1542385381-49fe6254d8ee?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale brightness-50" alt="Tactical Background" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <MDiv initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
            <span className="text-army-olive font-stencil text-xs tracking-[0.5em] uppercase mb-6 block">Engagement Capabilities</span>
            <h1 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-8">SERVICES & PORTFOLIO</h1>
            <p className="text-white/60 text-2xl font-light">Uncompromising lethality meets surgical precision in every deployment. Our portfolio is the result of decades of combat-tested strategy.</p>
          </MDiv>
        </div>
      </section>

      <section className="py-24 bg-white crosshair crosshair-tl crosshair-br">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {allServices.map((service, i) => (
              <MDiv 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedService(service)}
                className="bg-white p-12 hover:bg-gray-50 transition-all duration-300 group border-gray-100 cursor-pointer relative"
              >
                <div className="text-army-olive mb-10 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { size: 56, strokeWidth: 1 })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 uppercase mb-6 tracking-tight group-hover:text-army-olive transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-10 line-clamp-3">{service.desc}</p>
                <div className="flex items-center gap-2 text-army-olive font-bold text-xs tracking-widest uppercase">
                  View Full Dossier <ArrowRight size={14} />
                </div>
              </MDiv>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const ServiceModal = ({ service, onClose }: { service: ServiceItem, onClose: () => void }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
    <MDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-black/80 backdrop-blur-sm"
    />
    <MDiv
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden border-t-8 border-army-olive"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors z-10"
      >
        <X size={32} />
      </button>
      
      <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        <div className="md:w-1/3 bg-gray-50 p-12 flex flex-col items-center justify-center border-r border-gray-100">
           <div className="text-army-olive mb-6">
             {React.cloneElement(service.icon as React.ReactElement<any>, { size: 100, strokeWidth: 1 })}
           </div>
           <div className="text-center space-y-4">
             <h4 className="font-stencil text-army-drab text-xs tracking-widest uppercase">Classification: Restricted</h4>
             <div className="py-1 px-3 bg-red-100 text-red-700 text-[10px] font-bold tracking-widest uppercase rounded">Tier-1 Access Only</div>
           </div>
        </div>
        <div className="md:w-2/3 p-12 bg-white">
           <h2 className="text-4xl font-bold uppercase mb-8 tracking-tighter text-gray-900 border-b-4 border-gray-100 pb-6">{service.title}</h2>
           <p className="text-gray-500 text-xl leading-relaxed mb-10">{service.longDesc}</p>
           
           <div className="space-y-6 mb-12">
             <h5 className="font-bold text-xs tracking-[0.3em] uppercase text-army-drab flex items-center gap-2">
               <Terminal size={14} /> Operational Requirements
             </h5>
             <div className="grid grid-cols-1 gap-4">
               {service.requirements.map((req, i) => (
                 <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 border-l-4 border-army-olive">
                   <ChevronRight size={18} className="text-army-olive" />
                   <span className="font-bold text-sm text-gray-800 tracking-wide uppercase">{req}</span>
                 </div>
               ))}
             </div>
           </div>

           <button className="bg-army-olive text-white font-bold w-full py-5 uppercase tracking-[0.3em] text-sm shadow-xl hover:bg-black transition-colors flex items-center justify-center gap-4">
             Request Engagement Briefing <Shield size={18} />
           </button>
        </div>
      </div>
    </MDiv>
  </div>
);

const ArmoryPage = () => {
  const [filter, setFilter] = useState('ALL');
  const categories = ['ALL', 'PROTECTION', 'ARMAMENT', 'TACTICAL GEAR'];
  
  const products = [
    { img: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&q=80&w=600', name: 'Quantum Tactical Vest', price: '$499', cat: 'PROTECTION', spec: 'Level IV Ceramic Plating' },
    { img: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600', name: 'Reaper Pistol S-1', price: '$899', cat: 'ARMAMENT', spec: 'Match-Grade Barrel' },
    { img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600', name: 'Steel Reaper Boots', price: '$299', cat: 'TACTICAL GEAR', spec: 'Tuncture-Resistant Sole' },
    { img: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=600', name: 'Quantum NVG Helmet', price: '$1,200', cat: 'PROTECTION', spec: 'Gen-3 White Phosphor' },
    { img: 'https://images.unsplash.com/photo-1611637576109-b6f76185ec9b?auto=format&fit=crop&q=80&w=600', name: 'Tactical Backplate', price: '$350', cat: 'PROTECTION', spec: 'Lightweight Composite' },
    { img: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=600', name: 'Comms Headset X-2', price: '$180', cat: 'TACTICAL GEAR', spec: 'Active Noise Reduction' }
  ];

  const filteredProducts = filter === 'ALL' ? products : products.filter(p => p.cat === filter);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="bg-gray-50 py-24 border-b border-gray-100 relative">
        <div className="container mx-auto px-6 text-center">
          <MDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <span className="font-stencil text-army-olive text-sm tracking-[0.4em] uppercase mb-6 block">Supply Chain Command</span>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 uppercase tracking-tighter mb-8">THE ARMORY</h1>
            <p className="text-gray-500 text-2xl font-light leading-relaxed">
              Premium tactical gear and light firearms. Quantum-forged for the elite operator. Tested in African theaters, validated by global command.
            </p>
          </MDiv>
        </div>
      </section>

      <section className="py-12 bg-army-dark sticky top-[80px] z-[50] border-b border-white/10 overflow-x-auto">
        <div className="container mx-auto px-6 flex justify-center gap-12 min-w-max">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`font-bold text-[10px] tracking-[0.4em] uppercase transition-all relative py-2 ${filter === cat ? 'text-white' : 'text-white/40 hover:text-white'}`}
            >
              {cat}
              {filter === cat && <MDiv layoutId="filter-active" className="absolute -bottom-2 left-0 w-full h-1 bg-army-olive" />}
            </button>
          ))}
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map((p, i) => (
            <MDiv 
              key={i} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 shadow-xl group border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all"
            >
              <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-gray-50 border-8 border-gray-50">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale hue-rotate-[60deg] brightness-75 hover:grayscale-0 hover:brightness-100" />
                <div className="absolute top-6 right-6 bg-army-olive text-white p-4 rounded-full shadow-lg">
                  <ShoppingBag size={20} />
                </div>
                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur px-4 py-2 font-bold text-[10px] tracking-widest uppercase text-white shadow-sm">
                  {p.cat}
                </div>
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-2xl text-gray-900 uppercase mb-2 tracking-tight">{p.name}</h5>
                <p className="text-gray-400 text-xs font-bold tracking-widest mb-6 uppercase italic">{p.spec}</p>
                <p className="font-bold text-3xl text-army-olive mb-10">{p.price}</p>
              </div>
              <button className="w-full py-5 bg-gray-900 text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-army-olive transition-all shadow-sm flex items-center justify-center gap-3">
                ADD TO LOADOUT <Crosshair size={16} />
              </button>
            </MDiv>
          ))}
        </div>
      </section>
    </div>
  );
};

const ContactSection = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 2000);
  };

  return (
    <section id="contact-home" className="py-24 container mx-auto px-6 max-w-7xl relative crosshair crosshair-tl crosshair-br">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div>
            <h2 className="text-4xl font-bold uppercase mb-12 tracking-tight text-gray-900 border-l-8 border-army-olive pl-8">CONTACT US</h2>
            <p className="text-gray-500 text-xl leading-relaxed">Ready to deploy the Reaper? Secure your operations with QRSI. Our command center is active 24/7 for secure engagement briefings.</p>
            <div className="space-y-12 mt-12">
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-2xl text-army-olive shadow-sm border border-gray-100 group-hover:bg-army-olive group-hover:text-white transition-all">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl uppercase mb-2">Primary HQ</h4>
                  <p className="text-gray-500 italic">Settled in Africa | Operational Command Centre</p>
                </div>
              </div>
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-2xl text-army-olive shadow-sm border border-gray-100 group-hover:bg-army-olive group-hover:text-white transition-all">
                  <Radio size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl uppercase mb-2">Secure Frequency</h4>
                  <p className="text-gray-500 font-mono tracking-widest">COMS-CHANNEL-001-QRSI</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 shadow-2xl border border-gray-100 relative">
          <div className="absolute top-0 right-0 w-24 h-24 camo-pattern opacity-10 pointer-events-none"></div>
          {status === 'sent' ? (
            <MDiv initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24 flex flex-col items-center">
              <Shield className="text-army-olive w-20 h-20 mb-8" />
              <h3 className="text-4xl font-bold uppercase mb-4 tracking-tighter">Transmission Received</h3>
              <p className="text-gray-500 text-lg">Dossier sent to Command. Stand by on encrypted frequencies.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-army-olive font-bold uppercase tracking-widest text-xs border-b-2 border-army-olive">New Transmission</button>
            </MDiv>
          ) : (
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="font-stencil text-[10px] tracking-[0.4em] text-army-drab uppercase">Ident / Callsign</label>
                <input required type="text" className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive transition-all font-bold text-xl tracking-wide placeholder:text-gray-200 bg-transparent" placeholder="ENTER NAME" />
              </div>
              <div className="space-y-3">
                <label className="font-stencil text-[10px] tracking-[0.4em] text-army-drab uppercase">Encrypted Link</label>
                <input required type="email" className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive transition-all font-bold text-xl tracking-wide placeholder:text-gray-200 bg-transparent" placeholder="ENTER SECURE EMAIL" />
              </div>
              <div className="space-y-3">
                <label className="font-stencil text-[10px] tracking-[0.4em] text-army-drab uppercase">Brief</label>
                <textarea required rows={4} className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive transition-all font-bold text-xl tracking-wide placeholder:text-gray-200 resize-none bg-transparent" placeholder="DESCRIBE THE ENGAGEMENT"></textarea>
              </div>
              <button disabled={status === 'sending'} className="btn-rounded bg-army-olive text-white font-bold w-full py-6 uppercase tracking-[0.4em] text-sm shadow-xl flex items-center justify-center gap-4 hover:bg-black transition-all">
                {status === 'sending' ? 'TRANSMITTING...' : <>TRANSMIT MISSION BRIEF <ArrowRight size={20} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// --- Contact Page Component ---
const ContactPage = () => (
  <div className="bg-white">
    <section className="bg-gray-900 py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale brightness-50" alt="Comms Background" />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <MDiv initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
          <span className="text-army-olive font-stencil text-xs tracking-[0.5em] uppercase mb-6 block">Direct Uplink</span>
          <h1 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-8">SECURE COMMS</h1>
          <p className="text-white/60 text-2xl font-light">Establishing encrypted connection with QRSI command. STANDBY FOR BRIEFING.</p>
        </MDiv>
      </div>
    </section>
    <div className="py-12">
      <ContactSection />
    </div>
  </div>
);

const Footer = ({ setView }: { setView: (v: ViewType) => void }) => (
  <footer className="bg-army-dark py-24 border-t border-white/5 relative crosshair crosshair-bl overflow-hidden">
    {/* Background subtle noise texture effect */}
    <div className="absolute inset-0 camo-pattern opacity-5 pointer-events-none"></div>
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-8 cursor-pointer group" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
            <Shell className="text-army-olive w-10 h-10 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-4xl font-bold tracking-tighter text-white uppercase">QRSI<span className="text-army-olive">.WAR</span></span>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            The next generation of private military excellence. Born from quantum science, forged in industrial might, and deployed for ultimate precision.
          </p>
          <div className="flex gap-4">
             <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-army-olive hover:text-white hover:border-army-olive transition-all cursor-pointer"><Shield size={20} /></div>
             <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-army-olive hover:text-white hover:border-army-olive transition-all cursor-pointer"><Target size={20} /></div>
             <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-army-olive hover:text-white hover:border-army-olive transition-all cursor-pointer"><Lock size={20} /></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-12 md:gap-x-24 gap-y-12">
          <div className="space-y-6">
            <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-white mb-8 border-l-4 border-army-olive pl-4">Tactical Map</h5>
            <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="block text-gray-400 hover:text-army-olive uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Base HQ</button>
            <button onClick={() => { setView('about'); window.scrollTo(0, 0); }} className="block text-gray-400 hover:text-army-olive uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Doctrine</button>
            <button onClick={() => { setView('services'); window.scrollTo(0, 0); }} className="block text-gray-400 hover:text-army-olive uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Operations</button>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-white mb-8 border-l-4 border-army-olive pl-4">Logistics</h5>
            <button onClick={() => { setView('armory'); window.scrollTo(0, 0); }} className="block text-gray-400 hover:text-army-olive uppercase text-[10px] tracking-widest font-bold text-left transition-colors">The Armory</button>
            <button onClick={() => { setView('contact'); window.scrollTo(0, 0); }} className="block text-gray-400 hover:text-army-olive uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Secure Intel</button>
            <a href="#" className="block text-gray-400 hover:text-army-olive uppercase text-[10px] tracking-widest font-bold text-left transition-colors">Digital Archive</a>
          </div>
        </div>
      </div>
      
      <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-gray-400 text-[10px] tracking-[0.4em] uppercase font-bold">
            © 2026 QUANTUM REAPER STEEL INTERNATIONAL. SECURED CHANNEL.
          </p>
          <p className="text-gray-600 text-[9px] tracking-[0.2em] uppercase">
            OPERATING UNDER REAPER-PROTOCOL 9 // AUTHORIZATION REQ: TIER 1
          </p>
        </div>
        
        <div className="flex gap-6 items-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
           <img src="https://img.icons8.com/ios-filled/50/ffffff/mastercard.png" alt="mastercard" className="h-6" />
           <img src="https://img.icons8.com/ios-filled/50/ffffff/visa.png" alt="visa" className="h-6" />
           <img src="https://img.icons8.com/ios-filled/50/ffffff/paypal.png" alt="paypal" className="h-6" />
        </div>
      </div>
    </div>
    
    {/* Mechanical decorative element */}
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-army-olive/5 rounded-full blur-3xl -mb-32 -mr-32 pointer-events-none"></div>
  </footer>
);

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [selectedHomeService, setSelectedHomeService] = useState<ServiceItem | null>(null);

  return (
    <div className="min-h-screen selection:bg-army-olive selection:text-white bg-white">
      <Navbar currentView={view} setView={setView} />
      <main>
        {view === 'home' && (
          <>
            <Hero setView={setView} />
            <section id="who-we-are-teaser" className="py-24 bg-white relative crosshair crosshair-tl crosshair-br">
              <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                   <div className="lg:w-1/2">
                      <span className="font-stencil text-army-olive text-xs tracking-widest mb-4 block uppercase">Our Legacy</span>
                      <h2 className="text-5xl font-bold uppercase mb-8 leading-tight">Advanced Tactical <br/> Excellence</h2>
                      <p className="text-gray-500 text-lg mb-10 leading-relaxed">Born from the convergence of quantum science and industrial might, QRSI leads the new era of private military engagement with surgical precision and absolute mission commitment.</p>
                      <button 
                        onClick={() => { setView('about'); window.scrollTo(0, 0); }}
                        className="btn-rounded bg-army-olive text-white font-bold px-10 py-4 uppercase tracking-widest text-xs flex items-center gap-3 shadow-lg"
                      >
                        Read Full Doctrine <ArrowRight size={16} />
                      </button>
                   </div>
                   <div className="lg:w-1/2 relative">
                      <div className="absolute -inset-4 border border-army-olive/20 -z-10 translate-x-4 translate-y-4"></div>
                      <img src="https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&q=80&w=800" className="w-full shadow-2xl grayscale sepia-[0.3] hue-rotate-[60deg] brightness-75" alt="Tactical Drill" />
                   </div>
                </div>
              </div>
            </section>
            
            <section className="py-20 bg-gray-50 border-y border-gray-100">
               <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                  <div>
                    <h4 className="text-5xl font-bold text-gray-900 mb-2">99.8%</h4>
                    <p className="text-army-drab text-[10px] tracking-widest uppercase font-stencil">Precision Rate</p>
                  </div>
                  <div>
                    <h4 className="text-5xl font-bold text-gray-900 mb-2">24/7</h4>
                    <p className="text-army-drab text-[10px] tracking-widest uppercase font-stencil">Global Monitoring</p>
                  </div>
                  <div>
                    <h4 className="text-5xl font-bold text-gray-900 mb-2">USA</h4>
                    <p className="text-army-drab text-[10px] tracking-widest uppercase font-stencil">Veteran Leadership</p>
                  </div>
                  <div>
                    <h4 className="text-5xl font-bold text-gray-900 mb-2">AFRICA</h4>
                    <p className="text-army-drab text-[10px] tracking-widest uppercase font-stencil">Command HQ</p>
                  </div>
               </div>
            </section>

            <ServicesPortfolio onServiceClick={(s) => setSelectedHomeService(s)} />
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
        {view === 'about' && <WhoWeArePage />}
        {view === 'services' && <ServicesPage />}
        {view === 'armory' && <ArmoryPage />}
        {view === 'contact' && (
          <div className="pt-24 min-h-screen">
            <ContactPage />
          </div>
        )}
      </main>
      <Footer setView={setView} />
      
      {/* Floating Support Hub */}
      <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end group cursor-pointer">
        <MDiv 
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="bg-white px-8 py-4 rounded-2xl shadow-2xl mb-4 text-sm font-bold text-gray-800 border border-gray-100 hidden group-hover:block transition-all"
        >
          Hi! Standing by for mission orders.
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45"></div>
        </MDiv>
        <div className="w-16 h-16 bg-army-accent rounded-full overflow-hidden border-4 border-white shadow-2xl hover:scale-110 transition-all duration-300 ring-4 ring-army-olive/5">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" 
            alt="Support agent" 
            className="w-full h-full object-cover grayscale sepia-[0.2] hue-rotate-[60deg]" 
          />
        </div>
      </div>
    </div>
  );
}
