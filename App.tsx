
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
  Send,
  Fingerprint,
  Search,
  Monitor,
  Dna,
  Database,
  UserCheck,
  ShieldCheck,
  Box,
  HardHat,
  Trophy,
  Landmark,
  FileText,
  Plus,
  Trash2,
  Clock,
  History
} from 'lucide-react';

const MDiv = motion.div as any;
const MA = motion.a as any;

type ViewType = 'home' | 'about' | 'capabilities' | 'armory' | 'contact' | 'consultancy' | 'bodyguard' | 'blog' | 'admin';
type Language = 'en' | 'fr';

interface ServiceItem {
  title: string;
  desc: string;
  longDesc: string;
  icon: React.ReactNode;
  requirements: string[];
  img?: string;
}

interface BlogEntry {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  img: string;
  author: string;
}

const translations = {
  en: {
    nav: {
      home: 'HOME',
      about: 'WHO WE ARE',
      capabilities: 'CORE CAPABILITIES',
      bodyguard: 'PROTECTION & INTEL',
      consultancy: 'CONSULTANCY',
      armory: 'ARMORY',
      blog: 'INTEL LOGS',
      contact: 'CONTACT',
      engage: 'ENGAGE NOW'
    },
    blog: {
      title: 'TACTICAL INTEL LOGS',
      subtitle: 'FIELD REPORTS & GLOBAL SECURITY UPDATES',
      readMore: 'DECRYPT FULL LOG',
      noPosts: 'NO ACTIVE INTEL LOGS FOUND.',
      adminTitle: 'COMMAND UPLINK',
      adminSubtitle: 'POST NEW OPERATIONAL DATA',
      formTitle: 'Log Title',
      formCategory: 'Category',
      formContent: 'Operational Narrative',
      formImg: 'Reference Image URL',
      formSubmit: 'TRANSMIT TO CLOUD',
      formSuccess: 'DATA UPLOADED TO SECURE SERVERS',
      backToBlog: 'RETURN TO INTEL FEED'
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
      request: 'REQUEST ENGAGEMENT',
      viewAll: 'VIEW ALL CAPABILITIES',
      archives: 'ACCESS ARCHIVES',
      expand: 'EXPAND MISSION BRIEF',
      learnMore: 'LEARN MORE'
    },
    about: {
      narrative: 'Our Narrative',
      forged: 'FORGED IN BATTLEFIELD DEPLOYED FOR DOMINANCE',
      quote: '"With many years in high-intensity combat zones, I founded QRSI to deliver what nations and corporations need: UNCOMPROMISING SECURITY WITH AMERICAN GRIT."',
      doctrine: 'READ DOCTRINE',
      narrativeHead: 'THE NARRATIVE',
      supremacy: 'THE REAPER SUPREMACY',
      supremacyDesc: "We don't just secure assets; we dominate the environment. Our presence is the ultimate deterrent. Utilizing a combination of kinetic superiority and quantum-fusion intel, we stay 72 hours ahead of hostile intent.",
      fullIntro: "QUANTUM REAPER STEEL INTERNATIONAL stands as one of the world's most advanced private security and military corporation, where cutting-edge quantum technology meets uncompromising lethality. We are not just a security company—we are the evolution of warfare itself.",
      evolutionTitle: "WHO WE ARE",
      evolutionDesc: "Born from the convergence of quantum science, tactical precision, and industrial might, QRSI represents the pinnacle of private military excellence. Our operators don't just neutralize threats—they redefine the very concept of security through technological supremacy and surgical precision.",
      quantumAdvantage: "OUR QUANTUM ADVANTAGE",
      quantumList: [
        "Quantum Intelligence Systems: Real-time battlefield analysis using quantum computing",
        "Molecular-Level Precision: Targeting accuracy beyond conventional capabilities",
        "Quantum Encryption: Unbreakable communications and data security",
        "Predictive Threat Assessment: Quantum algorithms that anticipate enemy movements"
      ],
      doctrineTitle: "THE REAPER DOCTRINE",
      doctrineDesc: "Our operatives embody the Reaper philosophy: Silent. Precise. Inevitable. Every mission is executed with surgical precision, leaving no trace except the complete neutralization of threats. We don't engage in conflicts—we end them.",
      strengthTitle: "STEEL-FORGED STRENGTH",
      strengthList: [
        "Industrial-Grade Equipment: Military hardware that exceeds NATO standards",
        "Armored Personnel: Operators trained beyond special forces level",
        "Uncompromising Standards: Zero-failure mission protocols",
        "Resource Superiority: Unlimited backing for any operation scale"
      ],
      dominanceTitle: "INTERNATIONAL DOMINANCE",
      dominanceList: [
        "Global Response Teams: 24/7 deployment capability worldwide",
        "Diplomatic Networks: High-level government and corporate connections",
        "Multi-Jurisdictional Expertise: Legal operations in any territory",
        "Cultural Intelligence: Native-level understanding of global theaters"
      ],
      missionStatement: "\"To provide quantum-enhanced security solutions that transcend conventional limitations, delivering absolute protection through technological supremacy and tactical excellence.\"",
      portfolioTitle: "CLIENT PORTFOLIO",
      portfolioList: [
        "Fortune 500 Corporations",
        "Government Agencies (Classified)",
        "High-Net-Worth Individuals",
        "Critical Infrastructure Operators",
        "International Organizations"
      ],
      promiseTitle: "THE QRSI PROMISE",
      promiseDesc: "When conventional security fails, when governments cannot act, when the impossible becomes necessary—Quantum Reaper Steel International delivers. We are the force that operates beyond the reach of traditional military and law enforcement, providing solutions that others cannot even comprehend.",
      failureLabel: "Contact us when failure is not an option."
    },
    portfolio: {
      title: 'OPERATIONAL PORTFOLIO',
      subtitle: 'MISSION LOGS & ASSET TRAINING',
      training: 'TACTICAL TRAINING SESSIONS',
      trainingDesc: 'High-intensity elite training drills. Urban warfare, CQB, and precision marksmanship mastery.',
      monitoring: 'COMMAND & CONTROL CENTER',
      monitoringDesc: '24/7 Global Surveillance Hub. Quantum-linked monitoring of critical assets and high-threat theaters.',
      field: 'FIELD DEPLOYMENTS',
      fieldDesc: 'Live operation snippets from various global theaters. Active protection and secure logistics in motion.'
    },
    bodyguard: {
      title: 'About the service',
      desc1: 'QRSI. will ensure that your escort is captured under the professional guidance of an expert for the close protection team. We use advanced equipment and technology to ensure high image clarity and excellent sound.',
      desc2: 'As a result, you will receive a unique video, with professional personal security, which will preserve your most important moments for years to come.',
      expert: 'EXPERT FOR VIDEO SUPPORT',
      longDesc: 'Our Specialized Support division provides 24/7 technical and tactical oversight for high-risk movement. Every bodyguard mission is backed by our video intelligence team to ensure legal compliance and post-action analysis.QRSI consulting provide expert guidance to governments, defense organizations, and private contractors on national security strategy, technology integration, and operational efficiency. By combining strategic insight with technical expertise, weto help modernize defense capabilities, enhance cybersecurity, and ensure readiness across military and aerospace sectors. as Defense consulting, we play a critical role in bridging the gap between government defense priorities and private-sector innovation. we operate at the intersection of technology, strategy, and operations, supporting clients in areas such as cybersecurity, logistics, and defense modernization.                  ',
      reqs: ['High-Definition Signal Encryption', 'Africa Command Overwatch']
    },
    bodyguardOps: {
      title: 'PHYSICAL BODYGUARD',
      desc1: 'Front-line kinetic protection for high-risk assets and individuals in hostile environments.',
      desc2: 'Our operatives are combat-hardened veterans specialized in immediate threat deterrence, physical extraction, and rapid response drills. We provide a human shield reinforced by tactical training.',
      expert: 'KINETIC OPS SPECIALIST',
      longDesc: 'A private bodyguard protects more than just your space. we assess threats, secure routes, control access points, and react instantly to developing situations. Corporate events, red carpet appearances, and international travel all come with risk. A trained guard stays close, alert, and prepared to act without disrupting your routine/ This isn’t showmanship. It’s professional, in licensed protection that works in silence and strikes with precision. Every decision is calculated. Every moment is watched. Every detail is handled. No Choice means Surrounding to Reaper Supremacy because A Reaper does not "protect space." He owns the kill-zone:.',
      reqs: ['Combat Vetting Level 5', 'Tactical Armor Class IV', 'Night-Ops Proficiency']
    },
    vipBodyguard: {
      title: 'VIP CLOSE PROTECTION',
      desc1: 'High-profile and low-profile protection for dignitaries, executives, and high-net-worth leadership.',
      desc2: 'Sophisticated security details designed to blend into elite social environments while maintaining a 360-degree security shell. Includes armored transit logistics and advanced reconnaissance.',
      expert: 'TIER-1 VIP DETAIL',
      longDesc: 'Dignitary protection requires more than just force; it requires social intelligence and seamless integration. We provide an invisible shell of security for world leaders and high-net-worth individuals Threat Annihilation: Quantum sensors + vet instincts detect hostiles 500m out. Routes locked, chokepoints crushed, access? Denied by default. Instant Eradication: Global ops—corporate galas, red carpets, warlord territories. We shadow invisible, strike surgical: 1.1s disarm-to-neutralize. No witnesses. No disruption. Your champagne stays cold. Total Dominion: Every heartbeat monitored. Every shadow dissected. Every anomaly? Terminated silently. This is NO PERFORMANCE. It is licensed lethality—calculated carnage in tailored silence. One wrong move by them = their last. Your routine? Untouched. Your empire? Eternal.',
      reqs: ['Diplomatic Clearance Level A', 'Low-Profile Tactical Gear', 'Advanced First-Aid / Trauma Specialization']
    },
    detective: {
      title: 'PRIVATE DETECTIVE',
      desc1: 'Covert surveillance and digital footprint tracking for sensitive individual cases. We operate in the shadows to provide absolute clarity.',
      desc2: 'Our operatives are experts in social engineering, technical surveillance countermeasures, and real-time asset tracking across global jurisdictions.',
      expert: 'COVERT SURVEILLANCE OPS',
      longDesc: 'The Detective Division specializes in the unseen. Using quantum-enhanced digital tracing and traditional deep-cover human intelligence, we uncover truth in the most obscured environments.',
      reqs: ['Cyber-Intelligence Node Access', 'Shadow-Spectrum Vetting', 'Multi-Jurisdiction Legal Liaison']
    },
    investigation: {
      title: 'TACTICAL INVESTIGATION',
      desc1: 'Deep-spectrum investigation into corporate espionage, asset misappropriation, and high-level fraud.',
      desc2: 'Utilizing Tier-1 digital forensics and human intelligence networks, we uncover what others miss. We provide actionable evidence for terminal legal or tactical resolutions.',
      expert: 'FORENSIC INTELLIGENCE',
      longDesc: 'When corporate interests are threatened from within, our Forensic Intelligence team deploys terminal analysis tools to identify and neutralize internal threats and external espionage vectors.',
      reqs: ['Forensic Digital Key 09', 'Insider Threat Protocol Active', 'Quantum Ledger Verification']
    }
  },
  fr: {
    nav: {
      home: 'ACCUEIL',
      about: 'QUI SOMMES-NOUS',
      capabilities: 'CAPACITÉS CLÉS',
      bodyguard: 'PROTECTION & RENSEIGNEMENT',
      consultancy: 'CONSEIL',
      armory: 'ARMURERIE',
      blog: 'LOGS TACTIQUES',
      contact: 'CONTACT',
      engage: 'ENGAGER'
    },
    blog: {
      title: 'LOGS D\'INTELLIGENCE TACTIQUE',
      subtitle: 'RAPPORTS DE TERRAIN & MISES À JOUR SÉCURITÉ',
      readMore: 'DÉCRYPTER LE LOG COMPLET',
      noPosts: 'AUCUN LOG D\'INTELLIGENCE TROUVÉ.',
      adminTitle: 'LIAISON COMMANDEMENT',
      adminSubtitle: 'PUBLIER NOUVELLES DONNÉES OPÉRATIONNELLES',
      formTitle: 'Titre du Log',
      formCategory: 'Catégorie',
      formContent: 'Récit Opérationnel',
      formImg: 'URL Image de Référence',
      formSubmit: 'TRANSMETTRE AU CLOUD',
      formSuccess: 'DONNÉES TÉLÉVERSÉES SUR SERVEURS SÉCURISÉS',
      backToBlog: 'RETOUR AU FLUX D\'INTEL'
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
      request: 'DEMANDER ENGAGEMENT',
      viewAll: 'VOIR TOUTES LES CAPACITÉS',
      archives: 'ACCÉDER AUX ARCHIVES',
      expand: 'DÉVELOPPER LE BRIEF DE MISSION',
      learnMore: 'EN SAVOIR PLUS'
    },
    about: {
      narrative: 'Notre Récit',
      forged: 'FORGÉ SUR LE TERRAIN DÉPLOYÉ POUR LA DOMINANCE',
      quote: '"Avec plus de 9 ans dans des zones de combat à haute intensité, j\'ai fondé QRSI pour offrir ce dont les nations et les entreprises ont besoin : UNE SÉCURITÉ SANS COMPROMIS AVEC LA DÉTERMINATION AMÉRICAINE."',
      doctrine: 'LIRE LA DOCTRINE',
      narrativeHead: 'LE RÉCIT',
      supremacy: 'LA SUPRÉMATIE REAPER',
      supremacyDesc: "Nous ne nous contentons pas de sécuriser les actifs ; nous dominons l'environnement. Notre présence est le moyen de dissuasion ultime. Grâce à une combinaison de supériorité cinétique et d'intelligence fusionnée par quantum, nous gardons 72 heures d'avance sur toute intention hostile.",
      fullIntro: "QUANTUM REAPER STEEL INTERNATIONAL est l'une des corporations militaires et de sécurité privée les plus avancées au monde, où la technologie quantique de pointe rencontre une létalité sans compromis. Nous sommes l'évolution même de la guerre.",
      evolutionTitle: "QUI SOMMES-NOUS",
      evolutionDesc: "Née de la convergence de la science quantique, de la précision tactique et de la puissance industrielle, QRSI représente le summum de l'excellence militaire privée. Nos opérateurs ne se contentent pas de neutraliser les menaces—ils redéfinissent le concept de sécurité.",
      quantumAdvantage: "NOTRE AVANTAGE QUANTIQUE",
      quantumList: [
        "Systèmes d'intelligence quantique : Analyse du champ de bataille en temps réel",
        "Précision moléculaire : Précision de ciblage au-delà des capacités conventionnelles",
        "Cryptage quantique : Sécurité des communications et des données incassable",
        "Évaluation prédictive des menaces : Algorithmes anticipant les mouvements ennemis"
      ],
      doctrineTitle: "LA DOCTRINE REAPER",
      doctrineDesc: "Nos agents incarnent la philosophie Reaper : Silencieux. Précis. Inévitable. Chaque mission est exécutée avec une précision chirurgicale, ne laissant aucune trace si ce n'est la neutralisation complète des menaces.",
      strengthTitle: "FORCE FORGÉE DANS L'ACIER",
      strengthList: [
        "Équipement de qualité industrielle : Matériel militaire dépassant les normes de l'OTAN",
        "Personnel blindé : Opérateurs formés au-delà du niveau des forces spéciales",
        "Normes sans compromis : Protocoles de mission zéro échec",
        "Supériorité des ressources : Soutien illimité pour toute échelle d'opération"
      ],
      dominanceTitle: "DOMINANCE INTERNATIONALE",
      dominanceList: [
        "Équipes de réponse globale : Capacité de déploiement 24/7 dans le monde entier",
        "Réseaux diplomatiques : Connexions gouvernementales et corporatives de haut niveau",
        "Expertise multijuridictionnelle : Opérations légales dans tout territoire",
        "Intelligence culturelle : Compréhension native des théâtres mondiaux"
      ],
      missionStatement: "\"Fournir des solutions de sécurité améliorées par le quantique qui transcendent les limitations conventionnelles, offrant une protection absolue par la suprématie technologique.\"",
      portfolioTitle: "PORTFOLIO CLIENTS",
      portfolioList: [
        "Corporations Fortune 500",
        "Agences gouvernementales (Classifiées)",
        "Individus à haut patrimoine",
        "Opérateurs d'infrastructures critiques",
        "Organisations internationales"
      ],
      promiseTitle: "LA PROMESSE QRSI",
      promiseDesc: "Lorsque la sécurité conventionnelle échoue, lorsque les gouvernements ne peuvent agir, lorsque l'impossible devient nécessaire—Quantum Reaper Steel International interventions. Nous sommes la force opérant au-delà de la portée traditionnelle.",
      failureLabel: "Contactez-nous quand l'échec n'est pas une option."
    },
    portfolio: {
      title: 'PORTFOLIO OPÉRATIONNEL',
      subtitle: 'LOGS DE MISSION & ENTRAÎNEMENT',
      training: 'SESSIONS D\'ENTRAÎNEMENT TACTIQUE',
      trainingDesc: 'Exercices d\'élite à haute intensité. Combat urbain, CQB et maîtrise du tir de précision.',
      monitoring: 'CENTRE DE COMMANDEMENT',
      monitoringDesc: 'Hub de surveillance mondial 24/7. Surveillance liée par quantum des actifs critiques.',
      field: 'DÉPLOIEMENTS SUR LE TERRAIN',
      fieldDesc: 'Extraits d\'opérations réelles. Protection active et logistique sécurisée en mouvement.'
    },
    bodyguard: {
      title: 'À propos du service',
      desc1: 'QRSI s\'assurera que votre escorte est filmée sous la direction professionnelle d\'un expert de l\'équipe de protection rapprochée. Nous utilisons des équipements et technologies avancés pour garantir une haute clarté d\'image et un son excellent.',
      desc2: 'En conséquence, vous recevrez une vidéo unique, avec une sécurité personnelle professionnelle, qui préservera vos moments les plus importants pour les années à venir.',
      expert: 'EXPERT EN SUPPORT VIDÉO',
      longDesc: 'Notre division de soutien spécialisé assure une surveillance technique et tactique 24/7 pour les mouvements à haut risque. Chaque mission est soutenue par notre équipe d\'intelligence vidéo.',
      reqs: ['Cryptage de signal haute définition', 'Supervision du commandement Afrique']
    },
    bodyguardOps: {
      title: 'GARDE DU CORPS PHYSIQUE',
      desc1: 'Protection cinétique de première ligne pour les actifs et individus à haut risque en environnements hostiles.',
      desc2: 'Nos agents sont des vétérans endurcis au combat, spécialisés dans la dissuasion des menaces immédiates, l\'extraction physique et les exercices de réponse rapide.',
      expert: 'SPÉCIALISTE OPS CINÉTIQUE',
      longDesc: 'C\'est la pointe de la lance. Nos spécialistes Kinetic Ops sont d\'anciens opérateurs des forces spéciales formés à la Doctrine Reaper pour assurer la protection physique.',
      reqs: ['Vérification de combat Niveau 5', 'Blindage tactique Classe IV', 'Maîtrise des opérations nocturnes']
    },
    vipBodyguard: {
      title: 'PROTECTION VIP RAPPROCHÉE',
      desc1: 'Protection à haut et bas profil pour dignitaires, cadres et dirigeants à haut patrimoine.',
      desc2: 'Détails de sécurité sophistiqués conçus pour se fondre dans les environnements sociaux d\'élite tout en maintenant une coque de sécurité à 360 degrés. Inclut la logistique de transit blindée.',
      expert: 'DÉTAIL VIP NIVEAU 1',
      longDesc: 'La protection des dignitaires exige une intelligence sociale et une intégration parfaite. Nous fournissons une coque de sécurité invisible pour les dirigeants mondiaux.',
      reqs: ['Accréditation diplomatique Niveau A', 'Équipement tactique discret', 'Spécialisation en traumatologie / premiers secours']
    },
    detective: {
      title: 'DÉTECTIVE PRIVÉ',
      desc1: 'Surveillance discrète et traçage d\'empreintes numériques pour les cas individuels sensibles. Nous opérons dans l\'ombre pour fournir une clarté absolue.',
      desc2: 'Nos agents sont des experts en ingénierie sociale, en contre-mesures de surveillance technique et en suivi d\'actifs en temps réel à travers les juridictions mondiales.',
      expert: 'OPS DE SURVEILLANCE DISCRÈTE',
      longDesc: 'La division Détective se spécialise dans l\'invisible. En utilisant le traçage numérique amélioré par quantum et l\'intelligence humaine sous couverture.',
      reqs: ['Accès au nœud d\'intelligence cyber', 'Vérification Shadow-Spectrum', 'Liaison juridique multi-juridictionnelle']
    },
    investigation: {
      title: 'ENQUÊTE TACTIQUE',
      desc1: 'Enquête approfondie sur l\'espionnage industriel, le détournement d\'actifs et la fraude de haut niveau.',
      desc2: 'En utilisant la criminalistique numérique de niveau 1 et des réseaux de renseignement humain, nous découvrons ce que les autres manquent. Nous fournissons des preuves exploitables.',
      expert: 'INTELLIGENCE FORENSIQUE',
      longDesc: 'Lorsque les intérêts corporatifs sont menacés de l\'intérieur, notre équipe déploie des outils d\'analyse terminale pour identifier et neutraliser les menaces internes.',
      reqs: ['Clé numérique forensique 09', 'Protocole de menace interne actif', 'Vérification Quantum Ledger']
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
    { name: t.blog, id: 'blog' },
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
             {translations[lang].nav.engage} <ArrowRight size={14} className="ml-2" />
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
      url: "https://github.com/expertredactionjeandumont-lang/picture/blob/main/pexels-tima-miroshnichenko-6092069.jpg?raw=true",
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
          <div className="flex wrap gap-6">
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

const PortfolioSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].portfolio;
  const portfolioItems = [
    {
      title: t.training,
      desc: t.trainingDesc,
      img1: "https://github.com/expertredactionjeandumont-lang/picture/blob/main/unnamed%20(40).jpg?raw=true",
      img2: "https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_rbpulnrbpulnrbpu.png?raw=true",
      icon: <Target className="text-army-olive" />
    },
    {
      title: t.monitoring,
      desc: t.monitoringDesc,
      img1: "https://github.com/expertredactionjeandumont-lang/picture/blob/main/command-control-center-ultimate-guide-1.jpg?raw=true",
      img2: "https://github.com/expertredactionjeandumont-lang/picture/blob/main/unnamed%20(39).jpg?raw=true",
      icon: <Monitor className="text-army-olive" />
    },
    {
      title: t.field,
      desc: t.fieldDesc,
      img1: "https://github.com/expertredactionjeandumont-lang/picture/blob/main/VIP%201.png?raw=true",
      img2: "https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_94yo1q94yo1q94yo.png?raw=true",
      icon: <Radio className="text-army-olive" />
    }
  ];

  return (
    <section className="py-24 bg-white crosshair crosshair-tl crosshair-br border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-stencil text-army-olive text-xs tracking-[0.5em] uppercase block mb-4">{t.subtitle}</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-gray-900">{t.title}</h2>
        </div>
        <div className="space-y-12">
          {portfolioItems.map((item, i) => (
            <MDiv 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 group`}
            >
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden clip-tactical shadow-2xl h-[400px]">
                  <img 
                    src={item.img1} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" 
                    alt={`${item.title} 1`} 
                  />
                </div>
                <div className="relative overflow-hidden clip-tactical shadow-2xl h-[400px] mt-8">
                  <img 
                    src={item.img2} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" 
                    alt={`${item.title} 2`} 
                  />
                </div>
                <div className="absolute inset-0 footage-overlay opacity-10 pointer-events-none"></div>
              </div>
              <div className="lg:w-1/2 p-12 bg-gray-50 border-l-8 border-army-olive shadow-xl relative overflow-hidden">
                <div className="mb-6">{React.cloneElement(item.icon as any, { size: 48, strokeWidth: 1 })}</div>
                <h3 className="text-3xl font-bold uppercase mb-6 tracking-tighter text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-xl leading-relaxed mb-8">{item.desc}</p>
                <div className="flex items-center gap-2 text-army-olive font-bold text-xs tracking-[0.3em] uppercase">
                   {translations[lang].common.archives} <ArrowRight size={14} />
                </div>
                <div className="absolute -bottom-8 -right-8 opacity-5">
                   {React.cloneElement(item.icon as any, { size: 200 })}
                </div>
              </div>
            </MDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

const PageBackground = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none opacity-5">
    <img 
      src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000" 
      className="w-full h-full object-cover grayscale"
      alt="Tactical Texture"
    />
    <div className="absolute inset-0 footage-overlay"></div>
  </div>
);

const BodyguardSection = ({ lang, onServiceClick }: { lang: Language, onServiceClick?: (s: ServiceItem) => void }) => {
  const t = translations[lang].bodyguard;
  const serviceItem: ServiceItem = {
    title: t.title,
    desc: t.desc1,
    longDesc: t.longDesc,
    icon: <Video />,
    requirements: t.reqs
  };

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
            {onServiceClick && (
              <button 
                onClick={() => onServiceClick(serviceItem)}
                className="mt-6 flex items-center gap-2 text-army-olive font-bold text-xs tracking-[0.3em] uppercase mx-auto hover:scale-105 transition-transform"
              >
                {translations[lang].common.expand} <ArrowRight size={14} />
              </button>
            )}
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
          <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-[600px] mt-12 lg:mt-0 overflow-hidden shadow-2xl bg-black">
            <img 
              src="https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_q5g9plq5g9plq5g9.png?raw=true" 
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000" 
              alt="Bodyguard Expert Video Support" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 footage-overlay opacity-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BodyguardOpsSection = ({ lang, onServiceClick }: { lang: Language, onServiceClick?: (s: ServiceItem) => void }) => {
  const t = translations[lang].bodyguardOps;
  const serviceItem: ServiceItem = {
    title: t.title,
    desc: t.desc1,
    longDesc: t.longDesc,
    icon: <ShieldAlert />,
    requirements: t.reqs
  };

  return (
    <section className="py-24 bg-gray-50/90 crosshair crosshair-tr crosshair-bl border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-12 text-gray-900 font-stencil">{t.title}</h2>
            <div className="space-y-8 max-w-xl">
              <p className="text-lg md:text-xl text-gray-900 font-bold leading-relaxed border-l-8 border-army-olive pl-8">
                {t.desc1}
              </p>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                {t.desc2}
              </p>
              {onServiceClick && (
                <button 
                  onClick={() => onServiceClick(serviceItem)}
                  className="mt-6 flex items-center gap-2 text-army-olive font-bold text-xs tracking-[0.3em] uppercase hover:scale-105 transition-transform"
                >
                  {translations[lang].common.expand} <ArrowRight size={14} />
                </button>
              )}
            </div>
            <div className="mt-12 flex gap-4 text-army-olive items-center">
              <ShieldAlert size={40} strokeWidth={1} />
              <UserCheck size={40} strokeWidth={1} />
              <span className="text-[11px] font-stencil tracking-[0.4em] uppercase font-bold ml-4">{t.expert}</span>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden clip-tactical shadow-xl h-[400px] mt-12">
              <img 
                src="https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_6txcpt6txcpt6txc.png?raw=true" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" 
                alt="Bodyguard Ops 1" 
              />
            </div>
            <div className="relative overflow-hidden clip-tactical shadow-xl h-[400px]">
              <img 
                src="https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_udk2h4udk2h4udk2.png?raw=true" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" 
                alt="Bodyguard Ops 2" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VIPBodyguardSection = ({ lang, onServiceClick }: { lang: Language, onServiceClick?: (s: ServiceItem) => void }) => {
  const t = translations[lang].vipBodyguard;
  const serviceItem: ServiceItem = {
    title: t.title,
    desc: t.desc1,
    longDesc: t.longDesc,
    icon: <Users />,
    requirements: t.reqs
  };

  return (
    <section className="py-24 bg-white/90 crosshair crosshair-tl crosshair-br border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-stretch gap-12">
          <div className="lg:w-1/2 flex flex-col justify-center lg:items-end">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-12 text-gray-900 font-stencil text-right">{t.title}</h2>
            <div className="space-y-8 max-w-xl">
              <p className="text-lg md:text-xl text-gray-900 font-bold leading-relaxed border-r-8 border-army-accent pr-8 text-right">
                {t.desc1}
              </p>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed text-right">
                {t.desc2}
              </p>
              {onServiceClick && (
                <button 
                  onClick={() => onServiceClick(serviceItem)}
                  className="mt-6 flex items-center gap-2 text-army-accent font-bold text-xs tracking-[0.3em] uppercase hover:scale-105 transition-transform"
                >
                  {translations[lang].common.expand} <ArrowRight size={14} />
                </button>
              )}
            </div>
            <div className="mt-12 flex gap-4 text-army-accent items-center">
              <span className="text-[11px] font-stencil tracking-[0.4em] uppercase font-bold mr-4">{t.expert}</span>
              <Award size={40} strokeWidth={1} />
              <ShieldCheck size={40} strokeWidth={1} />
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden clip-tactical shadow-xl h-[400px]">
              <img 
                src="https://github.com/expertredactionjeandumont-lang/picture/blob/main/VIP%201.png?raw=true" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" 
                alt="VIP Detail 1" 
              />
            </div>
            <div className="relative overflow-hidden clip-tactical shadow-xl h-[400px] mt-12">
              <img 
                src="https://github.com/expertredactionjeandumont-lang/picture/blob/main/VIP.png?raw=true" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" 
                alt="VIP Detail 2" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DetectiveSection = ({ lang, onServiceClick }: { lang: Language, onServiceClick?: (s: ServiceItem) => void }) => {
  const t = translations[lang].detective;
  const serviceItem: ServiceItem = {
    title: t.title,
    desc: t.desc1,
    longDesc: t.longDesc,
    icon: <Eye />,
    requirements: t.reqs
  };

  return (
    <section className="py-24 bg-gray-50/80 crosshair crosshair-tr crosshair-bl border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-[600px] mb-12 lg:mb-0 overflow-hidden shadow-2xl">
            <img 
              src="https://github.com/expertredactionjeandumont-lang/picture/blob/main/pexels-cottonbro-7266269.jpg?raw=true" 
              className="w-full h-full object-cover grayscale brightness-75 contrast-125 hover:grayscale-0 transition-all duration-1000" 
              alt="Private Detective Ops" 
            />
            <div className="absolute inset-0 footage-overlay opacity-20"></div>
          </div>
          <div className="lg:w-1/2 py-20 lg:pl-20 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-12 text-gray-900 font-stencil">{t.title}</h2>
            <div className="space-y-8 max-w-xl">
              <p className="text-lg md:text-xl text-gray-900 font-bold leading-relaxed border-l-8 border-army-olive pl-8">
                {t.desc1}
              </p>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                {t.desc2}
              </p>
              {onServiceClick && (
                <button 
                  onClick={() => onServiceClick(serviceItem)}
                  className="mt-6 flex items-center gap-2 text-army-olive font-bold text-xs tracking-[0.3em] uppercase hover:scale-105 transition-transform"
                >
                  {translations[lang].common.expand} <ArrowRight size={14} />
                </button>
              )}
            </div>
            <div className="mt-12 flex gap-4 text-army-olive items-center">
              <Eye size={40} strokeWidth={1} />
              <Fingerprint size={40} strokeWidth={1} />
              <span className="text-[11px] font-stencil tracking-[0.4em] uppercase font-bold ml-4">{t.expert}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InvestigationSection = ({ lang, onServiceClick }: { lang: Language, onServiceClick?: (s: ServiceItem) => void }) => {
  const t = translations[lang].investigation;
  const serviceItem: ServiceItem = {
    title: t.title,
    desc: t.desc1,
    longDesc: t.longDesc,
    icon: <SearchCode />,
    requirements: t.reqs
  };

  return (
    <section className="py-24 bg-white/80 crosshair crosshair-tl crosshair-br border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-stretch">
          <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-[600px] mb-12 lg:mb-0 overflow-hidden shadow-2xl">
            <img 
              src="https://github.com/expertredactionjeandumont-lang/picture/blob/main/pexels-cottonbro-7319087.jpg?raw=true" 
              className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000" 
              alt="Tactical Investigation" 
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent"></div>
          </div>
          <div className="lg:w-1/2 py-20 lg:pr-20 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-12 text-gray-900 font-stencil">{t.title}</h2>
            <div className="space-y-8 max-w-xl">
              <p className="text-lg md:text-xl text-gray-900 font-bold leading-relaxed border-r-8 border-red-600 pr-8 text-right">
                {t.desc1}
              </p>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed text-right">
                {t.desc2}
              </p>
              {onServiceClick && (
                <button 
                  onClick={() => onServiceClick(serviceItem)}
                  className="mt-6 flex items-center gap-2 text-red-600 font-bold text-xs tracking-[0.3em] uppercase ml-auto hover:scale-105 transition-transform"
                >
                  {translations[lang].common.expand} <ArrowRight size={14} />
                </button>
              )}
            </div>
            <div className="mt-12 flex gap-4 text-red-600 items-center justify-end">
              <span className="text-[11px] font-stencil tracking-[0.4em] uppercase font-bold mr-4">{t.expert}</span>
              <SearchCode size={40} strokeWidth={1} />
              <Search size={40} strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogView = ({ lang, blogs }: { lang: Language, blogs: BlogEntry[] }) => {
  const t = translations[lang].blog;
  return (
    <div className="pt-24 min-h-screen relative">
      <PageBackground />
      <section className="bg-gray-900 py-32 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 footage-overlay opacity-20"></div>
        <MDiv initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 px-6">
          <span className="font-stencil text-army-olive text-sm tracking-[0.5em] uppercase mb-6 block">{t.subtitle}</span>
          <h1 className="text-7xl font-bold uppercase tracking-tighter mb-8 font-stencil">{t.title}</h1>
        </MDiv>
      </section>

      <section className="py-24 container mx-auto px-6 relative z-10">
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-white/80 border-2 border-dashed border-gray-200">
            <ZapOff size={64} className="mx-auto text-gray-300 mb-6" />
            <p className="font-bold text-gray-400 uppercase tracking-widest">{t.noPosts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((entry, i) => (
              <MDiv 
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 shadow-xl group hover:border-army-olive transition-colors flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img src={entry.img} alt={entry.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute top-4 left-4 bg-army-olive text-white px-4 py-1 text-[10px] font-bold tracking-widest uppercase">{entry.category}</div>
                </div>
                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-6">
                    <Clock size={12} /> {entry.date}
                    <span className="text-army-olive">/</span>
                    <History size={12} /> {entry.author}
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 line-clamp-2">{entry.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">{entry.content}</p>
                  <button className="flex items-center gap-2 text-army-olive font-bold text-xs tracking-[0.3em] uppercase group-hover:translate-x-2 transition-transform">
                    {t.readMore} <ArrowRight size={14} />
                  </button>
                </div>
              </MDiv>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const AdminView = ({ lang, onAddBlog, blogs, onDeleteBlog }: { lang: Language, onAddBlog: (b: BlogEntry) => void, blogs: BlogEntry[], onDeleteBlog: (id: string) => void }) => {
  const t = translations[lang].blog;
  const [formData, setFormData] = useState({
    title: '',
    category: 'TACTICAL OPS',
    content: '',
    img: ''
  });
  const [posted, setPosted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: BlogEntry = {
      id: Date.now().toString(),
      title: formData.title,
      date: new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
      category: formData.category,
      content: formData.content,
      img: formData.img || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
      author: "COMMANDER_X"
    };
    onAddBlog(newEntry);
    setPosted(true);
    setFormData({ title: '', category: 'TACTICAL OPS', content: '', img: '' });
    setTimeout(() => setPosted(false), 3000);
  };

  return (
    <div className="pt-24 min-h-screen relative">
      <PageBackground />
      <section className="bg-army-dark py-24 relative overflow-hidden text-center text-white border-b border-army-olive/30">
        <div className="absolute inset-0 camo-pattern opacity-10"></div>
        <MDiv className="relative z-10 px-6">
          <span className="font-stencil text-army-olive text-sm tracking-[0.5em] uppercase mb-6 block">{t.adminSubtitle}</span>
          <h1 className="text-7xl font-bold uppercase tracking-tighter mb-8 font-stencil">{t.adminTitle}</h1>
        </MDiv>
      </section>

      <div className="container mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div className="bg-white p-12 shadow-2xl border-l-8 border-army-olive">
          <h2 className="text-3xl font-bold uppercase mb-12 tracking-tight border-b-2 border-gray-100 pb-4 flex items-center gap-4">
            <Plus className="text-army-olive" /> NEW INTEL ENTRY
          </h2>
          {posted ? (
            <div className="text-center py-20">
              <ShieldCheck size={80} className="text-army-olive mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">{t.formSuccess}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[11px] font-stencil tracking-[0.4em] text-army-drab uppercase">{t.formTitle}</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-lg tracking-widest uppercase bg-transparent" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-stencil tracking-[0.4em] text-army-drab uppercase">{t.formCategory}</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-lg tracking-widest uppercase bg-transparent">
                  <option>TACTICAL OPS</option>
                  <option>QUANTUM INTEL</option>
                  <option>FIELD REPORT</option>
                  <option>GLOBAL SECURITY</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-stencil tracking-[0.4em] text-army-drab uppercase">{t.formImg}</label>
                <input value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} type="url" placeholder="https://..." className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-sm tracking-widest bg-transparent" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-stencil tracking-[0.4em] text-army-drab uppercase">{t.formContent}</label>
                <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-army-olive font-bold text-lg tracking-widest uppercase bg-transparent resize-none"></textarea>
              </div>
              <button type="submit" className="btn-tactical bg-army-olive text-white w-full uppercase tracking-[0.5em]">{t.formSubmit}</button>
            </form>
          )}
        </div>

        <div className="bg-gray-900 p-12 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-32 h-32 camo-pattern opacity-10"></div>
          <h2 className="text-3xl font-bold uppercase mb-12 tracking-tight border-b-2 border-white/10 pb-4 flex items-center gap-4">
            <Terminal className="text-army-olive" /> ACTIVE DATABASE
          </h2>
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white/5 p-6 border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors">
                <div>
                  <h4 className="font-bold uppercase tracking-tight text-white mb-2 line-clamp-1">{blog.title}</h4>
                  <p className="text-xs text-army-drab font-mono">{blog.date} // {blog.id}</p>
                </div>
                <button onClick={() => onDeleteBlog(blog.id)} className="text-red-600 hover:text-red-400 transition-colors p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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

const AdvantageSection = ({ onServiceClick, lang, limit, onViewAll }: { onServiceClick: (s: ServiceItem) => void, lang: Language, limit?: number, onViewAll?: () => void }) => {
  const advantages: ServiceItem[] = [
    { 
      title: lang === 'en' ? 'High-Value Target Elimination' : 'Élimination de cibles de haute valeur', 
      icon: <Skull />, 
      desc: lang === 'en' ? 'Surgical elimination of priority threats using advanced kinetic and quantum-assisted targeting.' : 'Élimination chirurgicale des menaces prioritaires utilisant un ciblage cinétique avancé.', 
      longDesc: 'Direct kinetic intervention for high-priority threats. Operates under terminal phase protocols with 100% confirmation reliability.', 
      requirements: ['Tier-1 Asset Allocation', 'Quantum Uplink Active'],
      img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_rbpulnrbpulnrbpu.png?raw=true'
    },
    { 
      title: lang === 'en' ? 'Hostage Recovery Operations' : 'Opérations de récupération d\'otages', 
      icon: <LifeBuoy />, 
      desc: lang === 'en' ? 'Specialized search and rescue in high-threat environments. Rapid extraction of key personnel.' : 'Recherche et sauvetage spécialisés dans des environnements à haut risque. Extraction rapide du personnel clé.', 
      longDesc: 'Dynamic entry and recovery of personnel in compromised environments. Utilizing stealth and superior kinetic force.', 
      requirements: ['Africa Command Hub Support', 'SAR Specialization'],
      img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_6tpocw6tpocw6tpo.png?raw=true'
    },
    { 
      title: lang === 'en' ? 'Counter-Terrorism Strikes' : 'Frappes de contre-terrorisme', 
      icon: <Zap />, 
      desc: lang === 'en' ? 'Pre-emptive strikes against localized and global insurgent threats using precision tactical assets.' : 'Frappes préventives contre les menaces insurgées locales et mondiales à l\'aide d\'actifs tactiques de précision.', 
      longDesc: 'Disruption of insurgent command nodes. Tactical superiority over non-state actors using superior tech.', 
      requirements: ['Authorization Key 001', 'Heavy Munitions Allocation'],
      img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_94yo1q94yo1q94yo.png?raw=true'
    }
  ];

  const displayedAdvantages = limit ? advantages.slice(0, limit) : advantages;

  return (
    <section className="py-24 crosshair crosshair-tl crosshair-br border-t border-gray-100 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-stencil text-army-olive text-xs tracking-[0.5em] uppercase block mb-4">{lang === 'en' ? 'Core Capabilities' : 'Capacités Clés'}</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight">{lang === 'en' ? 'OPERATIONAL SUPREMACY' : 'SUPRÉMATIE OPÉRATIONNELLE'}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedAdvantages.map((item, i) => (
            <div key={i} className="flex flex-col group bg-gray-50 shadow-2xl border border-gray-100 overflow-hidden">
              <div className="relative h-72 w-full overflow-hidden">
                <img src={item.img} className="w-full h-full object-cover grayscale brightness-50 contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-1000" alt={item.title} />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-white text-3xl font-bold uppercase tracking-tighter mb-6 drop-shadow-2xl leading-tight">{item.title}</h3>
                  <button onClick={() => onServiceClick(item)} className="bg-army-accent hover:bg-orange-600 text-white font-black py-4 px-10 uppercase tracking-[0.2em] text-xs transition-all transform hover:scale-105 shadow-xl">
                    {translations[lang].common.learnMore}
                  </button>
                </div>
                <div className="absolute inset-0 footage-overlay opacity-20 pointer-events-none"></div>
              </div>
              <div className="p-10 flex-grow bg-[#FDFDFD]">
                <div className="space-y-4">
                  {item.requirements.map((req, ridx) => (
                    <div key={ridx} className="flex items-start gap-2">
                       <span className="text-army-accent font-black text-sm uppercase tracking-widest leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {limit && (
           <div className="mt-20 text-center">
             <button onClick={onViewAll} className="btn-tactical border-2 border-army-olive text-army-olive hover:bg-army-olive hover:text-white">
                {translations[lang].common.viewAll}
             </button>
           </div>
        )}
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
            <MDiv key={i} whileHover={{ y: -10 }} className="bg-white/5 border-l-4 border-army-olive p-8 backdrop-blur-sm group hover:bg-army-olive transition-all duration-500">
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
    { img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/IMG_4128-Photoroom-Copy.webp?raw=true', name: 'Quantum Tactical Vest', price: '$499', desc: 'NIJ Level IV + quantum sensors. "Survived RPG in test."' },
    { img: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600', name: 'Reaper Pistol', price: '$899', desc: '9mm suppressed, vet-tuned for instant lethality.' },
    { img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/41jKkmpk7lL.jpg?raw=true', name: 'Intel Nexus Kit', price: '$2,500', desc: 'NEW! NVG + encrypted drone hub for elite reconnaissance.' },
    { img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/61hyYrJfmDL._AC_UF1000,1000_QL80_.jpg?raw=true', name: 'Reaper Boots', price: '$299', desc: 'Steel-mesh reinforced. Built for Afghan and Iraq hellfires.' }
  ] : [
    { img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/IMG_4128-Photoroom-Copy.webp?raw=true', name: 'Gilet Tactique Quantum', price: '$499', desc: 'NIJ Niveau IV + capteurs quantum. "A survécu au RPG."' },
    { img: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600', name: 'Pistolet Reaper', price: '$899', desc: '9mm silencieux, réglé par vétéran pour létalité instantanée.' },
    { img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/41jKkmpk7lL.jpg?raw=true', name: 'Kit Intel Nexus', price: '$2,500', desc: 'NOUVEAU ! Hub drone crypté pour reconnaissance d\'élite.' },
    { img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/61hyYrJfmDL._AC_UF1000,1000_QL80_.jpg?raw=true', name: 'Bottes Reaper', price: '$299', desc: 'Renforcées acier. Conçues pour l\'enfer afghan.' }
  ];
  return (
    <section className="py-24 bg-gray-50/90 crosshair crosshair-tr crosshair-bl border-y border-gray-100">
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
    <div className="pt-24 min-h-screen relative">
      <PageBackground />
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
          <div className="bg-white/90 p-8 border-l-8 border-army-olive shadow-xl backdrop-blur-sm">
            <h2 className="text-5xl font-bold uppercase mb-10 tracking-tighter">{lang === 'en' ? 'EXECUTIVE INTELLIGENCE' : 'INTELLIGENCE EXÉCUTIVE'}</h2>
            <p className="text-gray-500 text-xl leading-relaxed mb-8">
              {lang === 'en' ? 'At QRSI, consultancy isn\'t about slide decks; it\'s about war-gaming the future. Our leadership, composed of decorated Veteran USA Army Officers, applies decades of theater-level strategy to corporate and sovereign risk.' : 'Chez QRSI, le conseil n\'est pas une question de diapositives ; c\'est une question de wargaming du futur. Notre direction, composée d\'officiers vétérans décorés de l\'armée américaine, applique des décennies de stratégie.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {consultantDetails.map((item, i) => (
              <div key={i} className="bg-white/95 p-8 border border-gray-100 hover:border-army-olive transition-all group backdrop-blur-sm shadow-md">
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
          </div>
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div className="space-y-6">
              <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-army-drab border-l-4 border-army-olive pl-4 mb-8">COMMAND</h5>
              <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[11px] tracking-widest font-bold text-left transition-colors">{t.home}</button>
              <button onClick={() => { setView('blog'); window.scrollTo(0, 0); }} className="block text-gray-500 hover:text-white uppercase text-[11px] tracking-widest font-bold text-left transition-colors">{t.blog}</button>
            </div>
            <div className="space-y-6">
              <h5 className="font-bold text-xs tracking-[0.4em] uppercase text-army-drab border-l-4 border-army-olive pl-4 mb-8">LOGISTICS</h5>
              <button onClick={() => { setView('admin'); window.scrollTo(0, 0); }} className="block text-gray-800 hover:text-army-olive uppercase text-[9px] tracking-widest font-bold text-left transition-colors">UPLINK ADMIN</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [lang, setLang] = useState<Language>('en');
  const [selectedHomeService, setSelectedHomeService] = useState<ServiceItem | null>(null);

  // Blog State
  const [blogs, setBlogs] = useState<BlogEntry[]>([
    {
      id: '1',
      title: 'QUANTUM ENCRYPTION BREAKTHROUGH IN SAHARA THEATER',
      date: 'MAY 12, 2026',
      category: 'QUANTUM INTEL',
      content: 'Our signal teams have successfully deployed the first mobile quantum-link station in the high-heat Sahara environment. Command latency reduced by 40%. All communications now operate on zero-knowledge protocols.',
      img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_94yo1q94yo1q94yo.png?raw=true',
      author: 'COMMANDER_X'
    },
    {
      id: '2',
      title: 'SECURE MARINE LOGISTICS HUB EXPANSION IN CENTRAL AFRICA',
      date: 'JUNE 02, 2026',
      category: 'GLOBAL SECURITY',
      content: 'QRSI industrial division has finalized the hardening of Sector-7 logistical hub. New automated kinetic defense systems are online. 24/7 autonomous monitoring active.',
      img: 'https://github.com/expertredactionjeandumont-lang/picture/blob/main/Gemini_Generated_Image_mn6tvqmn6tvqmn6t.png?raw=true',
      author: 'COMMANDER_X'
    }
  ]);

  const handleAddBlog = (newBlog: BlogEntry) => {
    setBlogs([newBlog, ...blogs]);
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

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
                   </div>
                </div>
              </div>
            </section>

            <AdvantageSection onServiceClick={(s) => setSelectedHomeService(s)} lang={lang} limit={3} onViewAll={() => { setView('capabilities'); window.scrollTo(0, 0); }} />
            <PortfolioSection lang={lang} />
            <BodyguardSection lang={lang} onServiceClick={(s) => setSelectedHomeService(s)} />
            <ReaperDoctrine lang={lang} />
            <MilitaryShopTeaser onArmoryClick={() => { setView('armory'); window.scrollTo(0, 0); }} lang={lang} />
            
            {/* Intel Log Teaser on Home */}
            <section className="py-24 bg-gray-50 border-y border-gray-100">
               <div className="container mx-auto px-6">
                  <div className="flex justify-between items-end mb-12">
                     <h2 className="text-4xl font-bold uppercase tracking-tight font-stencil">LATEST INTEL FEED</h2>
                     <button onClick={() => { setView('blog'); window.scrollTo(0, 0); }} className="border-b-2 border-army-olive text-xs font-bold tracking-widest uppercase pb-1">{translations[lang].blog.readMore}</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {blogs.slice(0, 2).map(blog => (
                       <div key={blog.id} className="bg-white p-8 border border-gray-100 flex flex-col md:flex-row gap-8 items-center group cursor-pointer" onClick={() => { setView('blog'); window.scrollTo(0, 0); }}>
                          <div className="md:w-1/3 aspect-square overflow-hidden bg-gray-100">
                            <img src={blog.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                          </div>
                          <div className="md:w-2/3">
                            <span className="text-[10px] text-army-olive font-black tracking-widest block mb-2">{blog.category}</span>
                            <h4 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-army-olive transition-colors">{blog.title}</h4>
                            <p className="text-gray-500 text-sm line-clamp-2">{blog.content}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            <AnimatePresence>
              {selectedHomeService && (
                <ServiceModal service={selectedHomeService} onClose={() => setSelectedHomeService(null)} lang={lang} />
              )}
            </AnimatePresence>
          </>
        )}
        
        {view === 'blog' && <BlogView lang={lang} blogs={blogs} />}
        {view === 'admin' && <AdminView lang={lang} onAddBlog={handleAddBlog} blogs={blogs} onDeleteBlog={handleDeleteBlog} />}

        {view === 'about' && (
          <div className="pt-24 min-h-screen relative">
            <PageBackground />
            <section className="bg-gray-900 py-40 relative overflow-hidden text-center text-white">
              <div className="absolute inset-0 footage-overlay opacity-20"></div>
              <MDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 px-6">
                <span className="font-stencil text-army-olive text-sm tracking-[0.5em] uppercase mb-6 block">Command Doctrine</span>
                <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter mb-8 font-stencil">{translations[lang].nav.about}</h1>
              </MDiv>
            </section>
            <section className="py-24 container mx-auto px-6 text-xl text-gray-500 leading-relaxed max-w-7xl relative z-10">
              <div className="p-12 bg-white/90 border-l-8 border-army-olive shadow-xl mb-16 relative overflow-hidden backdrop-blur-sm">
                 <h2 className="text-4xl font-bold uppercase mb-8 text-gray-900 font-stencil tracking-tighter">THE NARRATIVE</h2>
                 <p className="mb-8 font-bold text-army-olive text-2xl leading-tight">{tAbout.quote}</p>
                 <p>{tAbout.fullIntro}</p>
              </div>
              <ReaperDoctrine lang={lang} />
            </section>
          </div>
        )}

        {view === 'consultancy' && <ConsultancyView lang={lang} />}

        {view === 'bodyguard' && (
          <div className="pt-24 min-h-screen relative">
            <PageBackground />
            <section className="bg-gray-900 py-40 relative overflow-hidden text-center text-white">
              <div className="absolute inset-0 footage-overlay opacity-20"></div>
              <MDiv initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 px-6">
                <span className="font-stencil text-army-olive text-sm tracking-[0.5em] uppercase mb-6 block">Specialized Support</span>
                <h1 className="text-7xl font-bold uppercase tracking-tighter mb-8 font-stencil">{translations[lang].nav.bodyguard}</h1>
              </MDiv>
            </section>
            <div className="relative z-10">
              <BodyguardOpsSection lang={lang} onServiceClick={(s) => setSelectedHomeService(s)} />
              <VIPBodyguardSection lang={lang} onServiceClick={(s) => setSelectedHomeService(s)} />
              <BodyguardSection lang={lang} onServiceClick={(s) => setSelectedHomeService(s)} />
            </div>
          </div>
        )}

        {view === 'capabilities' && (
          <div className="pt-24 min-h-screen relative">
            <PageBackground />
            <div className="relative z-10">
              <AdvantageSection onServiceClick={(s) => setSelectedHomeService(s)} lang={lang} />
            </div>
          </div>
        )}

        {view === 'armory' && (
          <div className="pt-24 min-h-screen relative">
             <PageBackground />
             <div className="relative z-10">
               <MilitaryShopTeaser onArmoryClick={() => {}} lang={lang} />
             </div>
          </div>
        )}

        {view === 'contact' && (
          <div className="pt-24 min-h-screen relative">
            <PageBackground />
            <div className="relative z-10">
              <section className="py-24 container mx-auto px-6">
                 <div className="bg-white p-12 shadow-2xl border border-gray-100">
                    <h2 className="text-4xl font-bold uppercase mb-12 tracking-tight font-stencil">CONTACT QRSI COMMAND</h2>
                    <p className="text-gray-500 text-xl leading-relaxed mb-12 italic">"Ready to deploy the Reaper? Secure your operations with QRSI."</p>
                    <div className="flex gap-10">
                      <div className="flex gap-6"><MapPin className="text-army-olive" /><div><h4 className="font-bold uppercase tracking-widest text-sm">HQ AFRICA</h4></div></div>
                    </div>
                 </div>
              </section>
            </div>
          </div>
        )}
      </main>
      <Footer setView={setView} lang={lang} />
      
      {/* Floating Tactical Contact Hub */}
      <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-4">
        <MA href="https://wa.me/18007774927" target="_blank" rel="noopener noreferrer" whileHover={{ x: -10 }} className="group flex items-center gap-4 cursor-pointer">
          <div className="bg-white px-6 py-2 rounded-lg shadow-xl text-[10px] font-bold text-gray-800 border-l-4 border-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Direct Uplink</div>
          <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white">
            <MessageCircle size={24} />
          </div>
        </MA>
      </div>
    </div>
  );
}
