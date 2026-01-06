
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
  Eye,
  Cpu,
  Activity,
  Award,
  ZapOff,
  FileSearch,
  Cross,
  UserPlus,
  LifeBuoy,
  Building2,
  Anchor,
  Wifi,
  PlaneTakeoff,
  Truck,
  Factory,
  Map,
  ShieldAlert,
  Camera,
  Video,
  MessageCircle,
  Send
} from 'lucide-react';

const MDiv = motion.div as any;
// Fix: Define MA as motion.a cast to any to allow custom motion props like whileHover on anchor elements without TS errors.
const MA = motion.a as any;

type ViewType = 'home' | 'about' | 'capabilities' | 'armory' | 'contact' | 'consultancy' | 'bodyguard';
type Language = 'en' | 'fr';

interface ServiceItem {
  title: string;
  desc: string;
  longDesc: string;
  icon: React.ReactNode;
  requirements: string[];
}

const translations = {
  en: {
    nav: {
      home: 'HOME',
      about: 'WHO WE ARE',
      capabilities: 'CORE CAPABILITIES',
      bodyguard: 'BODYGUARD VIDEO',
      consultancy: 'CONSULTANCY',
      armory: 'ARMORY',
      contact: 'CONTACT',
      engage: 'ENGAGE NOW'
    },
    hero: [
      { title: "QUANTUM REAPER STEEL", subtitle: "Silent. Precise. Inevitable." },
      { title: "TACTICAL INTELLIGENCE", subtitle: "Global Hub Settled in Africa." },
      { title: "INDUSTRIAL DEFENSE", subtitle: "USA Army Veteran Leadership." },
      { title: "TACTICAL SUPREMACY", subtitle: "Urban Dominance & Secure Extraction." },
      { title: "SAVANNA OVERWATCH", subtitle: "Precision Defense in Africa's Heart." }
    ],
    common: {
      liveFeed: 'LIVE FEED // SECURE LINK',
      africaCommand: 'UP-LINK ACTIVE // AFRICA COMMAND HUB',
      missionReq: 'MISSION REQ:',
      tier1: 'TIER 1 ACCESS',
      ident: 'IDENT: RESTRICTED',
      request: 'REQUEST ENGAGEMENT'
    },
    about: {
      narrative: 'Our Narrative',
      forged: 'FORGED IN BATTLEFIELD DEPLOYED FOR DOMINANCE',
      quote: '"With many years in high-intensity combat zones, I founded QRSI to deliver what nations and corporations need: UNCOMPROMISING SECURITY WITH AMERICAN GRIT."',
      doctrine: 'READ DOCTRINE',
      narrativeHead: 'THE NARRATIVE',
      supremacy: 'THE REAPER SUPREMACY',
      supremacyDesc: "We don't just secure assets; we dominate the environment. Our presence is the ultimate deterrent. Utilizing a combination of kinetic superiority and quantum-fusion intel, we stay 72 hours ahead of hostile intent."
    },
    bodyguard: {
      title: 'About the service',
      desc1: 'QRSI. will ensure that your escort is captured under the professional guidance of an expert for the close protection team. We use advanced equipment and technology to ensure high image clarity and excellent sound.',
      desc2: 'As a result, you will receive a unique video, with professional personal security, which will preserve your most important moments for years to come.',
      expert: 'EXPERT FOR VIDEO SUPPORT'
    }
  },
  fr: {
    nav: {
      home: 'ACCUEIL',
      about: 'QUI SOMMES-NOUS',
      capabilities: 'CAPACITÉS CLÉS',
      bodyguard: 'VIDÉO GARDE DU CORPS',
      consultancy: 'CONSEIL',
      armory: 'ARMURERIE',
      contact: 'CONTACT',
      engage: 'ENGAGER'
    },
    hero: [
      { title: "QUANTUM REAPER STEEL", subtitle: "Silencieux. Précis. Inévitable." },
      { title: "INTELLIGENCE TACTIQUE", subtitle: "Hub Global Installé en Afrique." },
      { title: "DÉFENSE INDUSTRIELLE", subtitle: "Direction par Vétérans de l'Armée USA." },
      { title: "SUPRÉMATIE TACTIQUE", subtitle: "Dominance Urbaine et Extraction Sécurisée." },
      { title: "VEILLE SAVANE", subtitle: "Défense de Précision au Coeur de l'Afrique." }
    ],
    common: {
      liveFeed: 'FLUX DIRECT // LIEN SÉCURISÉ',
      africaCommand: 'LIAISON ACTIVE // HUB DE COMMANDEMENT AFRIQUE',
      missionReq: 'REQ. MISSION :',
      tier1: 'ACCÈS NIVEAU 1',
      ident: 'IDENT : RESTREINT',
      request: 'DEMANDER ENGAGEMENT'
    },
    about: {
      narrative: 'Notre Récit',
      forged: 'FORGÉ SUR LE TERRAIN DÉPLOYÉ POUR LA DOMINANCE',
      quote: '"Avec plus de 9 ans dans des zones de combat à haute intensité, j\'ai fondé QRSI pour offrir ce dont les nations et les entreprises ont besoin : UNE SÉCURITÉ SANS COMPROMIS AVEC LA DÉTERMINATION AMÉRICAINE."',
      doctrine: 'LIRE LA DOCTRINE',
      narrativeHead: 'LE RÉCIT',
      supremacy: 'LA SUPRÉMATIE REAPER',
      supremacyDesc: "Nous ne nous contentons pas de sécuriser les actifs ; nous dominons l'environnement. Notre présence est le moyen de dissuasion ultime. Grâce à une combinaison de supériorité cinétique et d'intelligence fusionnée par quantum, nous gardons 72 heures d'avance sur toute intention hostile."
    },
    bodyguard: {
      title: 'À propos du service',
      desc1: 'QRSI s\'assurera que votre escorte est filmée sous la direction professionnelle d\'un expert de l\'équipe de protection rapprochée. Nous utilisons des équipements et technologies avancés pour garantir une haute clarté d\'image et un son excellent.',
      desc2: 'En conséquence, vous recevrez une vidéo unique, avec une sécurité personnelle professionnelle, qui préservera vos moments les plus importants pour les années à venir.',
      expert: 'EXPERT EN SUPPORT VIDÉO'
    }
  }
};

