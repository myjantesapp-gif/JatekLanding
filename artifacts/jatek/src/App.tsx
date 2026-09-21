import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, ArrowUpRight, BadgeCheck, Bike, Check, ChevronDown, Clock3, HeartPulse, Instagram, Leaf, LockKeyhole, Mail, MapPin, Menu, MessageCircle, Navigation, Route, Scissors, Send, ShoppingBag, Sparkles, Store, Users, X, Search, User } from 'lucide-react';
import officialJatekLogo from '@assets/jatek-app-icon_1790001370520.png';
import jatekHomeScreenshot from '@assets/Screenshot_20260920_035429_Jatek_1789923038313.jpg';
import jatekMapScreenshot from '@assets/Screenshot_20260920_035234_Jatek_1789923038341.jpg';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route as WouterRoute, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type IconType = typeof Store;
type Locale = 'fr' | 'ar';

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({
  locale: 'fr',
  setLocale: () => undefined,
});

function useLocale() {
  return useContext(LocaleContext);
}

function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);
  return <LocaleContext.Provider value={{ locale, setLocale }}><div className={locale === 'ar' ? 'language-ar' : 'language-fr'} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>{children}</div></LocaleContext.Provider>;
}

const localeCopy = {
  fr: {
    navUniverse: 'L’univers JATEK',
    navHow: 'Comment ça marche',
    navPartner: 'Devenir partenaire',
    support: 'Besoin d’aide ?',
    join: 'Rejoindre JATEK',
    badge: 'Oujda, notre point de départ',
    title: 'Ce que vous aimez.',
    accent: 'À deux rues.',
    body: 'JATEK commence à Oujda et rassemble déjà les bonnes adresses de la ville. Les prochaines villes marocaines arrivent progressivement, avec la même livraison simple et locale.',
    discover: 'Télécharger l’app',
    heroPartner: 'Devenir partenaire',
    proof: 'Déjà adopté à Oujda, bientôt dans d’autres villes',
  },
  ar: {
    navUniverse: 'عالم JATEK',
    navHow: 'كيف تعمل الخدمة',
    navPartner: 'انضم كشريك',
    support: 'تحتاج إلى المساعدة؟',
    join: 'انضم إلى JATEK',
    badge: 'وجدة، نقطة انطلاقنا',
    title: 'كل ما تحب.',
    accent: 'على بُعد شارعين.',
    body: 'تبدأ JATEK من وجدة وتجمع أفضل عناوين المدينة. ستصل مدن مغربية أخرى تدريجياً قريباً، بنفس الخدمة المحلية والبسيطة.',
    discover: 'حمّل التطبيق',
    heroPartner: 'انضم كشريك',
    proof: 'بدأت في وجدة، وقريباً في مدن أخرى',
  },
};

const categories: { name: string; detail: string; icon: IconType; color: string }[] = [
  { name: 'À manger', detail: 'Les tables qui font la ville', icon: Store, color: 'bg-[#f1e549]' },
  { name: 'Épicerie', detail: 'Le quotidien, sans détour', icon: ShoppingBag, color: 'bg-[#50c5c3]' },
  { name: 'Pharmacie', detail: 'Ce qu’il vous faut, vite', icon: HeartPulse, color: 'bg-[#df3f91]' },
  { name: 'Beauté', detail: 'Les adresses qui vous ressemblent', icon: Scissors, color: 'bg-[#d8dfb0]' },
];

const faqs = [
  { question: 'Où livrez-vous aujourd’hui ?', answer: 'JATEK commence à Oujda et s’étend progressivement vers plusieurs villes marocaines. Entrez votre quartier dans l’application pour voir les commerces disponibles autour de vous.' },
  { question: 'Combien coûte la livraison ?', answer: 'Les frais sont affichés avant chaque commande. Ils dépendent de la distance et de la catégorie choisie — toujours sans mauvaise surprise.' },
  { question: 'Puis-je suivre ma commande ?', answer: 'Oui. Dès que votre commande est prise en charge, vous pouvez suivre son avancée en temps réel et échanger avec votre coursier si besoin.' },
  { question: 'Comment devenir partenaire ?', answer: 'Remplissez le formulaire partenaire avec quelques informations sur votre établissement. Notre équipe locale vous rappelle sous 48 heures pour vous accompagner.' },
  { question: 'Quels moyens de paiement acceptez-vous ?', answer: 'Le paiement à la livraison est disponible. D’autres options de paiement seront ajoutées progressivement pour s’adapter aux habitudes de chaque quartier.' },
];

// Moroccan Geometric Assets
function MoroccanPattern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="4" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(100 100)">
        <path d="M0 -80 L15 -25 L80 -80 L25 -15 L80 0 L25 15 L80 80 L15 25 L0 80 L-15 25 L-80 80 L-25 15 L-80 0 L-25 -15 L-80 -80 L-15 -25 Z" fill="currentColor" opacity="0.3"/>
        <rect x="-40" y="-40" width="80" height="80" transform="rotate(45)" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
        <rect x="-40" y="-40" width="80" height="80" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
        <circle cx="0" cy="0" r="24" stroke="currentColor" fill="none" strokeWidth="2" opacity="0.5"/>
        <circle cx="0" cy="0" r="8" fill="currentColor" opacity="0.5"/>
      </g>
    </svg>
  );
}

function MoroccanStarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

function MoroccoFlag({ className = 'size-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 22" className={className} role="img" aria-label="Drapeau du Maroc">
      <rect width="32" height="22" rx="2" fill="#c1272d" />
      <path d="m16 4.5 1.5 4.7h4.9l-4 2.9 1.5 4.7-3.9-2.9-3.9 2.9 1.5-4.7-4-2.9h4.9L16 4.5Z" fill="none" stroke="#006233" strokeWidth="1.25" />
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" data-testid="link-logo">
      <span className={`relative flex h-10 w-[118px] overflow-hidden rounded-[0.9rem] bg-[#ec0f73] shadow-[0_8px_20px_rgba(236,15,115,.22)] transition-transform duration-500 group-hover:rotate-[-3deg] group-hover:scale-105 ${light ? 'ring-1 ring-white/25' : 'ring-1 ring-[#df3f91]/20'}`}>
        <img src={officialJatekLogo} alt="JATEK" className="absolute inset-0 h-full w-full object-cover object-center" />
      </span>
    </Link>
  );
}

