'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X, UserRound, UsersRound, Building2 } from 'lucide-react';
import { Brand, Consultation, useHydrated } from './shared-ui';
import { categories } from '@/lib/service-catalog';
import { categoryIcons } from './catalog-icons';

export const solutionLinks = [
  { href: '/solutions/solo', label: '一人公司', note: '讓 AI 成為你的日常助手', icon: UserRound },
  { href: '/solutions/sme', label: '中小企業', note: '接通流程，讓團隊掌握技術', icon: UsersRound },
  { href: '/solutions/enterprise', label: '企業團隊', note: '從治理到部署，穩健擴展', icon: Building2 },
];

type ConsultPrefill = { message?: string; service?: string };
const ConsultationContext = createContext<{ openConsult: (prefill?: ConsultPrefill) => void } | null>(null);
export function useConsultation() {
  const value = useContext(ConsultationContext);
  if (!value) throw new Error('Consultation must be used within SiteShell');
  return value;
}
export function ConsultButton({ children = '預約免費諮詢', className = 'button button-primary' }: { children?: ReactNode; className?: string }) {
  const { openConsult } = useConsultation();
  const ready = useHydrated();
  return <button disabled={!ready} className={className} onClick={() => openConsult()}>{children}<ArrowUpRight size={17} /></button>;
}

