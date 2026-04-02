'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type View = 'code' | 'visual';

interface ContentLayoutProps {
  title: string;
  subtitle?: string;
  codeView: React.ReactNode;
  visualView: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function ContentLayout({
  title,
  subtitle,
  codeView,
  visualView,
  sidebar,
}: ContentLayoutProps) {
  const t = useTranslations('ContentLayout');
  const [activeView, setActiveView] = useState<View>('visual');

  return (
    // Fills exactly the remaining viewport after the Navbar.
    // Mobile: 100vh - 40px (title bar only, tab bar hidden)
    // Desktop: 100vh - 76px (title bar 40px + tab bar 36px)
    <div className='h-[calc(100vh-40px)] md:h-[calc(100vh-76px)] flex flex-col overflow-hidden'>
      {/* ── Static header ──────────────────────── */}
      <div className='shrink-0 pt-7 pb-5'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6'>
          <p className='font-mono text-accent-purple text-sm mb-2'>
            $ cat ~/{title.toLowerCase()}.json
          </p>
          <h1 className='text-3xl sm:text-4xl font-bold text-text-primary mb-1'>
            {title}
          </h1>
          {subtitle && (
            <p className='text-text-muted text-sm sm:text-base'>{subtitle}</p>
          )}

          {/* Toggle */}
          <div
            className='inline-flex items-center gap-1 p-1 mt-5 rounded-lg bg-bg-elevated border border-bg-border'
            role='tablist'
            aria-label={t('changeView')}
          >
            <button
              role='tab'
              aria-selected={activeView === 'visual'}
              aria-controls='visual-panel'
              id='visual-tab'
              onClick={() => setActiveView('visual')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeView === 'visual'
                  ? 'bg-accent-purple text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <svg
                className='w-3.5 h-3.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                />
              </svg>
              {t('visualView')}
            </button>
            <button
              role='tab'
              aria-selected={activeView === 'code'}
              aria-controls='code-panel'
              id='code-tab'
              onClick={() => setActiveView('code')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeView === 'code'
                  ? 'bg-accent-purple text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <svg
                className='w-3.5 h-3.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                />
              </svg>
              {t('codeView')}
            </button>
          </div>
        </div>
      </div>

      {/* ── Visual panel ───────────────────── */}
      <div
        id='visual-panel'
        role='tabpanel'
        aria-labelledby='visual-tab'
        hidden={activeView !== 'visual'}
        className='flex-1 min-h-0 overflow-y-auto animate-fade-in'
      >
        <div className='max-w-5xl mx-auto px-4 sm:px-6 pb-8'>
          {activeView === 'visual' &&
            (sidebar ? (
              <div className='flex gap-6 items-start'>
                <div className='flex-1 min-w-0'>{visualView}</div>
                {sidebar}
              </div>
            ) : (
              visualView
            ))}
        </div>
      </div>

      {/* ── Code panel — only this scrolls ─────────────────────── */}
      <div
        id='code-panel'
        role='tabpanel'
        aria-labelledby='code-tab'
        hidden={activeView !== 'code'}
        className='flex-1 min-h-0 overflow-y-auto animate-fade-in'
      >
        <div className='max-w-5xl mx-auto px-4 sm:px-6 pb-8'>
          {activeView === 'code' && codeView}
        </div>
      </div>
    </div>
  );
}