function OujdaDeliveryIllustration() {
  return (
    <svg viewBox="0 0 240 110" className="h-full w-full" role="img" aria-label="Coursier JATEK dans les rues d’Oujda">
      <rect width="240" height="110" rx="18" fill="#edf0dc" />
      <path d="M0 82c38-12 72-8 112 2 47 12 80 9 128-6v32H0Z" fill="#12494f" />
      <path d="M0 87c43-9 77-4 116 5 47 11 79 6 124-8" fill="none" stroke="#f1e549" strokeWidth="3" strokeDasharray="8 7" opacity=".9" />
      <path d="M12 75V33l25-17 25 17v42Z" fill="#df3f91" />
      <path d="M18 75V39h38v36" fill="#f7c4d9" opacity=".75" />
      <path d="M24 75V52c0-8 6-14 13-14s13 6 13 14v23" fill="#12494f" />
      <path d="M76 70V24l28-18 28 18v46Z" fill="#50c5c3" />
      <path d="M84 70V34h40v36" fill="#d8dfb0" />
      <path d="M91 70V50c0-8 6-14 13-14s13 6 13 14v20" fill="#12494f" />
      <path d="M151 72V39l19-13 19 13v33Z" fill="#f1e549" />
      <path d="M158 72V47h24v25" fill="#fffaf1" />
      <circle cx="173" cy="77" r="9" fill="#df3f91" />
      <circle cx="205" cy="77" r="9" fill="#df3f91" />
      <path d="M173 77h27l-5-18h-15l-7 10h-8" fill="none" stroke="#12494f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M181 59h12l5 18" fill="none" stroke="#12494f" strokeWidth="3" strokeLinecap="round" />
      <path d="M184 53h13l6 6-6 4h-13Z" fill="#df3f91" stroke="#12494f" strokeWidth="2" />
      <circle cx="200" cy="43" r="7" fill="#f1e549" />
      <path d="M200 39v8M196 43h8" stroke="#12494f" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { locale, setLocale } = useLocale();
  const labels = localeCopy[locale];
  const isHome = location === '/';
  const links = [
    { href: '/#univers', label: labels.navUniverse },
    { href: '/#comment', label: labels.navHow },
    { href: '/devenir-partenaire', label: labels.navPartner },
  ];
  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className={`nav-wrap mx-auto mt-6 flex max-w-[1240px] items-center justify-between rounded-full px-6 py-4 transition-all duration-300 ${isHome ? 'bg-white/10 border border-white/20 backdrop-blur-md' : 'bg-white/90 border border-[#12494f]/10 backdrop-blur-md shadow-sm'} sm:px-8 mx-5 sm:mx-8 xl:mx-auto`}>
        <Logo light={isHome} />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
             <Link key={link.href} href={link.href} className={`text-[13px] font-bold tracking-wide transition-colors hover:text-[#df3f91] ${isHome ? 'text-white' : 'text-[#12494f]'}`} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`}>
               {link.label}
             </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <Link href="/support" className={`text-[13px] font-bold transition-colors hover:text-[#df3f91] ${isHome ? 'text-white' : 'text-[#12494f]'}`} data-testid="link-nav-support">{labels.support}</Link>
          <button type="button" onClick={() => setLocale(locale === 'fr' ? 'ar' : 'fr')} className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-bold transition-colors hover:border-[#df3f91] hover:text-[#df3f91] ${isHome ? 'border-white/25 text-white' : 'border-[#12494f]/15 text-[#12494f]'}`} aria-label={locale === 'fr' ? 'Passer en arabe' : 'Passer en français'} data-testid="button-language-toggle"><MoroccoFlag className="size-4" /> {locale === 'fr' ? 'العربية' : 'Français'}</button>
          <Link href="/devenir-partenaire" className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-extrabold transition-all hover:-translate-y-0.5 ${isHome ? 'bg-[#f1e549] text-[#12494f] hover:shadow-[0_5px_15px_rgba(241,229,73,0.3)]' : 'bg-[#ec0f73] text-white hover:bg-[#d70862]'} ${!isHome ? 'magenta-glow' : ''}`} data-testid="link-nav-partner">
            {labels.join} <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className={`grid size-12 place-items-center rounded-full md:hidden transition-colors ${isHome ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#12494f]/5 text-[#12494f] hover:bg-[#12494f]/10'}`} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} data-testid="button-mobile-menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {open && (
        <div className="mx-5 mt-3 rounded-3xl border border-[#12494f]/10 bg-white p-6 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4">
          <nav className="grid gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-5 py-4 text-base font-bold text-[#12494f] hover:bg-[#edf0dc] transition-colors" data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}</Link>
            ))}
            <div className="h-px w-full bg-[#12494f]/10 my-2"></div>
            <Link href="/support" onClick={() => setOpen(false)} className="rounded-2xl px-5 py-4 text-base font-bold text-[#12494f] hover:bg-[#edf0dc] transition-colors" data-testid="link-mobile-support">{labels.support}</Link>
            <button type="button" onClick={() => setLocale(locale === 'fr' ? 'ar' : 'fr')} className="flex items-center gap-3 rounded-2xl px-5 py-4 text-left text-base font-bold text-[#12494f] hover:bg-[#edf0dc] transition-colors" data-testid="button-mobile-language-toggle"><MoroccoFlag className="size-5" /> {locale === 'fr' ? 'العربية' : 'Français'}</button>
            <Link href="/devenir-partenaire" onClick={() => setOpen(false)} className="magenta-glow mt-4 flex items-center justify-between rounded-2xl bg-[#ec0f73] px-6 py-4 text-base font-extrabold text-white shadow-md" data-testid="link-mobile-partner">{labels.join} <ArrowUpRight size={20} /></Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="bg-[#0a2b2f] px-5 pb-10 pt-20 text-[#fffaf1] sm:px-8 relative z-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.3fr_.7fr_.7fr_.9fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-[280px] text-sm leading-6 text-[#fffaf1]/65">Le meilleur d’Oujda, livré avec attention. Une adresse après l’autre.</p>
            <div className="mt-7 flex items-center gap-3">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-[#f1e549] hover:bg-[#f1e549] hover:text-[#12494f]" aria-label="Instagram" data-testid="link-instagram"><Instagram size={18} /></a>
              <a href="mailto:contact@jatek.app" className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-[#f1e549] hover:bg-[#f1e549] hover:text-[#12494f]" aria-label="Email JATEK" data-testid="link-footer-email"><Mail size={18} /></a>
            </div>
          </div>
          <div>
            <p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#f1e549]">Découvrir</p>
            <div className="mt-5 grid gap-3 text-sm text-[#fffaf1]/70">
              <Link href="/#univers" className="transition-colors hover:text-[#fffaf1]" data-testid="link-footer-univers">L’univers JATEK</Link>
              <Link href="/#comment" className="transition-colors hover:text-[#fffaf1]" data-testid="link-footer-how">Comment ça marche</Link>
              <Link href="/devenir-partenaire" className="transition-colors hover:text-[#fffaf1]" data-testid="link-footer-partner">Devenir partenaire</Link>
            </div>
          </div>
          <div>
            <p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#f1e549]">À votre service</p>
            <div className="mt-5 grid gap-3 text-sm text-[#fffaf1]/70">
              <Link href="/support" className="transition-colors hover:text-[#fffaf1]" data-testid="link-footer-support">Centre d’aide</Link>
              <a href="mailto:contact@jatek.app" className="transition-colors hover:text-[#fffaf1]" data-testid="link-footer-mail">contact@jatek.app</a>
            </div>
          </div>
          <div>
            <p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#f1e549]">JATEK, c’est</p>
            <p className="mt-5 font-display text-2xl font-bold leading-tight">Un départ local.<br /><span className="text-[#df3f91]">Un Maroc en mouvement.</span></p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 text-[12px] text-[#fffaf1]/45 sm:flex-row">
          <span>© 2024 JATEK. Fait avec soin à Oujda.</span>
          <div className="flex gap-5">
            <Link href="/confidentialite" className="cursor-pointer transition-colors hover:text-[#fffaf1] hover:underline hover:underline-offset-4" data-testid="link-footer-privacy">Confidentialité</Link>
            <Link href="/mentions-legales" className="cursor-pointer transition-colors hover:text-[#fffaf1] hover:underline hover:underline-offset-4" data-testid="link-footer-legal">Mentions légales</Link>
            <Link href="/cookies" className="cursor-pointer transition-colors hover:text-[#fffaf1] hover:underline hover:underline-offset-4" data-testid="link-footer-cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HeroPhoneMockup() {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const screenshots = [
    { src: jatekHomeScreenshot, label: 'Accueil JATEK à Oujda' },
    { src: jatekMapScreenshot, label: 'Adresse de livraison à Oujda' },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveScreenshot((current) => (current + 1) % screenshots.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [screenshots.length]);

  return (
    <div className="relative mx-auto w-full max-w-[280px] pb-8 lg:max-w-[300px] perspective-1000 mt-10 lg:mt-0 z-20">
      <div className="absolute -right-3 -top-9 z-30 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0a2b2f]/75 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#f1e549] shadow-lg backdrop-blur-md sm:-right-8">
        <MoroccoFlag className="size-4" /> Oujda · Maroc
      </div>
      <div className="float-slow relative aspect-[0.5133] rounded-[2.8rem] bg-[#fffaf1] shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-[6px] border-[#0a2b2f] overflow-hidden rotate-y-[-10deg] rotate-x-[5deg] transform-gpu">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-[#0a2b2f] rounded-b-xl z-30"></div>
        
        {/* Real JATEK app screens */}
        <div className="relative h-full w-full bg-[#f8f6eb]">
          {screenshots.map((screenshot, index) => (
            <img
              key={screenshot.label}
              src={screenshot.src}
              alt={screenshot.label}
              className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-700 ${activeScreenshot === index ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-[#0a2b2f]/75 px-3 py-2 backdrop-blur-md">
        {screenshots.map((screenshot, index) => (
          <button
            key={screenshot.label}
            type="button"
            onClick={() => setActiveScreenshot(index)}
            className={`h-1.5 rounded-full transition-all ${activeScreenshot === index ? 'w-7 bg-[#f1e549]' : 'w-1.5 bg-white/70'}`}
            aria-label={`Afficher ${screenshot.label}`}
          />
        ))}
      </div>
      
      {/* Notifications de suivi — posées à côté de l’écran pour garder les captures lisibles */}
      <div className="hidden sm:grid absolute -left-28 top-28 z-30 w-[190px] gap-3">
        <div className="float-fast rounded-[1.25rem] border border-white/20 bg-white/95 p-3 text-[#12494f] shadow-[0_18px_38px_rgba(0,0,0,0.2)]">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#d8dfb0] text-[#12494f]"><Check size={17} strokeWidth={3} /></span>
            <div className="min-w-0">
              <p className="font-mono-jatek text-[9px] uppercase tracking-[.12em] text-[#12494f]/55">Commande confirmée</p>
              <p className="mt-1 truncate text-[12px] font-extrabold">Le Comptoir d’Oujda</p>
              <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-[#50a79a]"><span className="size-1.5 rounded-full bg-[#50c5c3]" /> Préparation en cours</p>
            </div>
          </div>
        </div>
        <div className="float-fast ml-8 rounded-[1.25rem] border border-[#f1e549]/35 bg-[#f1e549] p-3 text-[#12494f] shadow-[0_18px_38px_rgba(0,0,0,0.18)]" style={{ animationDelay: '1.1s' }}>
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#12494f] text-[#f1e549]"><Bike size={17} /></span>
            <div>
              <p className="font-mono-jatek text-[9px] uppercase tracking-[.12em] text-[#12494f]/60">En livraison</p>
              <p className="mt-1 text-[12px] font-extrabold">Arrivée dans 24 min</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block absolute -right-24 bottom-20 z-30 w-[190px] overflow-hidden rounded-[1.35rem] border border-white/25 bg-white p-2 shadow-[0_20px_45px_rgba(0,0,0,0.22)]">
        <div className="overflow-hidden rounded-[1rem] bg-[#edf0dc]">
          <OujdaDeliveryIllustration />
        </div>
        <div className="flex items-center gap-2 px-2 pb-1 pt-2">
          <MoroccoFlag className="size-4 shrink-0" />
          <div>
            <p className="font-mono-jatek text-[8px] uppercase tracking-[.1em] text-[#df3f91]">Livraison locale</p>
            <p className="text-[11px] font-extrabold text-[#12494f]">Les rues d’Oujda</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const { locale } = useLocale();
  const labels = localeCopy[locale];
  return (
    <section className="clip-slant-bottom relative min-h-[820px] overflow-hidden bg-[#12494f] px-5 pb-32 pt-36 text-[#fffaf1] sm:px-8 lg:min-h-[880px]">
      {/* Moroccan Geometric Background Patterns */}
      <MoroccanPattern className="absolute -left-32 -top-20 w-[600px] text-[#50c5c3] opacity-[0.07] rotate-12" />
      <MoroccanPattern className="absolute -right-20 -bottom-20 w-[800px] text-[#df3f91] opacity-[0.07] -rotate-12" />
      <div className="absolute right-[20%] top-[20%] size-[500px] rounded-full bg-[#f1e549]/5 blur-[120px]" />
      
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 mt-6">
        <div className="max-w-[650px] z-10">
          <div className="reveal-up inline-flex items-center gap-2 rounded-full border border-[#f1e549]/40 bg-[#f1e549]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[.17em] text-[#f1e549]">
            <MoroccoFlag className="size-5 flag-pulse" /> {labels.badge}
          </div>
          <h1 className="reveal-up reveal-delay-1 mt-7 max-w-[700px] font-display text-[clamp(3.5rem,7vw,6.5rem)] font-bold leading-[.9] tracking-[-.06em]">
            {labels.title}<br />
            <span className="text-[#f1e549]">{labels.accent}</span>
          </h1>
          <p className="reveal-up reveal-delay-2 mt-8 max-w-[470px] text-[17px] leading-7 text-[#fffaf1]/80">
            {labels.body}
          </p>
          <div className="reveal-up reveal-delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
            <button type="button" onClick={() => document.getElementById('univers')?.scrollIntoView({ behavior: 'smooth' })} className="magenta-glow group inline-flex items-center justify-center gap-3 rounded-full bg-[#ec0f73] px-8 py-4 text-sm font-extrabold text-white transition-all hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(236,15,115,0.45)] hover:bg-[#d70862]" data-testid="button-discover">
              {labels.discover} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <Link href="/devenir-partenaire" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-6 py-4 text-sm font-bold text-[#fffaf1] transition-all hover:bg-white/10 hover:border-[#f1e549] hover:text-[#f1e549]" data-testid="link-hero-partner">
              {labels.heroPartner} <ArrowUpRight size={16} />
            </Link>
          </div>
          
          <div className="reveal-up reveal-delay-3 mt-12 flex items-center gap-4 text-[11px] text-[#fffaf1]/60">
            <span className="flex -space-x-2">
              {['YK', 'SA', 'NA'].map((initials, i) => <span key={initials} className={`grid size-8 place-items-center rounded-full border-2 border-[#12494f] text-[9px] font-extrabold text-[#12494f] ${i === 0 ? 'bg-[#f1e549]' : i === 1 ? 'bg-[#50c5c3]' : 'bg-[#df3f91]'}`}>{initials}</span>)}
            </span>
            <span>{labels.proof}</span>
          </div>
        </div>
        
        <HeroPhoneMockup />
      </div>
    </section>
  );
}

function MarqueeBand() {
  return (
    <div className="overflow-hidden bg-[#df3f91] py-4 text-white shadow-[inset_0_5px_15px_rgba(0,0,0,0.1)] relative z-10 mt-[-2rem]">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap font-display text-2xl font-bold tracking-tight">
        {Array.from({ length: 4 }).flatMap((_, set) => [
          'Livraison rapide', 'Oujda, point de départ', 'Les villes arrivent', 'JATEK — دوزها'
        ].map((item, i) => (
          <span key={`${set}-${i}`} className="flex items-center gap-12">
            {item}
            <MoroccanStarIcon className="w-5 h-5 text-[#f1e549]" />
          </span>
        )))}
      </div>
    </div>
  );
}

function UniversSection() {
  return (
      <section id="univers" className="relative bg-[#fffaf1] px-5 py-24 sm:px-8 lg:py-36 overflow-hidden">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#f1e549]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -left-32 bottom-0 size-[360px] rounded-full bg-[#ec0f73]/10 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-[1240px] relative z-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="reveal-up">
            <p className="font-mono-jatek text-[11px] font-bold uppercase tracking-[.2em] text-[#df3f91] flex items-center gap-3">
              <span className="w-8 h-px bg-[#df3f91]"></span> Univers
            </p>
            <h2 className="mt-5 max-w-[690px] font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[.92] tracking-[-.05em] text-[#12494f]">
              Votre ville dans<br />
              <span className="text-[#df3f91]">votre poche.</span>
            </h2>
          </div>
          <p className="reveal-up reveal-delay-1 max-w-[330px] text-sm leading-6 text-[#12494f]/70 md:pb-2">
            Pas un catalogue sans âme. Des commerces que vous connaissez, des découvertes à portée de main et une équipe qui connaît vraiment la ville.
          </p>
        </div>
        
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, detail, icon: Icon, color }, i) => (
            <Link key={name} href="/support" className="reveal-up magenta-hover category-card group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-[#12494f]/5 bg-white p-7 text-[#12494f] shadow-[0_15px_40px_rgba(18,73,79,.04)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(18,73,79,.1)]" style={{ animationDelay: `${0.1 * (i + 1)}s` }} data-testid={`card-category-${i}`}>
              <span className={`grid size-16 place-items-center rounded-2xl ${color} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}><Icon size={28} strokeWidth={2} className={color === 'bg-[#f1e549]' || color === 'bg-[#d8dfb0]' ? 'text-[#12494f]' : 'text-white'} /></span>
              
              <div className="mt-16 relative z-10">
                <p className="font-display text-2xl font-bold tracking-[-.04em]">{name}</p>
                <p className="mt-2 text-sm text-[#12494f]/60 leading-relaxed">{detail}</p>
              </div>
              
              <span className="absolute right-6 top-6 grid size-10 place-items-center rounded-full bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                <ArrowUpRight size={18} className="text-[#df3f91]" />
              </span>
              
              <div className={`absolute -bottom-16 -right-16 size-48 rounded-full opacity-10 transition-transform duration-700 group-hover:scale-150 ${color}`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpansionMapSection() {
  return (
    <section className="relative overflow-hidden bg-[#12494f] px-5 py-24 text-[#fffaf1] sm:px-8 lg:py-32">
      <MoroccanPattern className="absolute -right-36 -top-28 w-[560px] text-[#50c5c3] opacity-[0.08] rotate-12" />
      <div className="absolute -bottom-40 -left-24 size-[420px] rounded-full bg-[#df3f91]/10 blur-[100px]" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="reveal-up">
          <p className="font-mono-jatek flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#f1e549]">
            <span className="h-px w-8 bg-[#f1e549]" /> Bientôt partout au Maroc
          </p>
          <h2 className="mt-5 max-w-[590px] font-display text-[clamp(2.8rem,6vw,5.4rem)] font-bold leading-[.92] tracking-[-.05em]">
            D’Oujda<br />
            <span className="text-[#f1e549]">à tout le Maroc.</span>
          </h2>
          <p className="mt-7 max-w-[470px] text-base leading-7 text-[#fffaf1]/75">
            JATEK commence à Oujda et s’étendra progressivement dans plusieurs villes marocaines, très bientôt. Même proximité, nouvelles adresses, une ville après l’autre.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f1e549] px-4 py-2.5 text-xs font-extrabold text-[#12494f]"><span className="size-2 rounded-full bg-[#df3f91]" /> Disponible à Oujda</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white/80"><span className="size-2 rounded-full bg-[#50c5c3]" /> Plusieurs villes bientôt</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[570px] reveal-up reveal-delay-1">
          <div className="moroccan-tile absolute inset-0 rounded-[2.5rem] opacity-20" />
            <div className="magenta-orbit relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#fffaf1] p-5 shadow-[0_25px_70px_rgba(0,0,0,.22)] sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono-jatek text-[10px] font-bold uppercase tracking-[.18em] text-[#df3f91]">La carte JATEK</p>
                <p className="mt-1 font-display text-xl font-bold text-[#12494f]">Notre Maroc, bientôt</p>
              </div>
              <MoroccoFlag className="size-9 rounded-md shadow-sm" />
            </div>
            <div className="relative mt-4 aspect-[.88] overflow-hidden rounded-[1.75rem] bg-[#edf0dc]">
              <svg viewBox="0 0 420 470" className="h-full w-full" role="img" aria-label="Carte stylisée du Maroc avec les prochaines villes JATEK">
                <defs>
                  <pattern id="map-zellige" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M12 0 24 12 12 24 0 12Z" fill="none" stroke="#50c5c3" strokeWidth="1" opacity=".35" />
                  </pattern>
                  <filter id="map-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#12494f" floodOpacity=".18" />
                  </filter>
                </defs>
                <rect width="420" height="470" fill="#edf0dc" />
                <path d="M104 26 165 35 198 62 253 72 288 111 278 151 310 188 287 229 301 264 286 291 298 315 285 339 280 365 267 392 252 425 235 459 213 468 192 455 175 430 154 411 135 391 117 365 101 341 83 322 75 294 90 262 69 233 88 197 77 162 97 131 86 95Z" fill="#d8dfb0" stroke="#12494f" strokeWidth="4" filter="url(#map-shadow)" />
                <path d="M104 26 165 35 198 62 253 72 288 111 278 151 310 188 287 229 301 264 286 291 298 315 285 339 280 365 267 392 252 425 235 459 213 468 192 455 175 430 154 411 135 391 117 365 101 341 83 322 75 294 90 262 69 233 88 197 77 162 97 131 86 95Z" fill="url(#map-zellige)" opacity=".7" />
                <path d="M101 322c61-26 99-52 181-110M121 366c56-45 85-93 130-177M104 131c55 8 91 33 178 74M143 399c37-15 69-13 105 7M170 431c23-11 42-9 59 4" fill="none" stroke="#50c5c3" strokeWidth="2" strokeDasharray="5 8" opacity=".75" />
                <path d="M179 196c-20 24-27 47-18 70M203 279c15 28 14 58-2 92M187 368c7 22 8 44 4 65" fill="none" stroke="#df3f91" strokeWidth="2" opacity=".7" />
                <g transform="translate(249 104)">
                  <circle r="13" fill="#df3f91" stroke="#fffaf1" strokeWidth="5" />
                  <circle r="4" fill="#fffaf1" />
                  <text x="20" y="5" fill="#12494f" fontSize="13" fontWeight="800">Tanger</text>
                </g>
                <g transform="translate(214 155)">
                  <circle r="13" fill="#50c5c3" stroke="#fffaf1" strokeWidth="5" />
                  <circle r="4" fill="#12494f" />
                  <text x="-82" y="5" fill="#12494f" fontSize="13" fontWeight="800">Rabat</text>
                </g>
                <g transform="translate(199 194)">
                  <circle r="13" fill="#50c5c3" stroke="#fffaf1" strokeWidth="5" />
                  <circle r="4" fill="#12494f" />
                  <text x="20" y="5" fill="#12494f" fontSize="13" fontWeight="800">Casablanca</text>
                </g>
                <g transform="translate(178 272)">
                  <circle r="13" fill="#50c5c3" stroke="#fffaf1" strokeWidth="5" />
                  <circle r="4" fill="#12494f" />
                  <text x="20" y="5" fill="#12494f" fontSize="13" fontWeight="800">Marrakech</text>
                </g>
                <g transform="translate(139 360)">
                  <circle r="13" fill="#50c5c3" stroke="#fffaf1" strokeWidth="5" />
                  <circle r="4" fill="#12494f" />
                  <text x="20" y="5" fill="#12494f" fontSize="13" fontWeight="800">Agadir</text>
                </g>
                <g transform="translate(164 402)">
                  <circle r="13" fill="#50c5c3" stroke="#fffaf1" strokeWidth="5" />
                  <circle r="4" fill="#12494f" />
                  <text x="20" y="5" fill="#12494f" fontSize="12" fontWeight="800">Laâyoune</text>
                </g>
                <g transform="translate(197 444)">
                  <circle r="13" fill="#50c5c3" stroke="#fffaf1" strokeWidth="5" />
                  <circle r="4" fill="#12494f" />
                  <text x="20" y="5" fill="#12494f" fontSize="12" fontWeight="800">Dakhla</text>
                </g>
                <g transform="translate(276 182)">
                  <circle r="17" fill="#f1e549" stroke="#fffaf1" strokeWidth="6" />
                  <circle r="5" fill="#df3f91" />
                  <text x="22" y="5" fill="#12494f" fontSize="14" fontWeight="900">Oujda</text>
                </g>
              </svg>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-xs text-[#12494f]/60">
              <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#f1e549] ring-2 ring-[#f1e549]/30" /> Aujourd’hui</span>
              <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#50c5c3]" /> Très bientôt</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: '01', title: 'Choisissez votre envie', detail: 'Parcourez les adresses près de vous, des incontournables aux petites pépites.', icon: Navigation },
    { number: '02', title: 'On prépare avec soin', detail: 'Votre commerce reçoit la commande. Un coursier JATEK se met en route.', icon: Store },
    { number: '03', title: 'Ça arrive chez vous', detail: 'Suivez le trajet et profitez. Votre ville n’a jamais été aussi proche.', icon: Route },
  ];
  return (
    <section id="comment" className="clip-slant-top relative bg-[#edf0dc] px-5 py-32 sm:px-8 lg:py-44 overflow-hidden mt-[-4rem]">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#12494f 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="mx-auto max-w-[1240px] relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
          <div className="reveal-up">
            <p className="font-mono-jatek text-[11px] font-bold uppercase tracking-[.2em] text-[#df3f91] flex items-center gap-3">
              <span className="w-8 h-px bg-[#df3f91]"></span> Simple
            </p>
            <h2 className="mt-5 font-display text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[.95] tracking-[-.05em] text-[#12494f]">
              Une ville.<br />
              <span className="text-[#df3f91]">Un geste.</span>
            </h2>
            
            <div className="mt-14 overflow-hidden rounded-[2.5rem] bg-[#12494f] p-8 text-[#fffaf1] shadow-xl relative group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#50c5c3] rounded-bl-full opacity-20 transition-transform duration-700 group-hover:scale-125"></div>
              <Leaf size={36} className="text-[#f1e549] mb-6" strokeWidth={1.5} />
              <p className="font-mono-jatek text-[10px] uppercase tracking-[.17em] text-[#50c5c3]">Une promesse locale</p>
              <p className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight">
                La proximité, ce n'est pas une distance.<br />
                <span className="text-[#f1e549]">C'est une façon de faire.</span>
              </p>
            </div>
          </div>
          
          <div className="grid gap-6">
            {steps.map(({ number, title, detail, icon: Icon }, i) => (
              <div key={number} className="reveal-up group relative rounded-[2rem] bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white" style={{ animationDelay: `${0.1 * i}s` }}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <span className="grid size-14 shrink-0 place-items-center rounded-[1rem] bg-[#edf0dc] text-[#12494f] font-mono-jatek text-sm font-bold transition-colors group-hover:bg-[#df3f91] group-hover:text-white">
                      {number}
                    </span>
                    {i !== steps.length - 1 && <div className="w-[2px] h-full bg-[#12494f]/5 rounded-full mt-2"></div>}
                  </div>
                  <div className="pb-4">
                    <h3 className="font-display text-2xl font-bold text-[#12494f] flex items-center gap-3">
                      {title} 
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[#12494f]/65 max-w-[400px]">{detail}</p>
                  </div>
                </div>
                <Icon size={120} className="absolute right-0 bottom-0 text-[#12494f]/5 translate-x-8 translate-y-8 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-500" strokeWidth={1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocalProof() {
  return (
    <section className="relative overflow-hidden bg-[#ec0f73] px-5 py-24 text-[#fffaf1] sm:px-8 lg:py-36">
      <MoroccanPattern className="absolute -right-32 -top-32 w-[700px] text-[#f1e549] opacity-10 animate-spin-slow" />
      <MoroccanPattern className="absolute -left-20 -bottom-20 w-[500px] text-[#12494f] opacity-15" />
      
      <div className="relative mx-auto max-w-[1240px] z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal-up">
            <p className="font-mono-jatek text-[11px] font-bold uppercase tracking-[.2em] text-[#f1e549] flex items-center gap-3">
              <span className="w-8 h-px bg-[#f1e549]"></span> C'est chez nous
            </p>
            <h2 className="mt-5 max-w-[600px] font-display text-[clamp(3.5rem,6.5vw,6rem)] font-bold leading-[.92] tracking-[-.05em]">
              Le goût du<br />
              <span className="text-[#f1e549]">coin de rue.</span>
            </h2>
            <p className="mt-8 max-w-[440px] text-lg leading-relaxed text-[#fffaf1]/90">
              JATEK est né d'une idée simple : les meilleures expériences ne sont pas toujours les plus loin. Elles sont souvent au bout de votre avenue.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="reveal-up magenta-hover group rounded-[2.5rem] bg-[#12494f] p-8">
              <MapPin size={32} className="text-[#f1e549] transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
              <p className="mt-12 font-display text-4xl font-bold tracking-[-.04em] sm:text-5xl">Oujda</p>
              <p className="mt-2 text-sm text-[#fffaf1]/70">notre point de départ</p>
            </div>
            <div className="reveal-up magenta-hover group mt-8 rounded-[2.5rem] bg-[#f1e549] p-8 text-[#12494f]" style={{ animationDelay: '0.1s' }}>
              <Users size={32} className="text-[#df3f91] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
              <p className="mt-12 font-display text-4xl font-bold tracking-[-.04em] sm:text-5xl">+120</p>
              <p className="mt-2 text-sm text-[#12494f]/70">adresses à découvrir</p>
            </div>
            <div className="reveal-up magenta-hover group rounded-[2.5rem] border-2 border-white/20 p-8 backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
              <Bike size={32} className="text-[#50c5c3] transition-transform duration-500 group-hover:translate-x-4" />
              <p className="mt-12 font-display text-4xl font-bold tracking-[-.04em] sm:text-5xl">24<span className="text-2xl text-white/50 ml-1">min</span></p>
              <p className="mt-2 text-sm text-[#fffaf1]/80">en moyenne</p>
            </div>
            <div className="reveal-up magenta-hover group mt-8 rounded-[2.5rem] bg-[#50c5c3] p-8 text-[#12494f]" style={{ animationDelay: '0.3s' }}>
              <BadgeCheck size={32} className="text-white transition-transform duration-500 group-hover:scale-125" />
              <p className="mt-12 font-display text-4xl font-bold tracking-[-.04em] sm:text-5xl">100%</p>
              <p className="mt-2 text-sm text-[#12494f]/70">équipe locale</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeSupport() {
  return (
    <section className="bg-[#fffaf1] px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 rounded-[3rem] bg-[#50c5c3] p-10 sm:p-14 md:flex-row md:items-center md:justify-between overflow-hidden relative shadow-[0_30px_60px_rgba(80,197,195,0.2)]">
        <MoroccanPattern className="absolute right-0 top-0 w-[600px] text-[#12494f] opacity-10 -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        
        <div className="relative z-10">
          <p className="font-mono-jatek text-[11px] font-bold uppercase tracking-[.2em] text-[#12494f] flex items-center gap-3">
            <span className="w-6 h-px bg-[#12494f]"></span> Besoin d'aide ?
          </p>
          <h2 className="mt-5 max-w-[620px] font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-.04em] text-[#12494f]">
            Une commande, une question, une solution.
          </h2>
          <p className="mt-5 max-w-[560px] text-base leading-relaxed text-[#12494f]/80">
            Le centre de support JATEK vous aide pour vos commandes, vos données et vos demandes de partenariat.
          </p>
        </div>
        <Link href="/support" className="relative z-10 shrink-0 inline-flex items-center justify-center gap-3 rounded-full bg-[#12494f] px-8 py-5 text-base font-extrabold text-[#fffaf1] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#12494f]/30" data-testid="link-home-support">
          Ouvrir le support <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); if (email.trim()) setSent(true); };
  
  if (sent) return (
    <div className="mx-auto mt-10 flex max-w-[430px] items-center justify-center gap-3 rounded-full bg-[#f1e549] px-6 py-4 text-sm font-bold text-[#12494f] shadow-lg reveal-up" data-testid="status-waitlist-success">
      <Check size={18} /> C'est noté. À très vite dans votre boîte mail.
    </div>
  );
  
  return (
    <form onSubmit={submit} className="mx-auto mt-12 flex max-w-[520px] flex-col gap-3 sm:flex-row reveal-up">
      <input 
        type="email" 
        required 
        value={email} 
        onChange={(event) => setEmail(event.target.value)} 
        placeholder="votre@email.ma" 
        className="min-h-[64px] flex-1 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm px-7 text-base text-white outline-none placeholder:text-white/50 focus:border-[#f1e549] focus:bg-white/10 transition-all" 
        aria-label="Votre adresse email" 
        data-testid="input-waitlist-email" 
      />
      <button 
        type="submit" 
        className="inline-flex min-h-[64px] items-center justify-center gap-3 rounded-full bg-[#f1e549] px-8 text-base font-extrabold text-[#12494f] transition-transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(241,229,73,0.3)]" 
        data-testid="button-waitlist-submit"
      >
        Me prévenir <Send size={18} />
      </button>
    </form>
  );
}

function HomeCta() {
  return (
    <section className="bg-[#12494f] px-5 py-24 sm:px-8 lg:py-40 text-center relative overflow-hidden clip-slant-top mt-[-4rem]">
      <MoroccanPattern className="absolute left-1/2 top-1/2 w-[900px] -translate-x-1/2 -translate-y-1/2 text-[#50c5c3] opacity-5 animate-spin-slow pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-[800px] pt-16">
        <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-[#df3f91] text-white shadow-xl shadow-[#df3f91]/30 rotate-3 mx-auto mb-8">
          <Sparkles size={32} />
        </span>
        <h2 className="mx-auto font-display text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[1] tracking-[-.05em] text-white">
          Les bons plans ne<br />
          <span className="text-[#f1e549]">devraient pas dormir.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-[480px] text-lg leading-relaxed text-white/70">
          JATEK arrive bientôt sur votre téléphone. Laissez votre email, on vous prévient en premier.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="site-shell noise-overlay">
      <Header />
      <main>
        <Hero />
        <MarqueeBand />
        <UniversSection />
        <ExpansionMapSection />
        <HowItWorks />
        <LocalProof />
        <HomeSupport />
        <HomeCta />
      </main>
      <PageFooter />
    </div>
  );
}

// Internal Pages Structure (preserved content, updated styling)
function SimplePage({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: string; children: ReactNode }) {
  return (
    <div className="site-shell min-h-screen bg-[#fffaf1]">
      <Header />
      <main className="px-5 pb-24 pt-40 sm:px-8">
        <div className="mx-auto max-w-[940px]">
          <p className="font-mono-jatek text-[11px] font-bold uppercase tracking-[.2em] text-[#df3f91] flex items-center gap-3">
            <span className="w-8 h-px bg-[#df3f91]"></span> {eyebrow}
          </p>
          <h1 className="mt-5 max-w-[820px] font-display text-[clamp(3.4rem,7vw,6.5rem)] font-bold leading-[.92] tracking-[-.05em] text-[#12494f]">{title}</h1>
          <p className="mt-8 max-w-[650px] text-lg leading-8 text-[#12494f]/70">{intro}</p>
          {children}
          <div className="mt-20 flex flex-col gap-6 rounded-[2.5rem] bg-[#edf0dc] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12 relative overflow-hidden">
            <MoroccanPattern className="absolute right-0 top-0 w-64 text-[#12494f] opacity-5 -translate-y-1/4 translate-x-1/4" />
            <div className="relative z-10">
              <p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#df3f91]">Une question ?</p>
              <p className="mt-2 font-display text-2xl font-bold tracking-[-.04em] text-[#12494f]">L’équipe JATEK est là pour vous répondre.</p>
            </div>
            <Link href="/support" className="relative z-10 inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#12494f] px-8 py-4 text-sm font-extrabold text-[#fffaf1] transition-transform hover:-translate-y-1 hover:shadow-lg" data-testid="link-legal-support">
              Ouvrir le support <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}

function PrivacyPage() {
  return (
    <SimplePage
      eyebrow="Vos données, vos choix"
      title={<>Votre vie privée,<br /><span className="text-[#df3f91]">notre priorité.</span></>}
      intro="Cette page explique clairement quelles données JATEK peut recevoir, pourquoi elles sont utilisées et comment exercer vos droits."
    >
      <div className="mt-16 grid gap-8 border-t border-[#12494f]/15 pt-12 md:grid-cols-[190px_1fr]">
        <aside className="font-mono-jatek text-[10px] uppercase tracking-[.16em] text-[#df3f91]">
          Politique RGPD
          <p className="mt-3 text-[#12494f]/45">Dernière mise à jour<br />11 septembre 2026</p>
        </aside>
        <article className="grid gap-12 text-[#12494f]">
          <section className="grid gap-4">
            <h2 className="font-display text-3xl font-bold tracking-[-.04em]">1. Qui est responsable de vos données ?</h2>
            <p className="text-base leading-8 text-[#12494f]/70">JATEK est une plateforme de livraison locale opérée depuis Oujda, au Maroc. Pour toute question concernant vos données personnelles, vous pouvez écrire à <a className="font-bold text-[#df3f91] underline underline-offset-4" href="mailto:contact@jatek.app">contact@jatek.app</a>.</p>
          </section>
          <section className="grid gap-4">
            <h2 className="font-display text-3xl font-bold tracking-[-.04em]">2. Quelles données peuvent être concernées ?</h2>
            <p className="text-base leading-8 text-[#12494f]/70">Selon votre demande, il peut s’agir de votre nom, adresse email, numéro de téléphone, nom de commerce, catégorie d’activité et contenu de votre message. Nous ne demandons pas de données sensibles et nous ne stockons pas vos informations bancaires sur ce site vitrine.</p>
            <div className="grid gap-4 sm:grid-cols-3 mt-2">
              <div className="rounded-[1.5rem] bg-[#edf0dc] p-6"><p className="font-mono-jatek text-[10px] uppercase tracking-[.14em] text-[#df3f91]">Support</p><p className="mt-3 text-sm leading-6 text-[#12494f]/70">Nom, email et message.</p></div>
              <div className="rounded-[1.5rem] bg-[#edf0dc] p-6"><p className="font-mono-jatek text-[10px] uppercase tracking-[.14em] text-[#df3f91]">Partenaire</p><p className="mt-3 text-sm leading-6 text-[#12494f]/70">Commerce, contact, téléphone et catégorie.</p></div>
              <div className="rounded-[1.5rem] bg-[#edf0dc] p-6"><p className="font-mono-jatek text-[10px] uppercase tracking-[.14em] text-[#df3f91]">Attente</p><p className="mt-3 text-sm leading-6 text-[#12494f]/70">Adresse email si vous demandez à être prévenu.</p></div>
            </div>
          </section>
          <section className="grid gap-4">
            <h2 className="font-display text-3xl font-bold tracking-[-.04em]">3. Pourquoi les utiliser ?</h2>
            <ul className="grid gap-3 text-base leading-7 text-[#12494f]/70">
              <li className="flex gap-4"><span className="mt-2 size-2 shrink-0 rounded-full bg-[#df3f91]" />Répondre à une demande envoyée au support.</li>
              <li className="flex gap-4"><span className="mt-2 size-2 shrink-0 rounded-full bg-[#df3f91]" />Recontacter un commerce qui souhaite devenir partenaire.</li>
              <li className="flex gap-4"><span className="mt-2 size-2 shrink-0 rounded-full bg-[#df3f91]" />Vous prévenir du lancement si vous vous inscrivez volontairement à la liste d’attente.</li>
              <li className="flex gap-4"><span className="mt-2 size-2 shrink-0 rounded-full bg-[#df3f91]" />Sécuriser, maintenir et améliorer le site.</li>
            </ul>
          </section>
        </article>
      </div>
    </SimplePage>
  );
}

function LegalDetailsPage() {
  return (
    <SimplePage
      eyebrow="Transparence"
      title={<>Les choses<br /><span className="text-[#df3f91]">claires.</span></>}
      intro="Les informations légales de JATEK, présentées simplement — parce que la confiance commence par la clarté."
    >
      <div className="mt-16 grid gap-8 border-t border-[#12494f]/15 pt-12 md:grid-cols-[190px_1fr]">
        <aside className="font-mono-jatek text-[10px] uppercase tracking-[.16em] text-[#df3f91]">Mentions légales<p className="mt-3 text-[#12494f]/45">Dernière mise à jour<br />11 septembre 2026</p></aside>
        <article className="grid gap-12 text-[#12494f]">
          <section className="grid gap-4"><h2 className="font-display text-3xl font-bold tracking-[-.04em]">Éditeur du site</h2><p className="text-base leading-8 text-[#12494f]/70">JATEK est une marque de livraison locale en cours de déploiement à Oujda, Maroc. Le site est édité par JATEK et s’adresse en priorité aux habitants et commerces d’Oujda.</p></section>
          <section className="grid gap-4"><h2 className="font-display text-3xl font-bold tracking-[-.04em]">Nous contacter</h2><p className="text-base leading-8 text-[#12494f]/70">Email : <a className="font-bold text-[#df3f91] underline underline-offset-4" href="mailto:contact@jatek.app">contact@jatek.app</a></p></section>
          <section className="grid gap-4"><h2 className="font-display text-3xl font-bold tracking-[-.04em]">Hébergement</h2><p className="text-base leading-8 text-[#12494f]/70">Le site est hébergé sur l’infrastructure Hostinger utilisée pour le plan Cloud Startup. Les informations contractuelles exactes de l’éditeur et de l’hébergeur devront être complétées avec les coordonnées figurant dans les contrats avant la mise en ligne commerciale.</p></section>
          <section className="grid gap-4"><h2 className="font-display text-3xl font-bold tracking-[-.04em]">Propriété intellectuelle</h2><p className="text-base leading-8 text-[#12494f]/70">La marque JATEK, son identité visuelle, ses textes, illustrations et éléments graphiques sont protégés. Toute reproduction ou utilisation sans autorisation préalable est interdite.</p></section>
          <section className="grid gap-4"><h2 className="font-display text-3xl font-bold tracking-[-.04em]">Données personnelles</h2><p className="text-base leading-8 text-[#12494f]/70">Pour comprendre les données traitées et exercer vos droits, consultez notre <Link className="font-bold text-[#df3f91] underline underline-offset-4" href="/confidentialite">politique RGPD</Link>.</p></section>
        </article>
      </div>
    </SimplePage>
  );
}

function CookiesPage() {
  return (
    <SimplePage eyebrow="Navigation" title={<>Une navigation<br /><span className="text-[#df3f91]">sans surprise.</span></>} intro="JATEK limite les traceurs au strict nécessaire et explique ici ce qui peut être utilisé lorsque vous consultez le site.">
      <div className="mt-16 grid gap-8 border-t border-[#12494f]/15 pt-12 md:grid-cols-[190px_1fr]">
        <aside className="font-mono-jatek text-[10px] uppercase tracking-[.16em] text-[#df3f91]">Politique cookies<p className="mt-3 text-[#12494f]/45">Dernière mise à jour<br />11 septembre 2026</p></aside>
        <article className="grid gap-12 text-[#12494f]">
          <section className="grid gap-4"><h2 className="font-display text-3xl font-bold tracking-[-.04em]">Pas de cookies publicitaires</h2><p className="text-base leading-8 text-[#12494f]/70">Le site JATEK n’utilise pas actuellement de cookies publicitaires, de reciblage ou de mesure d’audience. Nous ne vendons pas votre activité de navigation.</p></section>
        </article>
      </div>
    </SimplePage>
  );
}

function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Commande et livraison', message: '' });
  const submit = (event: FormEvent) => { event.preventDefault(); const body = `Bonjour JATEK,\n\nNom : ${form.name}\nEmail : ${form.email}\nSujet : ${form.subject}\n\n${form.message}\n\nEnvoyé depuis le centre de support JATEK.`; window.location.href = `mailto:contact@jatek.app?subject=${encodeURIComponent(`Support JATEK — ${form.subject}`)}&body=${encodeURIComponent(body)}`; setSent(true); };
  
  return (
    <div className="site-shell min-h-screen bg-[#fffaf1]">
      <Header />
      <main className="px-5 pb-24 pt-36 sm:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] items-start">
            <div>
              <p className="font-mono-jatek text-[11px] font-bold uppercase tracking-[.2em] text-[#df3f91] flex items-center gap-3">
                <span className="w-8 h-px bg-[#df3f91]"></span> On est là
              </p>
              <h1 className="mt-5 font-display text-[clamp(3.5rem,7vw,6.5rem)] font-bold leading-[.9] tracking-[-.05em] text-[#12494f]">Parlons-nous<br /><span className="text-[#df3f91]">vraiment.</span></h1>
              <p className="mt-8 max-w-[410px] text-lg leading-8 text-[#12494f]/70">Une question sur une commande, une idée à partager ou juste besoin d’un coup de main ? Notre équipe locale vous répond.</p>
              <div className="mt-12 grid gap-4">
                <a href="mailto:contact@jatek.app" className="group flex items-center gap-5 rounded-[1.5rem] border border-[#12494f]/10 bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-1" data-testid="link-support-email">
                  <span className="grid size-14 place-items-center rounded-2xl bg-[#f1e549] text-[#12494f] transition-transform group-hover:scale-110"><Mail size={22} /></span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-[.15em] text-[#12494f]/50">Écrivez-nous</span><span className="mt-1 block text-base font-bold text-[#12494f]">contact@jatek.app</span></span>
                  <ArrowUpRight size={18} className="ml-auto text-[#12494f]/30 group-hover:text-[#df3f91] transition-colors" />
                </a>
              </div>
            </div>
            
            <div className="rounded-[2.5rem] bg-[#12494f] p-8 text-[#fffaf1] sm:p-12 shadow-2xl relative overflow-hidden">
              <MoroccanPattern className="absolute right-0 bottom-0 w-80 text-[#50c5c3] opacity-10 translate-y-1/4 translate-x-1/4 pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#f1e549]">Envoyer un message</p>
                  <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">On vous écoute.</h2>
                </div>
                <MessageCircle className="text-[#50c5c3]" size={36} strokeWidth={1.5} />
              </div>
              
              {sent ? (
                <div className="relative z-10 mt-12 rounded-[2rem] bg-[#50c5c3]/20 p-8 border border-[#50c5c3]/30" data-testid="status-support-success">
                  <div className="w-16 h-16 bg-[#f1e549] rounded-2xl flex items-center justify-center text-[#12494f] mb-6"><Check size={28} /></div>
                  <p className="font-display text-3xl font-bold">Message bien reçu.</p>
                  <p className="mt-3 text-base leading-7 text-[#fffaf1]/80">Notre équipe revient vers vous rapidement. Merci de faire avancer JATEK avec nous.</p>
                  <button type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: 'Commande et livraison', message: '' }); }} className="mt-8 text-sm font-bold text-[#f1e549] underline underline-offset-4" data-testid="button-support-another">Envoyer un autre message</button>
                </div>
              ) : (
                <form onSubmit={submit} className="relative z-10 mt-10 grid gap-6">
                  <label className="grid gap-2 text-sm font-bold text-[#fffaf1]/70">Votre prénom
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="min-h-[56px] rounded-xl border border-white/20 bg-white/5 px-5 text-base font-normal text-white outline-none placeholder:text-white/30 focus:border-[#f1e549] focus:bg-white/10 transition-all" placeholder="Comment peut-on vous appeler ?" data-testid="input-support-name" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-[#fffaf1]/70">Votre email
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="min-h-[56px] rounded-xl border border-white/20 bg-white/5 px-5 text-base font-normal text-white outline-none placeholder:text-white/30 focus:border-[#f1e549] focus:bg-white/10 transition-all" placeholder="vous@exemple.ma" data-testid="input-support-email" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-[#fffaf1]/70">Sujet de votre demande
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="min-h-[56px] rounded-xl border border-white/20 bg-[#12494f] px-5 text-base font-normal text-white outline-none focus:border-[#f1e549] focus:bg-white/10 transition-all" data-testid="select-support-subject">
                      <option>Commande et livraison</option>
                      <option>Problème technique</option>
                      <option>Devenir partenaire</option>
                      <option>Données personnelles / RGPD</option>
                      <option>Autre demande</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-[#fffaf1]/70">Votre message
                    <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="resize-none rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-base font-normal text-white outline-none placeholder:text-white/30 focus:border-[#f1e549] focus:bg-white/10 transition-all" placeholder="Dites-nous tout..." data-testid="input-support-message" />
                  </label>
                  <button type="submit" className="mt-4 inline-flex min-h-[56px] items-center justify-center gap-3 rounded-xl bg-[#df3f91] text-base font-extrabold transition-all hover:bg-[#c92d7c] hover:-translate-y-1 hover:shadow-lg" data-testid="button-support-submit">
                    Envoyer le message <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
          
          <div className="mt-32 grid gap-12 lg:grid-cols-[.8fr_1.2fr] items-start border-t border-[#12494f]/10 pt-20">
            <div>
              <p className="font-mono-jatek text-[11px] font-bold uppercase tracking-[.2em] text-[#df3f91] flex items-center gap-3">
                <span className="w-8 h-px bg-[#df3f91]"></span> FAQ
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-[-.05em] text-[#12494f] leading-tight">Avant de nous écrire.</h2>
            </div>
            <div className="border-t border-[#12494f]/15">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="border-b border-[#12494f]/15">
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left font-display text-xl font-bold text-[#12494f] hover:text-[#df3f91] transition-colors" aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}>
                    <span>{faq.question}</span>
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full border border-[#12494f]/10 transition-transform duration-300 ${openFaq === index ? 'rotate-180 bg-[#df3f91] text-white border-transparent' : 'text-[#df3f91]'}`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  {openFaq === index && <p className="animate-in slide-in-from-top-2 fade-in duration-300 max-w-[680px] pb-6 text-base leading-relaxed text-[#12494f]/70" data-testid={`text-faq-answer-${index}`}>{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}

function PartnerPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ business: '', contact: '', phone: '', category: '' });
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  
  return (
    <div className="site-shell min-h-screen bg-[#edf0dc] clip-slant-bottom pb-20">
      <Header />
      <main className="px-5 pb-24 pt-40 sm:px-8 relative z-10">
        <MoroccanPattern className="absolute left-0 top-20 w-[600px] text-[#12494f] opacity-[0.03] -translate-x-1/2 pointer-events-none" />
        
        <div className="mx-auto max-w-[1240px]">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="font-mono-jatek text-[11px] font-bold uppercase tracking-[.2em] text-[#df3f91] flex items-center gap-3">
                <span className="w-8 h-px bg-[#df3f91]"></span> Pour les pros d’Oujda
              </p>
              <h1 className="mt-5 max-w-[700px] font-display text-[clamp(3.5rem,7vw,7rem)] font-bold leading-[.9] tracking-[-.06em] text-[#12494f]">Votre adresse.<br /><span className="text-[#df3f91]">Plus de monde.</span></h1>
              <p className="mt-8 max-w-[510px] text-lg leading-8 text-[#12494f]/70">Rejoignez le réseau de commerces qui font bouger Oujda. JATEK vous aide à toucher vos voisins, sans changer votre façon de travailler.</p>
              
              <div className="mt-16 grid max-w-[550px] gap-6 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-[#12494f] p-8 text-[#fffaf1] shadow-xl">
                  <Store size={28} className="text-[#f1e549]" />
                  <h3 className="mt-8 font-display text-2xl font-bold">Votre vitrine locale</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">Présentez vos spécialités aux personnes qui vivent autour de vous.</p>
                </div>
                <div className="rounded-[2rem] bg-[#f1e549] p-8 text-[#12494f] shadow-xl">
                  <ArrowUpRight size={28} />
                  <h3 className="mt-8 font-display text-2xl font-bold">Plus de commandes</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#12494f]/70">Une nouvelle façon de servir, avec un accompagnement humain.</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_30px_60px_rgba(18,73,79,.08)] sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#df3f91]/10 rounded-bl-full"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#df3f91]">Parlons de vous</p>
                  <h2 className="mt-3 font-display text-4xl font-bold text-[#12494f] tracking-tight">On commence ici.</h2>
                </div>
                <Store size={36} className="text-[#50c5c3]" strokeWidth={1.5} />
              </div>
              
              {sent ? (
                <div className="mt-12 rounded-[2rem] bg-[#50c5c3]/10 border border-[#50c5c3]/20 p-8 text-[#12494f]" data-testid="status-partner-success">
                  <div className="w-16 h-16 bg-[#50c5c3] rounded-2xl flex items-center justify-center text-white mb-6"><BadgeCheck size={32} /></div>
                  <p className="font-display text-3xl font-bold">Demande envoyée.</p>
                  <p className="mt-3 text-base leading-7 text-[#12494f]/70">Merci. Un membre de l’équipe JATEK vous appelle dans les 48 heures pour faire connaissance.</p>
                  <button type="button" onClick={() => setSent(false)} className="mt-8 text-sm font-bold text-[#df3f91] underline underline-offset-4" data-testid="button-partner-another">Modifier ma demande</button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-10 grid gap-5 relative z-10">
                  <label className="grid gap-2 text-sm font-bold text-[#12494f]/70">Nom du commerce
                    <input required value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} className="min-h-[56px] rounded-xl border border-[#12494f]/15 bg-white px-5 text-base font-normal text-[#12494f] outline-none placeholder:text-[#12494f]/30 focus:border-[#df3f91] focus:ring-4 focus:ring-[#df3f91]/10 transition-all shadow-sm" placeholder="Ex. Le Comptoir d’Oujda" data-testid="input-partner-business" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-[#12494f]/70">Votre nom
                    <input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="min-h-[56px] rounded-xl border border-[#12494f]/15 bg-white px-5 text-base font-normal text-[#12494f] outline-none placeholder:text-[#12494f]/30 focus:border-[#df3f91] focus:ring-4 focus:ring-[#df3f91]/10 transition-all shadow-sm" placeholder="Votre prénom et nom" data-testid="input-partner-contact" />
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-bold text-[#12494f]/70">Téléphone
                      <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="min-h-[56px] rounded-xl border border-[#12494f]/15 bg-white px-5 text-base font-normal text-[#12494f] outline-none placeholder:text-[#12494f]/30 focus:border-[#df3f91] focus:ring-4 focus:ring-[#df3f91]/10 transition-all shadow-sm" placeholder="+212 6..." data-testid="input-partner-phone" />
                    </label>
                    <label className="grid gap-2 text-sm font-bold text-[#12494f]/70">Catégorie
                      <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="min-h-[56px] rounded-xl border border-[#12494f]/15 bg-white px-4 text-base font-normal text-[#12494f] outline-none focus:border-[#df3f91] focus:ring-4 focus:ring-[#df3f91]/10 transition-all shadow-sm" data-testid="select-partner-category">
                        <option value="">Choisir</option>
                        <option>Restaurant</option>
                        <option>Épicerie</option>
                        <option>Pharmacie</option>
                        <option>Beauté</option>
                        <option>Autre</option>
                      </select>
                    </label>
                  </div>
                  <button type="submit" className="mt-4 inline-flex min-h-[60px] items-center justify-center gap-3 rounded-xl bg-[#df3f91] text-base font-extrabold text-white transition-all hover:bg-[#c92d7c] hover:-translate-y-1 hover:shadow-lg" data-testid="button-partner-submit">
                    Proposer mon commerce <ArrowRight size={18} />
                  </button>
                  <p className="flex items-center justify-center gap-2 text-center text-xs text-[#12494f]/50 mt-2">
                    <LockKeyhole size={14} /> Vos informations restent entre nous.
                  </p>
                </form>
              )}
            </div>
          </div>
          
          <div className="mt-32 grid gap-10 border-t border-[#12494f]/10 pt-16 md:grid-cols-3">
            <div className="reveal-up">
              <span className="font-mono-jatek text-xs text-[#df3f91] font-bold">01</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-[#12494f]">On fait connaissance</h3>
              <p className="mt-3 text-base leading-relaxed text-[#12494f]/70">Un appel court pour comprendre votre commerce et vos envies.</p>
            </div>
            <div className="reveal-up" style={{ animationDelay: '0.1s' }}>
              <span className="font-mono-jatek text-xs text-[#df3f91] font-bold">02</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-[#12494f]">On construit votre vitrine</h3>
              <p className="mt-3 text-base leading-relaxed text-[#12494f]/70">Menu, photos, horaires : on s’occupe de vous mettre en valeur.</p>
            </div>
            <div className="reveal-up" style={{ animationDelay: '0.2s' }}>
              <span className="font-mono-jatek text-xs text-[#df3f91] font-bold">03</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-[#12494f]">Vous servez, on livre</h3>
              <p className="mt-3 text-base leading-relaxed text-[#12494f]/70">Une équipe locale et un suivi simple, du clic à la porte.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <WouterRoute path="/" component={Home} />
        <WouterRoute path="/confidentialite" component={PrivacyPage} />
        <WouterRoute path="/mentions-legales" component={LegalDetailsPage} />
        <WouterRoute path="/cookies" component={CookiesPage} />
        <WouterRoute path="/support" component={SupportPage} />
        <WouterRoute path="/devenir-partenaire" component={PartnerPage} />
        <WouterRoute component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location]);

  return null;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <LocaleProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <ScrollToTop />
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LocaleProvider>
  );
}

export default App;