function ServicesMegaMenu({ pathname, close }: { pathname: string; close: () => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(categories[0].slug);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeCategory = categories.find(category => category.slug === active) ?? categories[0];
  const servicesActive = pathname.startsWith('/services');
  return <div className="services-mega" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    <button ref={triggerRef} className={`nav-trigger ${servicesActive ? 'active' : ''}`} aria-expanded={open} aria-controls="services-mega-panel" onClick={() => setOpen(value => !value)}>服務<ChevronDown size={13} /></button>
    <div id="services-mega-panel" className={`services-mega-panel ${open ? 'is-open' : ''}`} hidden={!open} aria-label="服務選單">
      <div className="mega-panel-inner">
        <div className="mega-left">
          <p className="mega-heading">服務分類<span>SERVICE CATEGORIES</span></p>
          {categories.map(category => { const Icon = categoryIcons[category.icon]; return <button key={category.slug} className={active === category.slug ? 'is-active' : ''} onMouseEnter={() => setActive(category.slug)} onFocus={() => setActive(category.slug)} onClick={() => { close(); router.push(`/services/${category.slug}`); }}><span className="mega-left-icon"><Icon size={17} strokeWidth={1.5} /></span><span>{category.title}</span><ArrowRight size={14} /></button>; })}
          <Link href="/services" className="mega-all" onClick={close}>查看全部服務介紹<ArrowUpRight size={15} /></Link>
          <Link href="/choose-service" className="mega-choose" onClick={close}>選擇我們的服務<ArrowUpRight size={15} /></Link>
        </div>
        <div className="mega-right">
          <p className="mega-heading">{activeCategory.title}<span>{activeCategory.english}</span></p>
          {activeCategory.services.map(service => <Link key={service.slug} href={`/services/${activeCategory.slug}/${service.slug}`} onClick={close}><span><strong>{service.title}</strong><small>{service.english}</small></span><ArrowUpRight size={15} /></Link>)}
          <Link href={`/services/${activeCategory.slug}`} className="mega-all" onClick={close}>查看「{activeCategory.title}」全部<ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </div>
  </div>;
}

function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const ready = useHydrated();
  const mobileButton = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDetailsElement>(null);
  const header = useRef<HTMLElement>(null);
  const closeMenus = () => { setMobileOpen(false); if (dropdown.current) dropdown.current.open = false; };
  useEffect(() => {
    const pointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) { if (dropdown.current) dropdown.current.open = false; setMobileOpen(false); }
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (dropdown.current?.open) { dropdown.current.open = false; dropdown.current.querySelector('summary')?.focus(); }
      if (mobileOpen) { setMobileOpen(false); mobileButton.current?.focus(); }
    };
    const media = window.matchMedia('(min-width: 701px)');
    const resize = () => { if (media.matches) setMobileOpen(false); else if (dropdown.current) dropdown.current.open = false; };
    document.addEventListener('pointerdown', pointer);
    document.addEventListener('keydown', keyboard);
    media.addEventListener('change', resize);
    return () => { document.removeEventListener('pointerdown', pointer); document.removeEventListener('keydown', keyboard); media.removeEventListener('change', resize); };
  }, [mobileOpen]);
  const current = (href: string) => pathname === href ? 'page' as const : undefined;
  return <header ref={header} className="site-header multipage-header"><div className="container header-inner"><Brand /><nav className="desktop-nav page-navigation" aria-label="主選單"><Link href="/" aria-current={current('/')} className={pathname === '/' ? 'active' : ''} onClick={closeMenus}>首頁</Link><details className="solution-dropdown" ref={dropdown}><summary className={pathname.startsWith('/solutions/') ? 'current-solution' : ''}>解決方案<ChevronDown size={13} /></summary><div className="solution-menu"><p>找到適合你的起點<span>SOLUTIONS FOR YOU</span></p>{solutionLinks.map(item => <Link key={item.href} href={item.href} aria-current={current(item.href)} onClick={closeMenus}><span className="nav-solution-icon"><item.icon size={20} strokeWidth={1.5} /></span><span><strong>{item.label}</strong><small>{item.note}</small></span><ArrowUpRight size={15} /></Link>)}<div className="solution-menu-foot">不同規模，同樣從你的問題出發。</div></div></details><ServicesMegaMenu pathname={pathname} close={closeMenus} /></nav><div className="header-actions"><ConsultButton className="header-consult nav-booking" /><button ref={mobileButton} disabled={!ready} className="menu-toggle icon-button" aria-label={mobileOpen ? '關閉選單' : '開啟選單'} aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button></div></div><nav id="mobile-menu" className={`mobile-nav multipage-mobile ${mobileOpen ? 'is-open' : ''}`} aria-label="流動版選單" inert={!mobileOpen}><Link href="/" aria-current={current('/')} onClick={closeMenus}>首頁<ArrowUpRight size={15} /></Link><p className="mobile-group-label">解決方案 <span>SOLUTIONS</span></p>{solutionLinks.map(item => <Link key={item.href} href={item.href} aria-current={current(item.href)} onClick={closeMenus}><span><item.icon size={16} />{item.label}</span><ArrowUpRight size={15} /></Link>)}<p className="mobile-group-label">服務 <span>SERVICES</span></p><Link href="/services" aria-current={current('/services')} onClick={closeMenus}>服務介紹<ArrowUpRight size={15} /></Link><Link href="/choose-service" aria-current={current('/choose-service')} onClick={closeMenus}>選擇我們的服務<ArrowUpRight size={15} /></Link>{categories.map(category => <details className="mobile-category" key={category.slug}><summary><span className="mobile-category-icon">{(() => { const Icon = categoryIcons[category.icon]; return <Icon size={15} strokeWidth={1.5} />; })()}</span>{category.title}<ChevronDown size={14} /></summary><div className="mobile-category-list"><Link href={`/services/${category.slug}`} onClick={closeMenus}>查看{category.title}全部</Link>{category.services.map(service => <Link key={service.slug} href={`/services/${category.slug}/${service.slug}`} onClick={closeMenus}>{service.title}</Link>)}</div></details>)}<div className="mobile-consult-row"><ConsultButton className="button button-primary mobile-consult" /></div></nav><noscript><nav className="noscript-navigation" aria-label="無 JavaScript 導覽"><Link href="/">首頁</Link><Link href="/solutions/solo">一人公司</Link><Link href="/solutions/sme">中小企業</Link><Link href="/solutions/enterprise">企業團隊</Link><Link href="/services">服務介紹</Link><Link href="/choose-service">選擇我們的服務</Link></nav></noscript></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div className="footer-brand"><Brand /><p>讓科技，成為你的成長力。</p><span>香港 · 專注企業級數位化解決方案</span></div><div className="footer-column"><h3>解決方案</h3>{solutionLinks.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div><div className="footer-column"><h3>服務與合作</h3><Link href="/services">服務介紹</Link><Link href="/choose-service">選擇我們的服務</Link><Link href="/services#delivery">交付與支援</Link><Link href="/solutions/sme#engagement">合作方式</Link></div><div className="footer-column"><h3>認識實瀚</h3><Link href="/#about">關於我們</Link><Link href="/services#faq">常見問題</Link><ConsultButton className="footer-contact" /></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} 實瀚科技 Hangs Technology. All rights reserved.</span><span className="footer-motto"><span className="online-dot" />BUILT WITH PURPOSE.</span><a href="#main">回到頂部<ArrowUpRight size={13} /></a></div></div></footer>;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [consultOpen, setConsultOpen] = useState(false);
  const [consultPrefill, setConsultPrefill] = useState<ConsultPrefill>();
  const openConsult = (prefill?: ConsultPrefill) => { setConsultPrefill(prefill); setConsultOpen(true); };
  return <ConsultationContext.Provider value={{ openConsult }}><Header key={pathname} />{children}<Footer />{consultOpen && <Consultation prefill={consultPrefill} onClose={() => setConsultOpen(false)} />}</ConsultationContext.Provider>;
}