const Navbar = ({ currentView, setView, lang, setLang }: { currentView: ViewType, setView: (v: ViewType) => void, lang: Language, setLang: (l: Language) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: t.home, id: 'home' },
    { name: t.about, id: 'about' },
    { name: t.capabilities, id: 'capabilities' },
    { name: t.bodyguard, id: 'bodyguard' },
    { name: t.consultancy, id: 'consultancy' },
    { name: t.armory, id: 'armory' },
    { name: t.contact, id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
          <Shell className="text-army-olive w-8 h-8 rotate-45" />
          <span className="text-2xl font-bold tracking-tighter text-gray-900 font-stencil uppercase">QRSI<span className="text-army-olive">.WAR</span></span>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {links.map((link) => (
            <button 
              key={link.id} 
              onClick={() => { setView(link.id as ViewType); window.scrollTo(0, 0); }}
              className={`font-bold text-[11px] tracking-[0.2em] uppercase relative py-2 ${currentView === link.id ? 'text-gray-900 nav-link-active' : 'text-gray-400 hover:text-army-olive transition-colors'}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex bg-gray-100 rounded p-1 text-[10px] font-bold">
            <button onClick={() => setLang('en')} className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-army-olive text-white' : 'text-gray-400'}`}>EN</button>
            <button onClick={() => setLang('fr')} className={`px-2 py-1 rounded transition-colors ${lang === 'fr' ? 'bg-army-olive text-white' : 'text-gray-400'}`}>FR</button>
          </div>
           <button 
            onClick={() => setView('contact')}
            className="btn-tactical bg-army-olive text-white text-[11px] scale-75"
           >
             {t.engage} <ArrowRight size={14} className="ml-2" />
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
              <div className="flex gap-4 mb-4">
                <button onClick={() => setLang('en')} className={`font-bold uppercase tracking-widest ${lang === 'en' ? 'text-army-olive' : 'text-gray-400'}`}>English</button>
                <span className="text-gray-200">|</span>
                <button onClick={() => setLang('fr')} className={`font-bold uppercase tracking-widest ${lang === 'fr' ? 'text-army-olive' : 'text-gray-400'}`}>Français</button>
              </div>
              {links.map((link) => (
                <button 
                  key={link.id} 
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

const Hero = ({ setView, lang }: { setView: (v: ViewType) => void, lang: Language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      url: "https://github.com/expertredactionjeandumont-lang/picture/blob/main/securite-et-surete_icone.jpg?raw=true",
      ...translations[lang].hero[0]
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
      ...translations[lang].hero[1]
    },
    {
      url: "https://raw.githubusercontent.com/expertredactionjeandumont-lang/picture/refs/heads/main/unnamed%20(38).jpg",
      ...translations[lang].hero[2]
    },
    {
      url: "https://github.com/expertredactionjeandumont-lang/picture/blob/main/pexels-tima-miroshnichenko-6091853.jpg?raw=true",
      ...translations[lang].hero[3]
    },
    {
      url: "input_file_1.pnhttps://github.com/expertredactionjeandumont-lang/picture/blob/main/pexels-tima-miroshnichenko-6092069.jpg?raw=true",
      ...translations[lang].hero[4]
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
              className="w-full h-full object-cover grayscale brightness-[0.4] sepia-[0.2] contrast-[1.1]"
              alt="Tactical Footage"
            />
          </MDiv>
        </AnimatePresence>
        <div className="absolute inset-0 bg-army-olive/20 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 footage-overlay opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-20">
        <MDiv 
          key={currentSlide + '-content'}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]"></span>
            <p className="text-white text-xl font-bold tracking-[0.4em] uppercase font-stencil">{translations[lang].common.liveFeed}</p>
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
              {translations[lang].nav.engage}
            </button>
            <button onClick={() => setView('capabilities')} className="btn-tactical border-2 border-white/20 text-white hover:bg-white/10">
              {translations[lang].nav.capabilities}
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
         <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{translations[lang].common.africaCommand}</span>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-10 text-white">
        <Crosshair size={500} strokeWidth={0.5} />
      </div>
    </section>
  );
};

const BodyguardSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].bodyguard;
  return (
    <section className="py-24 bg-white crosshair crosshair-tl crosshair-br border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-12 text-gray-900">{t.title}</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-900 font-bold leading-relaxed">
              <strong>QRSI.</strong> {t.desc1}
            </p>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto">
              {t.desc2}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch border-t border-gray-100">
          <div className="lg:w-1/2 py-20 pr-12 flex flex-col justify-end">
            <h3 className="text-6xl md:text-[5rem] font-bold uppercase leading-[0.9] tracking-tighter text-gray-900 max-w-md">
              {t.expert}
            </h3>
            <div className="mt-12 flex gap-4 text-army-olive">
              <Camera size={40} strokeWidth={1} />
              <Video size={40} strokeWidth={1} />
            </div>
          </div>
          <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-[600px] mt-12 lg:mt-0 overflow-hidden shadow-2xl">
            <img 
              src="https://github.com/expertredactionjeandumont-lang/picture/blob/main/pexels-alteredsnaps-14663904.jpg?raw=true" 
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000" 
              alt="Bodyguard Expert Video Support" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceModal = ({ service, onClose, lang }: { service: ServiceItem, onClose: () => void, lang: Language }) => (
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
             <h4 className="font-stencil text-army-drab text-xs tracking-widest uppercase mb-4">{translations[lang].common.ident}</h4>
             <span className="py-1 px-4 bg-army-olive text-white text-[10px] font-bold tracking-[0.2em] uppercase">{translations[lang].common.tier1}</span>
           </div>
        </div>
        <div className="md:w-2/3 p-12 bg-white">
           <h2 className="text-4xl font-bold uppercase mb-8 tracking-tighter text-gray-900 border-b-4 border-gray-100 pb-6">{service.title}</h2>
           <p className="text-gray-500 text-xl leading-relaxed mb-10">{service.longDesc}</p>
           <div className="space-y-6 mb-12">
             <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-army-drab flex items-center gap-2"><Terminal size={14} /> {translations[lang].common.missionReq}</h5>
             <div className="grid grid-cols-1 gap-3">
               {service.requirements.map((req, i) => (
                 <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100"><ChevronRight size={18} className="text-army-olive" /><span className="font-bold text-sm text-gray-800 uppercase tracking-widest">{req}</span></div>
               ))}
             </div>
           </div>
           <button onClick={onClose} className="btn-tactical bg-army-olive text-white w-full">{translations[lang].common.request}</button>
        </div>
      </div>
    </MDiv>
  </div>
);

const AdvantageSection = ({ onServiceClick, lang }: { onServiceClick: (s: ServiceItem) => void, lang: Language }) => {
  const advantages = [
    { title: lang === 'en' ? 'High-Value Target Elimination' : 'Élimination de cibles de haute valeur', icon: <Skull />, desc: lang === 'en' ? 'Surgical elimination of priority threats using advanced kinetic and quantum-assisted targeting.' : 'Élimination chirurgicale des menaces prioritaires utilisant un ciblage cinétique avancé.', longDesc: 'Direct kinetic intervention for high-priority threats. Operates under terminal phase protocols with 100% confirmation reliability.', requirements: ['Tier-1 Asset Allocation', 'Quantum Uplink Active'] },
    { title: lang === 'en' ? 'Hostage Recovery Operations' : 'Opérations de récupération d\'otages', icon: <LifeBuoy />, desc: lang === 'en' ? 'Specialized search and rescue in high-threat environments. Rapid extraction of key personnel.' : 'Recherche et sauvetage spécialisés dans des environnements à haut risque. Extraction rapide du personnel clé.', longDesc: 'Dynamic entry and recovery of personnel in compromised environments. Utilizing stealth and superior kinetic force.', requirements: ['Africa Command Hub Support', 'SAR Specialization'] },
    { title: lang === 'en' ? 'Counter-Terrorism Strikes' : 'Frappes de contre-terrorisme', icon: <Zap />, desc: lang === 'en' ? 'Pre-emptive strikes against localized and global insurgent threats using precision tactical assets.' : 'Frappes préventives contre les menaces insurgées locales et mondiales à l\'aide d\'actifs tactiques de précision.', longDesc: 'Disruption of insurgent command nodes. Tactical superiority over non-state actors using superior tech.', requirements: ['Authorization Key 001', 'Heavy Munitions Allocation'] },
    { title: lang === 'en' ? 'Corporate Asset Protection' : 'Protection des actifs d\'entreprise', icon: <Shield />, desc: lang === 'en' ? '360-degree protection shells for industrial infrastructure and high-net-worth leadership.' : 'Coques de protection à 360 degrés pour les infrastructures industrielles et les dirigeants à haute valeur nette.', longDesc: 'Full spectrum protection of multi-national corporate assets including executive protection details.', requirements: ['24/7 Monitoring', 'Encrypted Comms Hub'] },
    { title: lang === 'en' ? 'Government Facility Security' : 'Sécurité des installations gouvernementales', icon: <Building2 />, desc: lang === 'en' ? 'Hardened security protocols for sovereign interests and critical mission-critical facilities.' : 'Protocoles de sécurité renforcés pour les intérêts souverains et les installations critiques.', longDesc: 'Integration of heavy physics barriers with quantum electronic countermeasures for absolute site integrity.', requirements: ['National Level Clearance', 'Hardened Site Survey'] },
    { title: lang === 'en' ? 'Quantum Intel Fusion' : 'Fusion du renseignement Quantum', icon: <Cpu />, desc: lang === 'en' ? '🧠 AI predicts threats 72hrs ahead. Intelligence superiority over any global adversary.' : '🧠 L\'IA prédit les menaces 72 heures à l\'avance. Supériorité du renseignement sur tout adversaire global.', longDesc: 'By processing petabytes of signal intelligence in real-time, our Quantum AI identifies hostile intent before mobilization even begins.', requirements: ['Level 5 Clearances', 'Africa Command Node Access'] },
    { title: lang === 'en' ? 'Maritime Security & Piracy Defense' : 'Sécurité maritime et défense contre la piraterie', icon: <Anchor />, desc: lang === 'en' ? 'Securing critical sea lanes and vessels against piracy and maritime insurgency in deep waters.' : 'Sécurisation des voies maritimes critiques et des navires contre la piraterie et l\'insurrection maritime.', longDesc: 'Rapid response maritime teams equipped with heavy kinetics for escort and interdiction in high-risk zones.', requirements: ['Deep Water Logistics', 'Maritime Command Access'] },
    { title: lang === 'en' ? 'Cyber-Electronic Warfare' : 'Guerre cyber-électronique', icon: <Wifi />, desc: lang === 'en' ? 'Advanced electronic countermeasures and signal disruption to neutralize enemy comms and digital assets.' : 'Contre-mesures électroniques avancées et perturbation des signaux pour neutraliser les actifs numériques ennemis.', longDesc: 'Offensive and defensive digital operations aimed at complete control of the electromagnetic spectrum.', requirements: ['Quantum Node Uplink', 'SIGINT Authorization'] },
    { title: lang === 'en' ? 'Rapid Response Deployment' : 'Déploiement à réponse rapide', icon: <PlaneTakeoff />, desc: lang === 'en' ? 'Global tactical teams ready for boots-on-ground deployment within 4 hours of mission briefing.' : 'Équipes tactiques mondiales prêtes à un déploiement sur le terrain dans les 4 heures suivant le briefing.', longDesc: 'High-speed air-to-ground insertion of elite assets into volatile environments for immediate containment.', requirements: ['Uplink Ready-Status', 'Tactical Aircraft Reserved'] },
    { title: lang === 'en' ? 'Diplomatic & VIP Protection' : 'Protection diplomatique et VIP', icon: <Users />, desc: lang === 'en' ? 'Elite Tier-1 close protection details for high-stakes leadership in unstable global theaters.' : 'Détails de protection rapprochée d\'élite de niveau 1 pour les dirigeants à enjeux élevés.', longDesc: 'Low-profile or high-visibility protection details designed to ensure zero breach of the asset perimeter.', requirements: ['Tier-1 Personnel Only', 'Asset Dossier Finalized'] },
    { title: lang === 'en' ? 'Tactical Logistics & Extraction' : 'Logistique tactique et extraction', icon: <Truck />, desc: lang === 'en' ? 'Supply chain security and emergency extraction in hostile zones where traditional logistics fail.' : 'Sécurité de la chaîne d\'approvisionnement et extraction d\'urgence dans les zones hostiles.', longDesc: 'Hardened convoy operations and air-extraction of critical materiel and high-priority personnel.', requirements: ['Convoy Asset Shell', 'Extraction Zone Clear'] },
    { title: lang === 'en' ? 'Aerial Surveillance & Drone Ops' : 'Surveillance aérienne et opérations de drones', icon: <Eye />, desc: lang === 'en' ? 'Unblinking persistent surveillance and kinetic drone strikes using quantum-fused sensor feeds.' : 'Surveillance persistante sans faille et frappes de drones cinétiques via des capteurs quantum.', longDesc: 'Persistent eyes-on-target using stealth UAVs integrated with Africa Command Center monitoring.', requirements: ['Drone Hive Active', 'Video Feed Link 01'] },
    { title: lang === 'en' ? 'Critical Infrastructure Defense' : 'Défense des infrastructures critiques', icon: <Factory />, desc: lang === 'en' ? 'Protection of energy, water, and data hubs using physics-based hardening and active kinetic shields.' : 'Protection des centres d\'énergie, d\'eau et de données via un renforcement physique et des boucliers actifs.', longDesc: 'Complete security architecture for national and industrial critical infrastructure against sabotage.', requirements: ['Industrial Hardening Plan', 'Shield Node Online'] },
    { title: lang === 'en' ? 'Combat Search & Rescue (CSAR)' : 'Recherche et sauvetage au combat (CSAR)', icon: <Activity />, desc: lang === 'en' ? 'Deep-penetration recovery of injured personnel behind enemy lines under heavy fire.' : 'Récupération par pénétration profonde du personnel blessé derrière les lignes ennemies.', longDesc: 'Medical extraction specialists trained for high-intensity recovery missions where every second counts.', requirements: ['Combat Medic Priority', 'SAR Uplink Frequency'] },
    { title: lang === 'en' ? 'Border & Territory Enforcement' : 'Application des frontières et des territoires', icon: <Map />, desc: lang === 'en' ? 'Sovereign-level border security and territory denial using persistent monitoring and rapid response.' : 'Sécurité frontalière au niveau souverain et déni de territoire utilisant une surveillance persistante.', longDesc: 'Integration of persistent sensors and fast-strike teams to ensure absolute territorial integrity.', requirements: ['Regional Map Grid 5', 'Territory Denial Assets'] }
  ];

  return (
    <section className="py-24 bg-white crosshair crosshair-tl crosshair-br border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-stencil text-army-olive text-xs tracking-[0.5em] uppercase block mb-4">{lang === 'en' ? 'Core Capabilities' : 'Capacités Clés'}</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight">{lang === 'en' ? 'OPERATIONAL SUPREMACY' : 'SUPRÉMATIE OPÉRATIONNELLE'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 shadow-2xl">
          {advantages.map((item, i) => (
            <div key={i} onClick={() => onServiceClick(item as any)} className="bg-white p-12 hover:bg-gray-50 transition-all group cursor-pointer border-b md:border-b-0">
              <div className="text-army-olive mb-10 group-hover:scale-110 transition-transform duration-500">{React.cloneElement(item.icon as any, { size: 56, strokeWidth: 1 })}</div>
              <h3 className="text-2xl font-bold uppercase mb-6 tracking-tight group-hover:text-army-olive">{item.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 line-clamp-3">{item.desc}</p>
              <div className="flex items-center gap-2 text-army-olive font-bold text-xs tracking-[0.3em] uppercase">{lang === 'en' ? 'EXPAND BRIEF' : 'DÉVELOPPER'} <ArrowRight size={14} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReaperDoctrine = ({ lang }: { lang: Language }) => {
  const laws = lang === 'en' ? [
    { num: '01', title: 'Strike First, Silent', desc: 'Preempt or perish – intel wins wars. We do not wait for the threat to materialize; we erase it in the womb.' },
    { num: '02', title: 'Zero Mercy, Total Neutralization', desc: 'Threats don\'t walk away. Once a target is designated, terminal results are the only acceptable outcome.' },
    { num: '03', title: 'Adapt or Adapt', desc: 'Quantum AI evolves mid-mission. We do not follow plans; we dominate the chaos as it unfolds.' },
    { num: '04', title: 'Personal Honor Code', desc: 'Loyalty to client > all. Breach of contract = Reaper target. We are the ultimate deterrent.' },
    { num: '05', title: 'Operational Supremacy', desc: 'We own the battlefield or we burn it. Absolute dominance is our baseline.' }
  ] : [
    { num: '01', title: 'Frapper d\'abord, en silence', desc: 'Anticiper ou périr – le renseignement gagne les guerres. Nous n\'attendons pas que la menace se matérialise.' },
    { num: '02', title: 'Zéro merci, neutralisation totale', desc: 'Les menaces ne repartent pas. Une fois une cible désignée, les résultats terminaux sont la seule issue.' },
    { num: '03', title: 'S\'adapter ou s\'adapter', desc: 'L\'IA Quantum évolue en mission. Nous ne suivons pas de plans ; nous dominons le chaos.' },
    { num: '04', title: 'Code d\'honneur personnel', desc: 'Loyauté envers le client > tout. La rupture de contrat fait de vous une cible Reaper.' },
    { num: '05', title: 'Suprématie opérationnelle', desc: 'Nous possédons le champ de bataille ou nous le brûlons. La dominance absolue est notre base.' }
  ];

  return (
    <section className="py-24 bg-army-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 camo-pattern opacity-10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="font-stencil text-army-olive text-xs tracking-[0.5em] uppercase block mb-4">{lang === 'en' ? 'The Reaper Doctrine' : 'La Doctrine Reaper'}</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-white font-stencil">{lang === 'en' ? 'BATTLE-TESTED RULES' : 'RÈGLES ÉPROUVÉES'}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {laws.map((law, i) => (
            <MDiv 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white/5 border-l-4 border-army-olive p-8 backdrop-blur-sm group hover:bg-army-olive transition-all duration-500"
            >
              <span className="text-4xl font-bold font-stencil text-army-olive group-hover:text-white block mb-6">{law.num}</span>
              <h4 className="text-xl font-bold uppercase mb-6 tracking-tighter group-hover:text-white">{law.title}</h4>
              <p className="text-gray-400 text-sm group-hover:text-white/80 leading-relaxed">{law.desc}</p>
            </MDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

const MilitaryShopTeaser = ({ onArmoryClick, lang }: { onArmoryClick: () => void, lang: Language }) => {
  const items = lang === 'en' ? [
    { 
      img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/IMG_4128-Photoroom-Copy.webp?raw=true', 
      name: 'Quantum Tactical Vest', 
      price: '$499', 
      desc: 'NIJ Level IV + quantum sensors. "Survived RPG in test."' 
    },
    { 
      img: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600', 
      name: 'Reaper Pistol', 
      price: '$899', 
      desc: '9mm suppressed, vet-tuned for instant lethality.' 
    },
    { 
      img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/41jKkmpk7lL.jpg?raw=true', 
      name: 'Intel Nexus Kit', 
      price: '$2,500', 
      desc: 'NEW! NVG + encrypted drone hub for elite reconnaissance.' 
    },
    { 
      img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/61hyYrJfmDL._AC_UF1000,1000_QL80_.jpg?raw=true', 
      name: 'Reaper Boots', 
      price: '$299', 
      desc: 'Steel-mesh reinforced. Built for Afghan and Iraq hellfires.' 
    }
  ] : [
    { 
      img: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&q=80&w=600', 
      name: 'Gilet Tactique Quantum', 
      price: '$499', 
      desc: 'NIJ Niveau IV + capteurs quantum. "A survécu au RPG."' 
    },
    { 
      img: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600', 
      name: 'Pistolet Reaper', 
      price: '$899', 
      desc: '9mm silencieux, réglé par vétéran pour létalité instantanée.' 
    },
    { 
      img: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=600', 
      name: 'Kit Intel Nexus', 
      price: '$2,500', 
      desc: 'NOUVEAU ! Hub drone crypté pour reconnaissance d\'élite.' 
    },
    { 
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600', 
      name: 'Bottes Reaper', 
      price: '$299', 
      desc: 'Renforcées acier. Conçues pour l\'enfer afghan.' 
    }
  ];
  return (
    <section className="py-24 bg-gray-50 crosshair crosshair-tr crosshair-bl border-y border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div><span className="font-stencil text-army-olive text-xs tracking-[0.5em] uppercase block mb-4">{lang === 'en' ? 'Logistics Supply' : 'Approvisionnement Logistique'}</span><h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight">{lang === 'en' ? 'MILITARY SHOP' : 'MAGASIN MILITAIRE'}</h2></div>
          <button onClick={onArmoryClick} className="btn-tactical border-2 border-army-olive text-army-olive hover:bg-army-olive hover:text-white text-[11px]">{lang === 'en' ? 'FULL ARMORY' : 'ARMURERIE COMPLÈTE'}</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((p, i) => (
            <div key={i} className="bg-white p-6 shadow-xl group border border-gray-200 hover:border-army-olive transition-colors">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-gray-100 clip-tactical">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                <div className="absolute top-4 right-4 bg-army-olive text-white p-3"><ShoppingBag size={18} /></div>
              </div>
              <h5 className="font-bold text-xl uppercase mb-2 tracking-tight">{p.name}</h5>
              <p className="text-gray-400 text-xs mb-4 line-clamp-2">{p.desc}</p>
              <p className="font-bold text-2xl text-army-olive mb-6">{p.price}</p>
              <button className="w-full py-4 bg-gray-900 text-white font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-army-olive transition-all">{lang === 'en' ? 'ADD TO LOADOUT' : 'AJOUTER À L\'ÉQUIPEMENT'}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConsultancyView = ({ lang }: { lang: Language }) => {
  const consultantDetails = lang === 'en' ? [
    { title: 'Strategic Risk Modeling', desc: 'Using Quantum AI to map adversary movements and predict destabilization events before they trigger.', icon: <SearchCode /> },
    { title: 'Infrastructure Hardening', icon: <FileSearch />, desc: 'Comprehensive audits of physical and digital assets, conducted by ex-Special Forces physical penetration teams.' },
    { title: 'Supply Chain Extraction', icon: <Globe />, desc: 'Securing critical resource channels in hostile theaters where traditional logistics have collapsed.' },
    { title: 'Vetting & Counter-Intel', icon: <EyeOff />, desc: 'Deep-background verification and insider threat mitigation for multi-national corporate leadership.' }
  ] : [
    { title: 'Modélisation de risques stratégiques', desc: 'Utilisation de l\'IA Quantum pour cartographier les mouvements adverses et prédire la déstabilisation.', icon: <SearchCode /> },
    { title: 'Renforcement d\'infrastructure', icon: <FileSearch />, desc: 'Audits complets d\'actifs physiques et numériques, réalisés par des équipes de pénétration ex-Forces Spéciales.' },
    { title: 'Extraction de chaîne logistique', icon: <Globe />, desc: 'Sécurisation des canaux de ressources critiques dans des théâtres hostiles.' },
    { title: 'Vérification et contre-renseignement', icon: <EyeOff />, desc: 'Vérification approfondie des antécédents et atténuation des menaces internes pour les dirigeants.' }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="bg-gray-900 py-32 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 footage-overlay opacity-20"></div>
        <MDiv initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 px-6">
          <span className="font-stencil text-army-olive text-sm tracking-[0.5em] uppercase mb-6 block">{lang === 'en' ? 'Command Advisory' : 'Conseil de Commandement'}</span>
          <h1 className="text-7xl font-bold uppercase tracking-tighter mb-8 font-stencil">{lang === 'en' ? 'STRATEGIC CONSULTANCY' : 'CONSEIL STRATÉGIQUE'}</h1>
          <p className="text-white/60 text-2xl max-w-4xl mx-auto font-light leading-relaxed">{lang === 'en' ? 'Risk Mitigation. Intelligence Superiority. Global Continuity.' : 'Atténuation des risques. Supériorité du renseignement. Continuité globale.'}</p>
        </MDiv>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
          <div>
            <h2 className="text-5xl font-bold uppercase mb-10 tracking-tighter border-l-8 border-army-olive pl-8">{lang === 'en' ? 'EXECUTIVE INTELLIGENCE' : 'INTELLIGENCE EXÉCUTIVE'}</h2>
            <p className="text-gray-500 text-xl leading-relaxed mb-8">
              {lang === 'en' ? 'At QRSI, consultancy isn\'t about slide decks; it\'s about war-gaming the future. Our leadership, composed of decorated Veteran USA Army Officers, applies decades of theater-level strategy to corporate and sovereign risk.' : 'Chez QRSI, le conseil n\'est pas une question de diapositives ; c\'est une question de wargaming du futur. Notre direction, composée d\'officiers vétérans décorés de l\'armée américaine, applique des décennies de stratégie.'}
            </p>
            <p className="text-gray-500 text-xl leading-relaxed">
              {lang === 'en' ? 'We provide the invisible shield that allows global dominance to flourish. From Africa-based strategic hubs to the highest levels of industrial defense, our advisory is absolute.' : 'Nous fournissons le bouclier invisible qui permet à la dominance globale de s\'épanouir. De nos hubs stratégiques en Afrique aux plus hauts niveaux de défense industrielle.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {consultantDetails.map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 border border-gray-100 hover:border-army-olive transition-all group">
                <div className="text-army-olive mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="font-bold text-xl uppercase mb-4 tracking-tighter">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactSection = ({ lang }: { lang: Language }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  return (
    <section id="contact-home" className="py-24 container mx-auto px-6 relative crosshair crosshair-tl crosshair-br">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-4xl font-bold uppercase mb-12 tracking-tight border-l-8 border-army-olive pl-8">{lang === 'en' ? 'CONTACT US' : 'CONTACTEZ-NOUS'}</h2>
          <p className="text-gray-500 text-xl leading-relaxed mb-12 italic">"{lang === 'en' ? 'Ready to deploy the Reaper? Secure your operations with QRSI. America great? We make it happen everywhere.' : 'Prêt à déployer le Reaper ? Sécurisez vos opérations avec QRSI. L\'Amérique est grande ? Nous la rendons possible partout.'}"</p>
          <div className="space-y-10">
            <div className="flex gap-6"><MapPin className="text-army-olive" /><div><h4 className="font-bold uppercase tracking-widest text-sm">{lang === 'en' ? 'Primary HQ' : 'Siège Principal'}</h4><p className="text-gray-400">{lang === 'en' ? 'Settled in Africa for strategic ops reach' : 'Installé en Afrique pour une portée opérationnelle stratégique'}</p></div></div>
            <div className="flex gap-6"><Radio className="text-army-olive" /><div><h4 className="font-bold uppercase tracking-widest text-sm">{lang === 'en' ? 'Secure Frequency' : 'Fréquence SÉCURISÉE'}</h4><p className="text-gray-400 font-mono tracking-tighter">COMS-CHANNEL-001-QRSI-SECURE</p></div></div>
            <div className="flex gap-6"><Phone className="text-army-olive" /><div><h4 className="font-bold uppercase tracking-widest text-sm">{lang === 'en' ? 'Priority Uplink' : 'Liaison Prioritaire'}</h4><p className="text-gray-400 font-mono">+1-800-QRSI-WAR</p></div></div>
          </div>
        </div>
        <div className="bg-white p-12 shadow-2xl border border-gray-100 relative">
          <div className="absolute top-0 right-0 w-24 h-24 camo-pattern opacity-10 pointer-events-none"></div>
          {status === 'sent' ? (
            <div className="text-center py-24"><Shield size={80} className="text-army-olive mx-auto mb-8 animate-pulse" /><h3 className="text-4xl font-bold uppercase mb-4">{lang === 'en' ? 'TRANSMISSION OK' : 'TRANSMISSION RÉUSSIE'}</h3><p className="text-gray-400 uppercase tracking-widest text-sm">{lang === 'en' ? 'Stand by for encrypted command response.' : 'En attente d\'une réponse cryptée du commandement.'}</p><button onClick={() => setStatus('idle')} className="mt-8 border-b-2 border-army-olive text-[11px] font-bold uppercase tracking-widest">{lang === 'en' ? 'Send New Dossier' : 'Envoyer Nouveau Dossier'}</button></div>
          ) : (
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setStatus('sending'); setTimeout(() => setStatus('sent'), 2000); }}>
              <div className="space-y-2"><label className="text-[11px] font-stencil tracking-[0.4em] text-army-drab uppercase">{lang === 'en' ? 'Ident / Callsign' : 'Identifiant / Nom de Code'}</label><input required type="text" placeholder={lang === 'en' ? "ENTER NAME" : "ENTRER NOM"} className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-lg tracking-widest uppercase placeholder:text-gray-200 bg-transparent transition-colors" /></div>
              <div className="space-y-2"><label className="text-[11px] font-stencil tracking-[0.4em] text-army-drab uppercase">{lang === 'en' ? 'Secure Link' : 'Lien SÉCURISÉ'}</label><input required type="email" placeholder={lang === 'en' ? "ENTER EMAIL" : "ENTRER EMAIL"} className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-lg tracking-widest uppercase placeholder:text-gray-200 bg-transparent transition-colors" /></div>
              <div className="space-y-2"><label className="text-[11px] font-stencil tracking-[0.4em] text-army-drab uppercase">{lang === 'en' ? 'Mission Parameters' : 'Paramètres de Mission'}</label><textarea required rows={4} placeholder={lang === 'en' ? "DESCRIBE ENGAGEMENT" : "DÉCRIRE L'ENGAGEMENT"} className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-lg tracking-widest uppercase placeholder:text-gray-200 resize-none bg-transparent transition-colors"></textarea></div>
              <button disabled={status === 'sending'} className="btn-tactical bg-army-olive text-white w-full uppercase tracking-[0.5em]">{status === 'sending' ? (lang === 'en' ? 'ENCRYPTING...' : 'CRYPTAGE...') : (lang === 'en' ? 'TRANSMIT MISSION BRIEF' : 'TRANSMETTRE BRIEF DE MISSION')}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const RecruitmentSection = ({ lang }: { lang: Language }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden crosshair crosshair-bl crosshair-br">
       <div className="absolute inset-0 camo-pattern opacity-5"></div>
       <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
             <div className="lg:w-1/2">
                <span className="font-stencil text-army-olive text-xs tracking-[0.4em] uppercase mb-4 block">{lang === 'en' ? 'Asset Enlistment' : 'Engagement d\'Actif'}</span>
                <h2 className="text-5xl font-bold uppercase mb-8 leading-tight tracking-tighter font-stencil">{lang === 'en' ? 'JOIN THE REAPER SQUADRON' : 'REJOIGNEZ L\'ESCADRON REAPER'}</h2>
                <p className="text-white/60 text-xl mb-10 leading-relaxed italic border-l-4 border-army-olive pl-6">"{lang === 'en' ? 'We don\'t hire employees. We recruit assets. Tier-1 talent only. Combat veterans with honorable discharges preferred. Vetting is terminal.' : 'Nous n\'embauchons pas d\'employés. Nous recrutons des actifs. Talent de niveau 1 seulement. Vétérans de combat préférés.'}"</p>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/10"><ChevronRight size={18} className="text-army-olive" /><span className="font-bold text-sm uppercase tracking-widest">{lang === 'en' ? 'Ex-Special Forces (Tier 1/2)' : 'Anciennes Forces Spéciales (Niveau 1/2)'}</span></div>
                   <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/10"><ChevronRight size={18} className="text-army-olive" /><span className="font-bold text-sm uppercase tracking-widest">{lang === 'en' ? 'Quantum Intelligence Analysts' : 'Analystes en Intelligence Quantum'}</span></div>
                   <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/10"><ChevronRight size={18} className="text-army-olive" /><span className="font-bold text-sm uppercase tracking-widest">{lang === 'en' ? 'Tactical Logistics Operatives' : 'Opérateurs Logistiques Tactiques'}</span></div>
                </div>
             </div>
             <div className="lg:w-1/2 bg-white text-gray-900 p-12 clip-tactical shadow-2xl">
                {status === 'sent' ? (
                  <div className="text-center py-20">
                    <UserPlus size={80} className="text-army-olive mx-auto mb-8 animate-bounce" />
                    <h3 className="text-3xl font-bold uppercase mb-4">{lang === 'en' ? 'ENLISTMENT PENDING' : 'ENGAGEMENT EN ATTENTE'}</h3>
                    <p className="text-gray-400 uppercase tracking-widest text-xs">{lang === 'en' ? 'Vetting process initiated. Stand by for contact.' : 'Processus de vérification initié. Restez à l\'écoute.'}</p>
                    <button onClick={() => setStatus('idle')} className="mt-8 border-b-2 border-army-olive text-[11px] font-bold uppercase tracking-widest">{lang === 'en' ? 'New Application' : 'Nouvelle Candidature'}</button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStatus('sending'); setTimeout(() => setStatus('sent'), 2000); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-army-drab">{lang === 'en' ? 'CALLSIGN' : 'NOM DE CODE'}</label>
                          <input required type="text" className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-army-olive font-bold uppercase tracking-widest" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-army-drab">{lang === 'en' ? 'SERVICE BRANCH' : 'CORPS DE SERVICE'}</label>
                          <input required type="text" className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-army-olive font-bold uppercase tracking-widest" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold uppercase tracking-widest text-army-drab">{lang === 'en' ? 'SPECIALIZATION' : 'SPÉCIALISATION'}</label>
                       <select className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-army-olive font-bold uppercase tracking-widest bg-transparent">
                          <option>KINETIC OPS</option>
                          <option>QUANTUM INTEL</option>
                          <option>MEDIC / SAR</option>
                          <option>EOD / BREACHER</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold uppercase tracking-widest text-army-drab">{lang === 'en' ? 'MISSION HISTORY' : 'HISTORIQUE DE MISSION'}</label>
                       <textarea rows={3} className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-army-olive font-bold uppercase tracking-widest resize-none" placeholder="REDACT CLASSIFIED INTEL"></textarea>
                    </div>
                    <button disabled={status === 'sending'} className="btn-tactical bg-army-olive text-white w-full">{lang === 'en' ? 'SUBMIT FOR VETTING' : 'SOUMETTRE POUR VÉRIFICATION'}</button>
                  </form>
                )}
             </div>
          </div>
       </div>
    </section>
  );
};

const Footer = ({ setView, lang }: { setView: (v: ViewType) => void, lang: Language }) => {
  const t = translations[lang].nav;
  return (
    <footer className="bg-army-dark py-24 text-white relative crosshair crosshair-bl overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 camo-pattern opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-8 cursor-pointer group" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
              <Shell className="text-army-olive w-10 h-10 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-4xl font-bold tracking-tighter uppercase font-stencil">QRSI<span className="text-army-olive">.WAR</span></span>
            </div>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">{lang === 'en' ? 'Next generation private military excellence. Born from quantum science, forged in industrial might.' : 'Excellence militaire privée de nouvelle génération. Née de la science quantum, forgée dans la puissance industrielle.'}</p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div className="space-y-6">
              <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-army-drab border-l-4 border-army-olive pl-4 mb-8">COMMAND</h5>
              <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[11px] tracking-widest font-bold text-left transition-colors">{t.home}</button>
              <button onClick={() => { setView('about'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[11px] tracking-widest font-bold text-left transition-colors">{t.about}</button>
              <button onClick={() => { setView('capabilities'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[11px] tracking-widest font-bold text-left transition-colors">{t.capabilities}</button>
              <button onClick={() => { setView('bodyguard'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[11px] tracking-widest font-bold text-left transition-colors">{t.bodyguard}</button>
            </div>
            <div className="space-y-6">
              <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-army-drab border-l-4 border-army-olive pl-4 mb-8">LOGISTICS</h5>
              <button onClick={() => { setView('armory'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[11px] tracking-widest font-bold text-left transition-colors">{t.armory}</button>
              <button onClick={() => { setView('contact'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[11px] tracking-widest font-bold text-left transition-colors">{t.contact}</button>
            </div>
          </div>
        </div>
        <div className="pt-16 border-t border-white/5 text-center">
            <p className="text-gray-600 text-[11px] tracking-[0.4em] uppercase font-bold leading-relaxed">© 2026 QUANTUM REAPER STEEL INTERNATIONAL. SECURED CHANNEL.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [lang, setLang] = useState<Language>('en');
  const [selectedHomeService, setSelectedHomeService] = useState<ServiceItem | null>(null);

  const tAbout = translations[lang].about;

  return (
    <div className="min-h-screen selection:bg-army-olive selection:text-white bg-white font-body">
      <Navbar currentView={view} setView={setView} lang={lang} setLang={setLang} />
      <main>
        {view === 'home' && (
          <>
            <Hero setView={setView} lang={lang} />
            <section id="who-we-are-teaser" className="py-24 bg-white relative crosshair crosshair-tl crosshair-br">
              <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                   <div className="lg:w-1/2">
                      <span className="font-stencil text-army-olive text-xs tracking-[0.4em] uppercase mb-4 block">{tAbout.narrative}</span>
                      <h2 className="text-5xl font-bold uppercase mb-8 leading-tight tracking-tighter uppercase">{tAbout.forged}</h2>
                      <p className="text-gray-500 text-xl mb-10 leading-relaxed italic border-l-8 border-army-olive pl-8">{tAbout.quote}</p>
                      <button onClick={() => { setView('about'); window.scrollTo(0, 0); }} className="btn-tactical bg-army-olive text-white shadow-xl">{tAbout.doctrine}</button>
                   </div>
                   <div className="lg:w-1/2 relative group">
                      <div className="absolute -inset-4 border border-army-olive/20 -z-10 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
                      <img src="https://github.com/expertredactionjeandumont-lang/picture/blob/main/pexels-tima-miroshnichenko-6091866.jpg?raw=true" className="w-full shadow-2xl grayscale sepia-[0.3] hue-rotate-[60deg] clip-tactical group-hover:grayscale-0 transition-all duration-700" alt="Tactical Ops" />
                      <div className="absolute top-8 right-8 text-white/50"><Target size={40} strokeWidth={1} /></div>
                   </div>
                </div>
              </div>
            </section>

            <section className="py-20 bg-gray-900 text-white border-y border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 camo-pattern opacity-5 pointer-events-none"></div>
               <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
                  {[
                    ['$5M+', lang === 'en' ? 'ASSETS SECURED' : 'ACTIFS SÉCURISÉS'], 
                    ['200+', lang === 'en' ? 'HVTs NEUTRALIZED' : 'CIBLES NEUTRALISÉES'], 
                    ['ZERO', lang === 'en' ? 'FRIENDLY LOSSES' : 'PERTES AMIES'], 
                    ['USA', lang === 'en' ? 'VETERAN LEAD' : 'DIRECTION VÉTÉRANS']
                  ].map(([val, label]) => (
                    <div key={label}>
                      <h4 className="text-5xl font-bold mb-2 font-stencil text-white drop-shadow-lg">{val}</h4>
                      <p className="text-army-olive text-[10px] tracking-[0.4em] uppercase font-bold">{label}</p>
                    </div>
                  ))}
               </div>
            </section>

            <AdvantageSection onServiceClick={(s) => setSelectedHomeService(s)} lang={lang} />
            <BodyguardSection lang={lang} />
            <ReaperDoctrine lang={lang} />
            <MilitaryShopTeaser onArmoryClick={() => { setView('armory'); window.scrollTo(0, 0); }} lang={lang} />
            <ContactSection lang={lang} />

            <AnimatePresence>
              {selectedHomeService && (
                <ServiceModal service={selectedHomeService} onClose={() => setSelectedHomeService(null)} lang={lang} />
              )}
            </AnimatePresence>
          </>
        )}
        
        {view === 'about' && (
          <div className="pt-24 min-h-screen bg-white">
            <section className="bg-gray-900 py-40 relative overflow-hidden text-center text-white">
              <div className="absolute inset-0 footage-overlay opacity-20"></div>
              <MDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 px-6">
                <span className="font-stencil text-army-olive text-sm tracking-[0.5em] uppercase mb-6 block">{lang === 'en' ? 'Command Doctrine' : 'Doctrine de Commandement'}</span>
                <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter mb-8 font-stencil">{lang === 'en' ? 'WHO WE ARE' : 'QUI SOMMES-NOUS'}</h1>
                <p className="text-white/60 text-2xl max-w-4xl mx-auto font-light leading-relaxed">{tAbout.forged}</p>
              </MDiv>
            </section>
            <section className="py-24 container mx-auto px-6 text-xl text-gray-500 leading-relaxed max-w-5xl text-center md:text-left">
              <div className="p-12 bg-gray-50 border-l-8 border-army-olive shadow-sm mb-16 relative overflow-hidden">
                 <h2 className="text-4xl font-bold uppercase mb-8 text-gray-900 font-stencil tracking-tighter">{tAbout.narrativeHead}</h2>
                 <p className="mb-8 font-bold text-army-olive text-2xl leading-tight">{tAbout.quote}</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
                    <div className="flex gap-4"><MapPin className="text-army-olive shrink-0" /><p>{lang === 'en' ? 'Settled in Africa for strategic ops reach' : 'Installé en Afrique pour une portée opérationnelle'}</p></div>
                    <div className="flex gap-4"><Cpu className="text-army-olive shrink-0" /><p>{lang === 'en' ? 'Quantum tech + industrial steel = threats erased' : 'Techno Quantum + Acier industriel = menaces effacées'}</p></div>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                 <div>
                    <h3 className="text-4xl font-bold uppercase mb-6 tracking-tight text-gray-900 font-stencil">{tAbout.supremacy}</h3>
                    <p className="mb-6">{tAbout.supremacyDesc}</p>
                 </div>
                 <img src="https://images.unsplash.com/photo-1544022613-e842b7c6c5f6?auto=format&fit=crop&q=80&w=800" className="w-full clip-tactical shadow-2xl grayscale sepia-[0.3]" alt="Operator" />
              </div>
              
              <ReaperDoctrine lang={lang} />
            </section>
          </div>
        )}

        {view === 'consultancy' && <ConsultancyView lang={lang} />}

        {view === 'bodyguard' && (
          <div className="pt-24 min-h-screen bg-white">
            <section className="bg-gray-900 py-40 relative overflow-hidden text-center text-white">
              <div className="absolute inset-0 footage-overlay opacity-20"></div>
              <MDiv initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 px-6">
                <span className="font-stencil text-army-olive text-sm tracking-[0.5em] uppercase mb-6 block">{lang === 'en' ? 'Specialized Support' : 'Support Spécialisé'}</span>
                <h1 className="text-7xl font-bold uppercase tracking-tighter mb-8 font-stencil">{translations[lang].nav.bodyguard}</h1>
                <p className="text-white/60 text-2xl max-w-4xl mx-auto font-light leading-relaxed tracking-widest uppercase">{lang === 'en' ? 'Preserving your most important moments.' : 'Préserver vos moments les plus importants.'}</p>
              </MDiv>
            </section>
            <BodyguardSection lang={lang} />
          </div>
        )}

        {view === 'capabilities' && (
          <div className="pt-24">
            <AdvantageSection onServiceClick={(s) => setSelectedHomeService(s)} lang={lang} />
            <BodyguardSection lang={lang} />
            <AnimatePresence>
              {selectedHomeService && (
                <ServiceModal service={selectedHomeService} onClose={() => setSelectedHomeService(null)} lang={lang} />
              )}
            </AnimatePresence>
          </div>
        )}

        {view === 'armory' && (
          <div className="pt-24 min-h-screen bg-white">
             <section className="bg-white py-12 border-b border-gray-100">
                <div className="container mx-auto px-6 text-center">
                   <h1 className="text-6xl font-bold uppercase tracking-tighter font-stencil text-gray-900">{translations[lang].nav.armory}</h1>
                </div>
             </section>
             <MilitaryShopTeaser onArmoryClick={() => {}} lang={lang} />
          </div>
        )}

        {view === 'contact' && (
          <div className="pt-24 min-h-screen bg-white">
            <ContactSection lang={lang} />
            <RecruitmentSection lang={lang} />
          </div>
        )}
      </main>
      <Footer setView={setView} lang={lang} />
      
      {/* Floating Tactical Contact Hub */}
      <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-4">
        
        {/* Telegram Direct */}
        <MA
          href="https://t.me/qrsi_command"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: -10 }}
          className="group flex items-center gap-4 cursor-pointer"
        >
          <div className="bg-white px-6 py-2 rounded-lg shadow-xl text-[10px] font-bold text-gray-800 border-l-4 border-[#0088cc] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
            {lang === 'en' ? 'Direct Comms (Telegram)' : 'Comms Directes (Telegram)'}
          </div>
          <div className="w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all border-4 border-white">
            <Send size={24} />
          </div>
        </MA>

        {/* WhatsApp Direct */}
        <MA
          href="https://wa.me/18007774927"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: -10 }}
          className="group flex items-center gap-4 cursor-pointer"
        >
          <div className="bg-white px-6 py-2 rounded-lg shadow-xl text-[10px] font-bold text-gray-800 border-l-4 border-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
            {lang === 'en' ? 'Direct Uplink (WhatsApp)' : 'Liaison Directe (WhatsApp)'}
          </div>
          <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all border-4 border-white">
            <MessageCircle size={24} />
          </div>
        </MA>

        {/* Tactical Support Avatar */}
        <div className="group flex flex-col items-end cursor-pointer">
          <div className="bg-white px-8 py-4 rounded-xl shadow-2xl mb-4 text-xs font-bold text-gray-800 border-l-8 border-army-olive hidden group-hover:block transition-all uppercase tracking-widest">
            {lang === 'en' ? 'STANDING BY FOR MISSION ORDERS.' : 'EN ATTENTE D\'ORDRES DE MISSION.'}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45"></div>
          </div>
          <div className="w-20 h-20 bg-army-olive rounded-full overflow-hidden border-4 border-white shadow-2xl hover:scale-110 transition-all duration-300 ring-4 ring-army-olive/10 relative">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" 
              alt="Support" 
              className="w-full h-full object-cover grayscale sepia-[0.5] hue-rotate-[60deg]" 
            />
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
