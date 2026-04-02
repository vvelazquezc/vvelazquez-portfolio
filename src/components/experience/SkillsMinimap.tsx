import { useTranslations } from 'next-intl';

interface SkillsData {
  programming: {
    frontend: string;
    styles: string;
    backend: string;
    cloud: string;
    architecture: string;
  };
  design: {
    adobe: string;
    uxui: string;
  };
}

function SectionBadge({ variant }: { variant: 'ts' | 'css' }) {
  if (variant === 'ts') {
    return (
      <span
        className='inline-flex items-center justify-center w-[16px] h-[12px] rounded-[2px] text-[7px] font-bold leading-none text-white shrink-0'
        aria-hidden='true'
      >
        <svg
          className='w-3.5 h-3.5'
          fill='none'
          stroke='#7aa2f7'
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
      </span>
    );
  }
  if (variant === 'css') {
    return (
      <span
        className='inline-flex items-center justify-center w-[16px] h-[12px] rounded-[2px] text-[7px] font-bold leading-none text-white shrink-0'
        aria-hidden='true'
      >
        <svg
          className='w-3.5 h-3.5'
          fill='none'
          stroke='#7aa2f7'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      className='inline-flex items-center justify-center w-[16px] h-[12px] rounded-[2px] text-[7px] font-bold leading-none bg-[#7aa2f7] text-white shrink-0'
      aria-hidden='true'
    >
      #
    </span>
  );
}

function SkillGroup({ label, value }: { label: string; value: string }) {
  const items = value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className='mb-2.5'>
      <p className={`text-[9px] font-mono font-semibold mb-1 text-[#9d7cd8]`}>
        · {label}
      </p>
      <div className='flex flex-wrap gap-x-1.5 gap-y-[3px] pl-2'>
        {items.map((skill) => (
          <span
            key={skill}
            className='text-[8px] font-mono text-[#c3c6d3] leading-[1.4] hover:text-text-muted/90'
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsMinimap() {
  const t = useTranslations('SkillsMinimap');
  const tData = useTranslations('EducationData');
  const skills = tData.raw('skills') as SkillsData;

  return (
    <aside
      className='w-44 shrink-0 hidden lg:block sticky top-0 self-start'
      aria-label='Skills minimap'
    >
      {/* Fake file tab header */}
      <div className='flex items-center gap-1.5 px-2.5 py-1.5 bg-bg-surface border border-bg-border rounded-t-md border-b-0'>
        <span
          className='inline-flex items-center justify-center w-[16px] h-[12px] rounded-[2px] text-[7px] font-bold leading-none bg-[#d4a017] text-[#1a1a1a] shrink-0'
          aria-hidden='true'
        >
          {}
        </span>
        <span className='text-[9px] font-mono text-text-muted/70 truncate'>
          {t('title')}
        </span>
        {/* Fake minimap track */}
        <span
          className='ml-auto w-[3px] h-3 rounded-full bg-accent-purple/30 shrink-0'
          aria-hidden='true'
        />
      </div>

      {/* Minimap body */}
      <div className='bg-[#0d0d0d] border border-bg-border rounded-b-md border-t border-t-bg-border px-2.5 pt-3 pb-2.5 relative overflow-hidden'>
        {/* Faint scanline overlay for minimap texture */}
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)',
            backgroundSize: '100% 2px',
          }}
          aria-hidden='true'
        />

        {/* ── Programming ─────────────────────────── */}
        <div className='mb-3'>
          <div className='flex items-center gap-1.5 mb-2'>
            <SectionBadge variant='ts' />
            <span className='text-[9px] font-mono font-bold text-[#7aa2f7] uppercase tracking-wider'>
              {t('programming')}
            </span>
          </div>

          <SkillGroup
            label={t('frontend')}
            value={skills.programming.frontend}
          />
          <SkillGroup label={t('styles')} value={skills.programming.styles} />
          <SkillGroup label={t('backend')} value={skills.programming.backend} />
          <SkillGroup
            label={t('architecture')}
            value={skills.programming.architecture}
          />
          <SkillGroup
            label={t('cloudTools')}
            value={skills.programming.cloud}
          />
        </div>

        {/* Divider */}
        <div className='border-t border-bg-border/60 mb-3' />

        {/* ── Design ──────────────────────────────── */}
        <div>
          <div className='flex items-center gap-1.5 mb-2'>
            <SectionBadge variant='css' />
            <span className='text-[9px] font-mono font-bold text-[#7aa2f7] uppercase tracking-wider'>
              {t('design')}
            </span>
          </div>

          <SkillGroup label={t('adobe')} value={skills.design.adobe} />
          <SkillGroup label={t('uxui')} value={skills.design.uxui} />
        </div>
      </div>
    </aside>
  );
}
