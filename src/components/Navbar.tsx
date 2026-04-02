'use client';

import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

type FileType = 'js' | 'ts' | 'json' | 'css';

const fileTypeConfig: Record<
  FileType,
  { bg: string; textColor: string; label: string; topBorder: string }
> = {
  js: {
    bg: 'bg-[#f0db4f]',
    textColor: 'text-[#1a1a1a]',
    label: 'JS',
    topBorder: 'border-t-[#f0db4f]',
  },
  ts: {
    bg: 'bg-[#3178c6]',
    textColor: 'text-white',
    label: 'TS',
    topBorder: 'border-t-[#3178c6]',
  },
  json: {
    bg: 'bg-[#d4a017]',
    textColor: 'text-[#1a1a1a]',
    label: 'JSON',
    topBorder: 'border-t-[#d4a017]',
  },
  css: {
    bg: 'bg-[#2965f1]',
    textColor: 'text-white',
    label: 'CSS',
    topBorder: 'border-t-[#2965f1]',
  },
};

function FileIcon({ type }: { type: FileType }) {
  const { bg, textColor, label } = fileTypeConfig[type];
  return (
    <span
      className={`inline-flex items-center justify-center w-[18px] h-[13px] rounded-[2px] text-[8px] font-bold leading-none tracking-tight shrink-0 ${bg} ${textColor} px-3`}
      aria-hidden='true'
    >
      {label}
    </span>
  );
}

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const tabs = [
    {
      href: '/',
      filename: 'home.js',
      fileType: 'js' as FileType,
      label: t('home'),
    },
    {
      href: '/experience',
      filename: 'experience.ts',
      fileType: 'ts' as FileType,
      label: t('experience'),
    },
    {
      href: '/education',
      filename: 'education.json',
      fileType: 'json' as FileType,
      label: t('education'),
    },
    {
      href: '/contact',
      filename: 'contact.css',
      fileType: 'css' as FileType,
      label: t('contact'),
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const switchLocale = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50'>
      {/* ── Title bar ─────────────────────────────────────────────── */}
      <div
        className={`border-b border-bg-border transition-all duration-300 ${
          scrolled
            ? 'bg-bg-base/95 backdrop-blur-md'
            : 'bg-bg-base/80 backdrop-blur-sm'
        }`}
      >
        <div className='max-w-5xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between'>
          {/* Logo */}
          <Link
            href='/'
            className='font-mono text-sm font-semibold text-text-primary hover:text-accent-purple transition-colors'
            aria-label={t('home')}
          >
            <span className='text-accent-purple'>~/</span>
            <span>vvelazquez</span>
            <span className='inline-block w-2 h-4 bg-accent-purple ml-0.5 animate-blink align-middle' />
          </Link>

          {/* Right: lang switcher + mobile hamburger */}
          <div className='flex items-center gap-2'>
            <button
              onClick={switchLocale}
              className='px-2 py-0.5 text-[11px] font-mono font-semibold border border-bg-border rounded text-text-muted hover:text-text-primary hover:border-accent-purple/40 transition-colors'
              aria-label={t('langSwitch')}
            >
              {locale === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Mobile hamburger */}
            <button
              className='md:hidden p-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors'
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls='mobile-menu'
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            >
              <span className='sr-only'>
                {menuOpen ? t('closeMenu') : t('openMenu')}
              </span>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                {menuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── VS Code tab bar — desktop only ────────────────────────── */}
      <div className='max-w-5xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between'>
        <nav
          className='hidden md:block bg-bg-surface border-b border-bg-border'
          aria-label={t('mainNav')}
        >
          <div className='flex items-end'>
            {tabs.map(({ href, filename, fileType, label }) => {
              const active = pathname === href;
              const { topBorder } = fileTypeConfig[fileType];
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  aria-label={label}
                  className={[
                    'relative flex items-center gap-2 px-4 h-9 text-xs font-mono whitespace-nowrap',
                    'border-r border-bg-border transition-colors select-none',
                    active
                      ? `bg-bg-base text-text-primary border-t-2 ${topBorder} -mb-px`
                      : 'bg-bg-surface text-text-muted border-t-2 border-t-transparent hover:bg-bg-elevated hover:text-text-secondary',
                  ]
                    .join(' ')
                    .trim()}
                >
                  <FileIcon type={fileType} />
                  <span>{filename}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* ── Mobile dropdown ───────────────────────────────────────── */}
      {menuOpen && (
        <div
          id='mobile-menu'
          className='md:hidden bg-bg-surface border-b border-bg-border'
        >
          <ul
            className='max-w-5xl mx-auto px-4 py-2 flex flex-col gap-0.5'
            role='list'
          >
            {tabs.map(({ href, filename, fileType, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded text-xs font-mono transition-colors ${
                      active
                        ? 'bg-bg-elevated text-text-primary'
                        : 'text-text-muted hover:bg-bg-elevated hover:text-text-secondary'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <FileIcon type={fileType} />
                    <span>{filename}</span>
                    <span className='ml-auto text-text-muted/50 text-[11px]'>
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
