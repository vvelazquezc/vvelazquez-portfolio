import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      className='min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-16 max-w-5xl mx-auto'
      aria-labelledby='hero-heading'
    >
      <div className='animate-slide-up'>
        {/* Status badge */}
        <div className='inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-bg-elevated border border-bg-border text-xs font-mono text-text-secondary'>
          <span
            className='w-2 h-2 rounded-full bg-code-green animate-pulse'
            aria-hidden='true'
          />
          {t('available')}
        </div>

        {/* Greeting */}
        <p className='font-mono text-accent-purple text-sm sm:text-base mb-2'>
          $ whoami
        </p>

        {/* Name */}
        <h1
          id='hero-heading'
          className='text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4'
        >
          <span className='text-text-primary'>Verónica</span>
          <br />
          <span className='gradient-text'>Velázquez</span>
        </h1>

        {/* Title */}
        <p className='text-lg sm:text-2xl text-text-secondary font-light mb-6 max-w-xl'>
          {t('subtitle')}
        </p>

        {/* Description */}
        <p className='text-text-muted leading-relaxed max-w-2xl mb-10 text-sm sm:text-base'>
          {t('description')}
        </p>

        {/* CTAs */}
        <div className='flex flex-wrap gap-4'>
          <Link
            href='/experience'
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-purple hover:bg-accent-purple-dim text-white text-sm font-medium transition-colors'
          >
            {t('viewExperience')}
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
          <Link
            href='/contact'
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-bg-border hover:border-accent-purple/50 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors'
          >
            {t('contact')}
          </Link>
        </div>

        {/* Tech stack hint */}
        <div
          className='mt-16 flex flex-wrap gap-2'
          aria-label='Stack principal'
        >
          {['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS'].map(
            (tech) => (
              <span key={tech} className='tag'>
                {tech}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
