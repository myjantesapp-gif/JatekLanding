import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, Bike, Check, ChevronDown, Clock3, FileText, HeartPulse, Instagram, Leaf, LockKeyhole, Mail, MapPin, Menu, MessageCircle, Navigation, Phone, Route, Scissors, Send, ShieldCheck, ShoppingBag, Sparkles, Store, Users, X } from 'lucide-react';
import jatekLogo from '@assets/jatek-logo-transparent.png';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route as WouterRoute, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type IconType = typeof Store;

const categories: { name: string; detail: string; icon: IconType; color: string }[] = [
  { name: 'À manger', detail: 'Les tables qui font Oujda', icon: Store, color: 'bg-[#f1e549]' },
  { name: 'Épicerie', detail: 'Le quotidien, sans détour', icon: ShoppingBag, color: 'bg-[#50c5c3]' },
  { name: 'Pharmacie', detail: 'Ce qu’il vous faut, vite', icon: HeartPulse, color: 'bg-[#ed5ca0]' },
  { name: 'Beauté', detail: 'Les adresses qui vous ressemblent', icon: Scissors, color: 'bg-[#d8dfb0]' },
];

const faqs = [
  { question: 'Où livrez-vous à Oujda ?', answer: 'JATEK couvre les quartiers d’Oujda et s’étend chaque semaine avec de nouvelles adresses. Entrez votre quartier dans l’application pour voir les commerces disponibles autour de vous.' },
  { question: 'Combien coûte la livraison ?', answer: 'Les frais sont affichés avant chaque commande. Ils dépendent de la distance et de la catégorie choisie — toujours sans mauvaise surprise.' },
  { question: 'Puis-je suivre ma commande ?', answer: 'Oui. Dès que votre commande est prise en charge, vous pouvez suivre son avancée en temps réel et échanger avec votre coursier si besoin.' },
  { question: 'Comment devenir partenaire ?', answer: 'Remplissez le formulaire partenaire avec quelques informations sur votre établissement. Notre équipe locale vous rappelle sous 48 heures pour vous accompagner.' },
  { question: 'Quels moyens de paiement acceptez-vous ?', answer: 'Le paiement à la livraison est disponible. D’autres options de paiement seront ajoutées progressivement pour s’adapter aux habitudes de chaque quartier.' },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" data-testid="link-logo">
      <span className={`flex items-center rounded-[11px] px-2 py-1.5 transition-transform duration-300 group-hover:rotate-[-3deg] ${light ? 'bg-[#fffaf1]' : 'bg-[#fffaf1]/85'}`}>
        <img src={jatekLogo} alt="JATEK" className="h-7 w-[92px] object-contain sm:h-8 sm:w-[104px]" />
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/';
  const links = [
    { href: '/#univers', label: 'L’univers JATEK' },
    { href: '/#comment', label: 'Comment ça marche' },
    { href: '/devenir-partenaire', label: 'Devenir partenaire' },
  ];
  return (
    <header className={`absolute left-0 right-0 top-0 z-40 ${isHome ? 'text-[#fffaf1]' : 'text-[#12494f]'}`}>
      <div className="nav-wrap mx-auto mt-4 flex max-w-[1240px] items-center justify-between rounded-full border border-white/30 px-4 py-3 shadow-[0_10px_35px_rgba(18,73,79,.08)] sm:px-5">
        <Logo light={isHome} />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`text-[12px] font-bold tracking-[.01em] transition-colors hover:text-[#df3f91] ${isHome ? 'text-[#fffaf1]/80' : 'text-[#12494f]/75'}`} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/support" className={`text-[12px] font-bold transition-colors hover:text-[#df3f91] ${isHome ? 'text-[#fffaf1]/80' : 'text-[#12494f]/75'}`} data-testid="link-nav-support">Besoin d’aide ?</Link>
          <Link href="/devenir-partenaire" className="group inline-flex items-center gap-2 rounded-full bg-[#df3f91] px-4 py-2.5 text-[12px] font-extrabold text-[#fffaf1] transition-all hover:-translate-y-0.5 hover:bg-[#c92d7c]" data-testid="link-nav-partner">
            Rejoindre JATEK <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className={`grid size-10 place-items-center rounded-full md:hidden ${isHome ? 'bg-white/10' : 'bg-[#12494f]/5'}`} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} data-testid="button-mobile-menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="mx-4 mt-2 rounded-3xl border border-[#12494f]/10 bg-[#fffaf1] p-5 text-[#12494f] shadow-xl md:hidden">
          <nav className="grid gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-bold hover:bg-[#f1e549]/35" data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}</Link>
            ))}
            <Link href="/support" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-bold hover:bg-[#f1e549]/35" data-testid="link-mobile-support">Besoin d’aide ?</Link>
            <Link href="/devenir-partenaire" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-between rounded-2xl bg-[#df3f91] px-4 py-3 text-sm font-extrabold text-white" data-testid="link-mobile-partner">Rejoindre JATEK <ArrowUpRight size={16} /></Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="bg-[#12494f] px-5 pb-7 pt-16 text-[#fffaf1] sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.3fr_.7fr_.7fr_.9fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-[280px] text-sm leading-6 text-[#fffaf1]/65">Le meilleur d’Oujda, livré avec attention. Une adresse après l’autre.</p>
            <div className="mt-7 flex items-center gap-3">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-white/20 transition-colors hover:border-[#f1e549] hover:text-[#f1e549]" aria-label="Instagram" data-testid="link-instagram"><Instagram size={15} /></a>
              <a href="mailto:contact@jatek.app" className="grid size-9 place-items-center rounded-full border border-white/20 transition-colors hover:border-[#f1e549] hover:text-[#f1e549]" aria-label="Email JATEK" data-testid="link-footer-email"><Mail size={15} /></a>
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
              <a href="tel:+212536000000" className="transition-colors hover:text-[#fffaf1]" data-testid="link-footer-phone">+212 5 36 00 00 00</a>
              <a href="mailto:contact@jatek.app" className="transition-colors hover:text-[#fffaf1]" data-testid="link-footer-mail">contact@jatek.app</a>
            </div>
          </div>
          <div>
            <p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#f1e549]">JATEK, c’est</p>
            <p className="mt-5 font-display text-2xl font-bold leading-tight">Oujda d’abord.<br /><span className="text-[#df3f91]">Le Maroc ensuite.</span></p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-[#fffaf1]/45 sm:flex-row">
          <span>© 2024 JATEK. Fait avec soin à Oujda.</span>
          <div className="flex gap-5">
            <Link href="/confidentialite" className="hover:text-[#fffaf1]" data-testid="link-footer-privacy">Confidentialité</Link>
            <Link href="/mentions-legales" className="hover:text-[#fffaf1]" data-testid="link-footer-legal">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Hero() {
  return (
    <section className="hero-grid relative min-h-[760px] overflow-hidden bg-[#12494f] px-5 pb-20 pt-36 text-[#fffaf1] sm:px-8 lg:min-h-[820px]">
      <div className="hero-sun absolute -right-32 -top-44 size-[620px] rounded-full opacity-80" />
      <div className="absolute -bottom-36 -left-40 size-[520px] rounded-full border-[80px] border-[#df3f91]/25" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-8">
        <div className="max-w-[650px]">
          <div className="reveal-up inline-flex items-center gap-2 rounded-full border border-[#f1e549]/40 bg-[#f1e549]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[.17em] text-[#f1e549]">
            <span className="size-1.5 rounded-full bg-[#f1e549]" /> Né à Oujda, pensé pour vous
          </div>
          <h1 className="reveal-up reveal-delay-1 mt-7 max-w-[700px] font-display text-[clamp(3.7rem,8vw,7.9rem)] font-bold leading-[.84] tracking-[-.075em]">Ce que vous aimez.<br /><span className="text-[#f1e549]">À deux rues.</span></h1>
          <p className="reveal-up reveal-delay-2 mt-8 max-w-[470px] text-[17px] leading-7 text-[#fffaf1]/72">JATEK rassemble les bonnes adresses d’Oujda dans une seule app. Un repas, les courses, la pharmacie — commandés simplement, livrés par quelqu’un du quartier.</p>
          <div className="reveal-up reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => document.getElementById('univers')?.scrollIntoView({ behavior: 'smooth' })} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#df3f91] px-6 py-4 text-sm font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-[#c92d7c]" data-testid="button-discover">
              Explorer JATEK <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
            <Link href="/devenir-partenaire" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-6 py-4 text-sm font-bold text-[#fffaf1] transition-colors hover:border-[#f1e549] hover:text-[#f1e549]" data-testid="link-hero-partner">
              Vous êtes commerçant ? <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-4 text-[11px] text-[#fffaf1]/55">
            <span className="flex -space-x-2">
              {['YK', 'SA', 'NA'].map((initials, i) => <span key={initials} className={`grid size-7 place-items-center rounded-full border-2 border-[#12494f] text-[8px] font-extrabold text-[#12494f] ${i === 0 ? 'bg-[#f1e549]' : i === 1 ? 'bg-[#50c5c3]' : 'bg-[#ed5ca0]'}`}>{initials}</span>)}
            </span>
            <span>Déjà adopté par des centaines d’Oujdis</span>
          </div>
        </div>
        <HeroMap />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
    </section>
  );
}

function HeroMap() {
  return (
    <div className="relative mx-auto w-full max-w-[530px] lg:ml-auto">
      <div className="float-a absolute -left-3 top-16 z-10 rounded-2xl border border-[#12494f]/10 bg-[#fffaf1] p-3 text-[#12494f] shadow-[0_20px_50px_rgba(0,0,0,.18)] sm:-left-8">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#f1e549]"><Clock3 size={18} /></span>
          <div><p className="font-mono-jatek text-[9px] uppercase tracking-[.15em] text-[#12494f]/50">Arrivée estimée</p><p className="mt-1 text-sm font-extrabold">24 — 31 min</p></div>
        </div>
      </div>
      <div className="float-b absolute -right-2 bottom-12 z-10 rounded-2xl border border-[#12494f]/10 bg-[#fffaf1] p-3 text-[#12494f] shadow-[0_20px_50px_rgba(0,0,0,.18)] sm:-right-7">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#50c5c3]"><Bike size={18} /></span><div><p className="font-mono-jatek text-[9px] uppercase tracking-[.15em] text-[#12494f]/50">En chemin</p><p className="mt-1 text-sm font-extrabold">Votre commande</p></div></div>
      </div>
      <div className="relative aspect-[.88] overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#e7e7ce] p-4 shadow-[0_30px_90px_rgba(0,0,0,.26)] sm:aspect-square sm:p-6">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(32deg, transparent 45%, #c3caa3 46%, #c3caa3 47%, transparent 48%), linear-gradient(122deg, transparent 42%, #c3caa3 43%, #c3caa3 44%, transparent 45%), linear-gradient(76deg, transparent 70%, #c3caa3 71%, #c3caa3 72%, transparent 73%)', backgroundSize: '140px 140px, 180px 180px, 160px 160px' }} />
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(90deg, transparent 49%, #75866e 50%, transparent 51%), linear-gradient(0deg, transparent 49%, #75866e 50%, transparent 51%)', backgroundSize: '72px 72px' }} />
        <svg viewBox="0 0 500 500" className="relative h-full w-full" aria-label="Carte stylisée du trajet JATEK">
          <path d="M68 376 C 112 315, 145 342, 177 271 S 264 161, 314 213 S 376 301, 440 118" fill="none" stroke="#df3f91" strokeWidth="6" strokeLinecap="round" className="route-line" />
          <path d="M68 376 C 112 315, 145 342, 177 271 S 264 161, 314 213 S 376 301, 440 118" fill="none" stroke="#fffaf1" strokeWidth="2" strokeLinecap="round" opacity=".8" />
          <circle cx="68" cy="376" r="15" fill="#12494f" stroke="#fffaf1" strokeWidth="5" /><circle cx="68" cy="376" r="5" fill="#f1e549" />
          <circle cx="440" cy="118" r="15" fill="#df3f91" stroke="#fffaf1" strokeWidth="5" /><circle cx="440" cy="118" r="5" fill="#fffaf1" />
          <circle cx="250" cy="205" r="9" fill="#50c5c3" stroke="#fffaf1" strokeWidth="4" />
          <text x="42" y="420" fill="#12494f" fontFamily="DM Mono" fontSize="12" fontWeight="500">SIDI YAHYA</text>
          <text x="370" y="89" fill="#12494f" fontFamily="DM Mono" fontSize="12" fontWeight="500">HAY AL QODS</text>
        </svg>
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-[#12494f] px-4 py-3 text-[#fffaf1]">
          <span className="flex items-center gap-2 text-[11px] font-bold"><Navigation size={14} className="text-[#f1e549]" /> Oujda, Maroc</span>
          <span className="font-mono-jatek text-[10px] text-[#fffaf1]/55">34°41′N 1°54′W</span>
        </div>
      </div>
    </div>
  );
}

function MarqueeBand() {
  return (
    <div className="overflow-hidden bg-[#f1e549] py-4 text-[#12494f]">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono-jatek text-[11px] font-bold uppercase tracking-[.17em]">
        {Array.from({ length: 2 }).flatMap((_, set) => ['Oujda en mouvement', 'Livré avec le sourire', 'Les bonnes adresses, au même endroit', 'JATEK — دوزها'].map((item, i) => <span key={`${set}-${i}`} className="flex items-center gap-8">{item}<span className="text-[#df3f91]">◆</span></span>))}
      </div>
    </div>
  );
}

function UniversSection() {
  return (
    <section id="univers" className="bg-[#fffaf1] px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-jatek text-[10px] font-medium uppercase tracking-[.2em] text-[#df3f91]">01 / Tout près, tout de suite</p>
            <h2 className="mt-5 max-w-[690px] font-display text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[.91] tracking-[-.065em] text-[#12494f]">Oujda dans<br /><span className="text-[#df3f91]">votre poche.</span></h2>
          </div>
          <p className="max-w-[330px] text-sm leading-6 text-[#12494f]/60">Pas un catalogue sans âme. Des commerces que vous connaissez, des découvertes à portée de main et une équipe qui connaît vraiment la ville.</p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, detail, icon: Icon, color }, i) => (
            <Link key={name} href="/support" className="category-card group relative min-h-[265px] overflow-hidden rounded-[1.7rem] border border-[#12494f]/10 bg-[#edf0dc] p-6 text-[#12494f] transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(18,73,79,.12)]" data-testid={`card-category-${i}`}>
              <span className={`category-mark grid size-14 place-items-center rounded-2xl ${color}`}><Icon size={25} strokeWidth={1.8} /></span>
              <span className="absolute right-6 top-6 grid size-9 place-items-center rounded-full border border-[#12494f]/15"><ArrowUpRight size={16} className="category-arrow" /></span>
              <div className="absolute bottom-6 left-6 right-5"><p className="font-display text-2xl font-bold tracking-[-.04em]">{name}</p><p className="mt-2 text-xs text-[#12494f]/60">{detail}</p></div>
              <div className="absolute -bottom-16 -right-14 size-40 rounded-full border-[28px] border-[#fffaf1]/40" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: '01', title: 'Choisissez votre envie', detail: 'Parcourez les adresses près de vous, des incontournables aux petites pépites.', icon: Navigation },
    { number: '02', title: 'On prépare avec soin', detail: 'Votre commerce reçoit la commande. Un coursier JATEK se met en route.', icon: Store },
    { number: '03', title: 'Ça arrive chez vous', detail: 'Suivez le trajet et profitez. Oujda n’a jamais été aussi proche.', icon: Route },
  ];
  return (
    <section id="comment" className="bg-[#edf0dc] px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-end gap-10 lg:grid-cols-[.82fr_1.18fr]">
          <div>
            <p className="font-mono-jatek text-[10px] font-medium uppercase tracking-[.2em] text-[#df3f91]">02 / Aussi simple que ça</p>
            <h2 className="mt-5 font-display text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[.9] tracking-[-.07em] text-[#12494f]">Une ville.<br /><span className="text-[#df3f91]">Un geste.</span></h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(({ number, title, detail, icon: Icon }) => (
              <div key={number} className="border-t-2 border-[#12494f]/15 pt-5">
                <div className="flex items-center justify-between"><span className="font-mono-jatek text-xs font-bold text-[#df3f91]">{number}</span><Icon size={20} strokeWidth={1.6} className="text-[#12494f]/60" /></div>
                <h3 className="mt-9 font-display text-xl font-bold leading-tight text-[#12494f]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#12494f]/60">{detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-24 overflow-hidden rounded-[2rem] bg-[#12494f] px-6 py-10 text-[#fffaf1] sm:px-12 md:flex md:items-center md:justify-between">
          <div><p className="font-mono-jatek text-[10px] uppercase tracking-[.17em] text-[#f1e549]">Une promesse locale</p><p className="mt-3 max-w-[600px] font-display text-3xl font-bold leading-tight tracking-[-.04em] sm:text-4xl">La proximité, ce n’est pas une distance.<br /><span className="text-[#50c5c3]">C’est une façon de faire.</span></p></div>
          <div className="mt-8 flex size-24 shrink-0 items-center justify-center rounded-full border border-[#f1e549]/50 md:mt-0"><Leaf size={31} className="text-[#f1e549]" strokeWidth={1.3} /></div>
        </div>
      </div>
    </section>
  );
}

function LocalProof() {
  return (
    <section className="relative overflow-hidden bg-[#df3f91] px-5 py-24 text-[#fffaf1] sm:px-8 lg:py-32">
      <div className="absolute -right-24 -top-24 size-80 rounded-full border-[60px] border-[#f1e549]/30" />
      <div className="absolute -bottom-24 left-[20%] size-64 rounded-full border-[45px] border-[#50c5c3]/25" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div><p className="font-mono-jatek text-[10px] uppercase tracking-[.2em] text-[#f1e549]">03 / C’est chez nous</p><h2 className="mt-5 max-w-[600px] font-display text-[clamp(3rem,6.8vw,6.5rem)] font-bold leading-[.86] tracking-[-.075em]">Le goût du<br /><span className="text-[#f1e549]">coin de rue.</span></h2><p className="mt-8 max-w-[420px] text-base leading-7 text-[#fffaf1]/75">JATEK est né d’une idée simple : les meilleures expériences ne sont pas toujours les plus loin. Elles sont souvent au bout de votre avenue.</p></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="rounded-[1.5rem] bg-[#12494f] p-6 sm:p-8"><MapPin size={22} className="text-[#f1e549]" /><p className="mt-14 font-display text-4xl font-bold tracking-[-.06em] sm:text-5xl">Oujda</p><p className="mt-2 text-xs text-[#fffaf1]/55">notre point de départ</p></div>
            <div className="mt-10 rounded-[1.5rem] bg-[#f1e549] p-6 text-[#12494f] sm:mt-14 sm:p-8"><Users size={22} /><p className="mt-14 font-display text-4xl font-bold tracking-[-.06em] sm:text-5xl">+120</p><p className="mt-2 text-xs text-[#12494f]/60">adresses à découvrir</p></div>
            <div className="rounded-[1.5rem] border border-white/35 p-6 sm:p-8"><Bike size={22} /><p className="mt-14 font-display text-4xl font-bold tracking-[-.06em] sm:text-5xl">24–31</p><p className="mt-2 text-xs text-[#fffaf1]/65">minutes en moyenne</p></div>
            <div className="mt-10 rounded-[1.5rem] bg-[#50c5c3] p-6 text-[#12494f] sm:mt-14 sm:p-8"><BadgeCheck size={22} /><p className="mt-14 font-display text-4xl font-bold tracking-[-.06em] sm:text-5xl">100%</p><p className="mt-2 text-xs text-[#12494f]/65">équipe locale</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return <div className="site-shell noise-overlay"><Header /><main><Hero /><MarqueeBand /><UniversSection /><HowItWorks /><LocalProof /><HomeSupport /><HomeCta /></main><PageFooter /></div>;
}

function HomeSupport() {
  return (
    <section className="bg-[#50c5c3] px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 rounded-[2rem] bg-[#12494f] px-6 py-8 text-[#fffaf1] sm:px-10 md:flex-row md:items-center md:justify-between md:py-10">
        <div>
          <p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#f1e549]">Besoin d’aide ?</p>
          <h2 className="mt-3 max-w-[620px] font-display text-3xl font-bold leading-tight tracking-[-.04em] sm:text-4xl">Une commande, une question, une solution.</h2>
          <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#fffaf1]/65">Le centre de support JATEK vous aide pour vos commandes, vos données et vos demandes de partenariat.</p>
        </div>
        <Link href="/support" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#df3f91] px-6 py-4 text-sm font-extrabold text-white transition-transform hover:-translate-y-1" data-testid="link-home-support">
          Ouvrir le support <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}

function HomeCta() {
  return (
    <section className="bg-[#fffaf1] px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1240px] rounded-[2rem] border border-[#12494f]/15 bg-[#f7f3e7] px-6 py-12 text-center sm:px-12 sm:py-16">
        <Sparkles className="mx-auto text-[#df3f91]" size={25} strokeWidth={1.6} />
        <h2 className="mx-auto mt-5 max-w-[700px] font-display text-[clamp(2.7rem,5vw,5.2rem)] font-bold leading-[.9] tracking-[-.065em] text-[#12494f]">Les bons plans ne<br /><span className="text-[#df3f91]">devraient pas dormir.</span></h2>
        <p className="mx-auto mt-6 max-w-[420px] text-sm leading-6 text-[#12494f]/60">JATEK arrive bientôt sur votre téléphone. Laissez votre email, on vous prévient en premier.</p>
        <WaitlistForm />
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); if (email.trim()) setSent(true); };
  if (sent) return <div className="mx-auto mt-8 flex max-w-[430px] items-center justify-center gap-2 rounded-full bg-[#50c5c3]/25 px-5 py-3 text-sm font-bold text-[#12494f]" data-testid="status-waitlist-success"><Check size={16} /> C’est noté. À très vite dans votre boîte mail.</div>;
  return <form onSubmit={submit} className="mx-auto mt-8 flex max-w-[480px] flex-col gap-2 sm:flex-row"><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="votre@email.ma" className="min-h-12 flex-1 rounded-full border border-[#12494f]/15 bg-[#fffaf1] px-5 text-sm text-[#12494f] outline-none placeholder:text-[#12494f]/35 focus:border-[#df3f91]" aria-label="Votre adresse email" data-testid="input-waitlist-email" /><button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#12494f] px-6 text-sm font-extrabold text-[#fffaf1] transition-transform hover:-translate-y-0.5" data-testid="button-waitlist-submit">Me prévenir <Send size={15} /></button></form>;
}

function SimplePage({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: string; children: ReactNode }) {
  return <div className="site-shell min-h-screen bg-[#fffaf1]"><Header /><main className="px-5 pb-24 pt-36 sm:px-8"><div className="mx-auto max-w-[940px]"><p className="font-mono-jatek text-[10px] uppercase tracking-[.2em] text-[#df3f91]">{eyebrow}</p><h1 className="mt-5 max-w-[820px] font-display text-[clamp(3.4rem,7vw,7rem)] font-bold leading-[.88] tracking-[-.075em] text-[#12494f]">{title}</h1><p className="mt-8 max-w-[650px] text-lg leading-8 text-[#12494f]/65">{intro}</p>{children}<div className="mt-16 flex flex-col gap-5 rounded-[1.7rem] bg-[#edf0dc] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#df3f91]">Une question ?</p><p className="mt-2 font-display text-2xl font-bold tracking-[-.04em] text-[#12494f]">L’équipe JATEK est là pour vous répondre.</p></div><Link href="/support" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#12494f] px-5 py-3 text-sm font-extrabold text-[#fffaf1] transition-transform hover:-translate-y-0.5" data-testid="link-legal-support">Ouvrir le support <ArrowRight size={16} /></Link></div></div></main><PageFooter /></div>;
}

function LegalPage({ privacy = false }: { privacy?: boolean }) {
  return <SimplePage eyebrow={privacy ? '04 / Vos données, vos choix' : '05 / Transparence'} title={privacy ? <>Votre vie privée,<br /><span className="text-[#df3f91]">notre priorité.</span></> : <>Les choses<br /><span className="text-[#df3f91]">claires.</span></>} intro={privacy ? 'Cette politique explique comment JATEK collecte et protège vos données lorsque vous utilisez nos services.' : 'Les informations légales de JATEK, présentées simplement — parce que la confiance commence par la clarté.'}><div className="mt-16 grid gap-8 border-t border-[#12494f]/15 pt-10 md:grid-cols-[190px_1fr]"><aside className="font-mono-jatek text-[10px] uppercase tracking-[.16em] text-[#df3f91]">{privacy ? 'Politique de confidentialité' : 'Mentions légales'}<p className="mt-3 text-[#12494f]/45">Dernière mise à jour<br />12 juin 2024</p></aside><article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:tracking-[-.04em] prose-headings:text-[#12494f] prose-p:text-[#12494f]/65 prose-p:leading-8 prose-li:text-[#12494f]/65">{privacy ? <><h2>1. Qui sommes-nous ?</h2><p>JATEK est une plateforme de mise en relation et de livraison locale, opérée depuis Oujda, au Maroc. Pour toute question liée à vos données, vous pouvez nous écrire à <a href="mailto:confidentialite@jatek.ma">confidentialite@jatek.ma</a>.</p><h2>2. Les données collectées</h2><p>Nous collectons uniquement les informations nécessaires au bon fonctionnement du service : coordonnées de livraison, informations de contact, historique de commandes et échanges avec notre support. Les informations de paiement sont traitées par des prestataires sécurisés et ne sont pas stockées par JATEK.</p><h2>3. Pourquoi les utilisons-nous ?</h2><ul><li>Préparer et livrer vos commandes ;</li><li>Vous contacter au sujet d’une commande ou d’une demande d’aide ;</li><li>Améliorer l’expérience JATEK et la qualité de notre réseau local ;</li><li>Respecter nos obligations légales.</li></ul><h2>4. Vos droits</h2><p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données, ainsi que vous opposer à certains traitements. Écrivez-nous à l’adresse indiquée ci-dessus ; nous vous répondrons dans les délais prévus par la réglementation applicable, notamment la loi 09-08 et les principes du RGPD lorsque celui-ci s’applique.</p><h2>5. Conservation et sécurité</h2><p>Vos données sont conservées pendant la durée nécessaire à la finalité pour laquelle elles ont été collectées, puis supprimées ou anonymisées. Nous mettons en place des mesures techniques et organisationnelles adaptées pour protéger vos informations.</p></> : <><h2>Éditeur du site</h2><p>JATEK est une marque de livraison locale en cours de déploiement à Oujda, Maroc. Le site est édité par JATEK, dont le siège opérationnel est situé à Oujda.</p><h2>Nous contacter</h2><p>Email : <a href="mailto:bonjour@jatek.ma">bonjour@jatek.ma</a><br />Téléphone : <a href="tel:+212536000000">+212 5 36 00 00 00</a></p><h2>Hébergement</h2><p>Le site et ses services numériques sont hébergés par un prestataire technique professionnel, dans des conditions visant à assurer la disponibilité et la sécurité du service.</p><h2>Propriété intellectuelle</h2><p>La marque JATEK, son identité visuelle, ses textes et ses éléments graphiques sont protégés. Toute reproduction ou utilisation sans autorisation préalable est interdite.</p><h2>Crédits</h2><p>Conçu avec soin à Oujda, pour les habitants d’Oujda.</p></>}</article></div></SimplePage>;
}

function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = (event: FormEvent) => { event.preventDefault(); const body = `Bonjour JATEK,\n\nNom : ${form.name}\nEmail : ${form.email}\n\n${form.message}\n\nEnvoyé depuis le centre de support JATEK.`; window.location.href = `mailto:contact@jatek.app?subject=${encodeURIComponent('Support JATEK — demande de contact')}&body=${encodeURIComponent(body)}`; setSent(true); };
  return <div className="site-shell min-h-screen bg-[#fffaf1]"><Header /><main className="px-5 pb-24 pt-36 sm:px-8"><div className="mx-auto max-w-[1240px]"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-mono-jatek text-[10px] uppercase tracking-[.2em] text-[#df3f91]">06 / On est là</p><h1 className="mt-5 font-display text-[clamp(3.5rem,7vw,7rem)] font-bold leading-[.86] tracking-[-.075em] text-[#12494f]">Parlons-nous<br /><span className="text-[#df3f91]">vraiment.</span></h1><p className="mt-8 max-w-[410px] text-lg leading-8 text-[#12494f]/65">Une question sur une commande, une idée à partager ou juste besoin d’un coup de main ? Notre équipe locale vous répond.</p><div className="mt-10 grid gap-3"><a href="mailto:bonjour@jatek.ma" className="flex items-center gap-4 rounded-2xl border border-[#12494f]/12 bg-[#edf0dc] p-4 transition-transform hover:-translate-y-1" data-testid="link-support-email"><span className="grid size-11 place-items-center rounded-xl bg-[#f1e549] text-[#12494f]"><Mail size={19} /></span><span><span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#12494f]/45">Écrivez-nous</span><span className="mt-1 block text-sm font-extrabold text-[#12494f]">bonjour@jatek.ma</span></span><ArrowUpRight size={16} className="ml-auto text-[#df3f91]" /></a><a href="tel:+212536000000" className="flex items-center gap-4 rounded-2xl border border-[#12494f]/12 bg-[#edf0dc] p-4 transition-transform hover:-translate-y-1" data-testid="link-support-phone"><span className="grid size-11 place-items-center rounded-xl bg-[#50c5c3] text-[#12494f]"><Phone size={19} /></span><span><span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#12494f]/45">Appelez-nous</span><span className="mt-1 block text-sm font-extrabold text-[#12494f]">+212 5 36 00 00 00</span></span><ArrowUpRight size={16} className="ml-auto text-[#df3f91]" /></a></div></div><div className="rounded-[2rem] bg-[#12494f] p-6 text-[#fffaf1] sm:p-10"><div className="flex items-center justify-between"><div><p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#f1e549]">Envoyer un message</p><h2 className="mt-3 font-display text-3xl font-bold">On vous écoute.</h2></div><MessageCircle className="text-[#50c5c3]" size={30} strokeWidth={1.3} /></div>{sent ? <div className="mt-12 rounded-2xl bg-[#50c5c3]/20 p-6" data-testid="status-support-success"><Check className="text-[#f1e549]" /><p className="mt-3 font-display text-2xl font-bold">Message bien reçu.</p><p className="mt-2 text-sm leading-6 text-[#fffaf1]/65">Notre équipe revient vers vous rapidement. Merci de faire avancer JATEK avec nous.</p><button type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }} className="mt-5 text-xs font-bold text-[#f1e549] underline underline-offset-4" data-testid="button-support-another">Envoyer un autre message</button></div> : <form onSubmit={submit} className="mt-9 grid gap-5"><label className="grid gap-2 text-xs font-bold text-[#fffaf1]/60">Votre prénom<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="min-h-12 rounded-xl border border-white/15 bg-white/8 px-4 text-sm font-normal text-white outline-none placeholder:text-white/30 focus:border-[#f1e549]" placeholder="Comment peut-on vous appeler ?" data-testid="input-support-name" /></label><label className="grid gap-2 text-xs font-bold text-[#fffaf1]/60">Votre email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="min-h-12 rounded-xl border border-white/15 bg-white/8 px-4 text-sm font-normal text-white outline-none placeholder:text-white/30 focus:border-[#f1e549]" placeholder="vous@exemple.ma" data-testid="input-support-email" /></label><label className="grid gap-2 text-xs font-bold text-[#fffaf1]/60">Votre message<textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="resize-none rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm font-normal text-white outline-none placeholder:text-white/30 focus:border-[#f1e549]" placeholder="Dites-nous tout..." data-testid="input-support-message" /></label><button type="submit" className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#df3f91] text-sm font-extrabold transition-colors hover:bg-[#c92d7c]" data-testid="button-support-submit">Envoyer le message <Send size={15} /></button></form>}</div></div><div className="mt-24 grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#df3f91]">Questions fréquentes</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-.05em] text-[#12494f]">Avant de nous écrire.</h2></div><div className="border-t border-[#12494f]/15">{faqs.map((faq, index) => <div key={faq.question} className="border-b border-[#12494f]/15"><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left font-display text-lg font-bold text-[#12494f]" aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}><span>{faq.question}</span><ChevronDown size={18} className={`shrink-0 text-[#df3f91] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="faq-content max-w-[680px] pb-5 text-sm leading-7 text-[#12494f]/60" data-testid={`text-faq-answer-${index}`}>{faq.answer}</p>}</div>)}</div></div></div></main><PageFooter /></div>;
}

function PartnerPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ business: '', contact: '', phone: '', category: '' });
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return <div className="site-shell min-h-screen bg-[#edf0dc]"><Header /><main className="px-5 pb-24 pt-36 sm:px-8"><div className="mx-auto max-w-[1240px]"><div className="grid items-start gap-14 lg:grid-cols-[1fr_.9fr]"><div><p className="font-mono-jatek text-[10px] uppercase tracking-[.2em] text-[#df3f91]">07 / Pour les pros d’Oujda</p><h1 className="mt-5 max-w-[700px] font-display text-[clamp(3.4rem,7vw,7.3rem)] font-bold leading-[.84] tracking-[-.075em] text-[#12494f]">Votre adresse.<br /><span className="text-[#df3f91]">Plus de monde.</span></h1><p className="mt-8 max-w-[510px] text-lg leading-8 text-[#12494f]/65">Rejoignez le réseau de commerces qui font bouger Oujda. JATEK vous aide à toucher vos voisins, sans changer votre façon de travailler.</p><div className="mt-12 grid max-w-[550px] gap-5 sm:grid-cols-2"><div className="rounded-2xl bg-[#12494f] p-5 text-[#fffaf1]"><Store size={21} className="text-[#f1e549]" /><h3 className="mt-8 font-display text-xl font-bold">Votre vitrine locale</h3><p className="mt-2 text-sm leading-6 text-white/60">Présentez vos spécialités aux personnes qui vivent autour de vous.</p></div><div className="rounded-2xl bg-[#f1e549] p-5 text-[#12494f]"><ArrowUpRight size={21} /><h3 className="mt-8 font-display text-xl font-bold">Plus de commandes</h3><p className="mt-2 text-sm leading-6 text-[#12494f]/65">Une nouvelle façon de servir, avec un accompagnement humain.</p></div></div></div><div className="rounded-[2rem] bg-[#fffaf1] p-6 shadow-[0_20px_60px_rgba(18,73,79,.1)] sm:p-10"><div className="flex items-center justify-between"><div><p className="font-mono-jatek text-[10px] uppercase tracking-[.18em] text-[#df3f91]">Parlons de vous</p><h2 className="mt-3 font-display text-3xl font-bold text-[#12494f]">On commence ici.</h2></div><Store size={30} className="text-[#50c5c3]" strokeWidth={1.4} /></div>{sent ? <div className="mt-10 rounded-2xl bg-[#50c5c3]/20 p-6 text-[#12494f]" data-testid="status-partner-success"><BadgeCheck size={24} className="text-[#df3f91]" /><p className="mt-3 font-display text-2xl font-bold">Demande envoyée.</p><p className="mt-2 text-sm leading-6 text-[#12494f]/65">Merci. Un membre de l’équipe JATEK vous appelle dans les 48 heures pour faire connaissance.</p><button type="button" onClick={() => setSent(false)} className="mt-5 text-xs font-bold text-[#df3f91] underline underline-offset-4" data-testid="button-partner-another">Modifier ma demande</button></div> : <form onSubmit={submit} className="mt-9 grid gap-4"><label className="grid gap-2 text-xs font-bold text-[#12494f]/60">Nom du commerce<input required value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} className="min-h-12 rounded-xl border border-[#12494f]/15 bg-[#edf0dc]/45 px-4 text-sm font-normal text-[#12494f] outline-none placeholder:text-[#12494f]/30 focus:border-[#df3f91]" placeholder="Ex. Le Comptoir d’Oujda" data-testid="input-partner-business" /></label><label className="grid gap-2 text-xs font-bold text-[#12494f]/60">Votre nom<input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="min-h-12 rounded-xl border border-[#12494f]/15 bg-[#edf0dc]/45 px-4 text-sm font-normal text-[#12494f] outline-none placeholder:text-[#12494f]/30 focus:border-[#df3f91]" placeholder="Votre prénom et nom" data-testid="input-partner-contact" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-xs font-bold text-[#12494f]/60">Téléphone<input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="min-h-12 rounded-xl border border-[#12494f]/15 bg-[#edf0dc]/45 px-4 text-sm font-normal text-[#12494f] outline-none placeholder:text-[#12494f]/30 focus:border-[#df3f91]" placeholder="+212 6..." data-testid="input-partner-phone" /></label><label className="grid gap-2 text-xs font-bold text-[#12494f]/60">Catégorie<select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="min-h-12 rounded-xl border border-[#12494f]/15 bg-[#edf0dc]/45 px-3 text-sm font-normal text-[#12494f] outline-none focus:border-[#df3f91]" data-testid="select-partner-category"><option value="">Choisir</option><option>Restaurant</option><option>Épicerie</option><option>Pharmacie</option><option>Beauté</option><option>Autre</option></select></label></div><button type="submit" className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#df3f91] text-sm font-extrabold text-white transition-colors hover:bg-[#c92d7c]" data-testid="button-partner-submit">Proposer mon commerce <ArrowRight size={16} /></button><p className="flex items-center justify-center gap-2 text-center text-[10px] leading-4 text-[#12494f]/45"><LockKeyhole size={12} /> Vos informations restent entre nous.</p></form>}</div></div><div className="mt-24 grid gap-10 border-t border-[#12494f]/15 pt-10 md:grid-cols-3"><div><span className="font-mono-jatek text-xs text-[#df3f91]">01</span><h3 className="mt-4 font-display text-2xl font-bold text-[#12494f]">On fait connaissance</h3><p className="mt-2 text-sm leading-6 text-[#12494f]/60">Un appel court pour comprendre votre commerce et vos envies.</p></div><div><span className="font-mono-jatek text-xs text-[#df3f91]">02</span><h3 className="mt-4 font-display text-2xl font-bold text-[#12494f]">On construit votre vitrine</h3><p className="mt-2 text-sm leading-6 text-[#12494f]/60">Menu, photos, horaires : on s’occupe de vous mettre en valeur.</p></div><div><span className="font-mono-jatek text-xs text-[#df3f91]">03</span><h3 className="mt-4 font-display text-2xl font-bold text-[#12494f]">Vous servez, on livre</h3><p className="mt-2 text-sm leading-6 text-[#12494f]/60">Une équipe locale et un suivi simple, du clic à la porte.</p></div></div></div></main><PageFooter /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><WouterRoute path="/" component={Home} /><WouterRoute path="/confidentialite"><LegalPage privacy /></WouterRoute><WouterRoute path="/mentions-legales"><LegalPage /></WouterRoute><WouterRoute path="/support" component={SupportPage} /><WouterRoute path="/devenir-partenaire" component={PartnerPage} /><WouterRoute component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;