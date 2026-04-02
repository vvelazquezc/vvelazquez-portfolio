'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Token = {
  type: 'key' | 'string' | 'number' | 'punctuation';
  value: string;
};

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  let rest = line;

  while (rest.length > 0) {
    const keyMatch = rest.match(/^("[\w\s&.\/]+")(\s*:)/);
    if (keyMatch) {
      tokens.push({ type: 'key', value: keyMatch[1] });
      tokens.push({ type: 'punctuation', value: keyMatch[2] });
      rest = rest.slice(keyMatch[0].length);
      continue;
    }
    const strMatch = rest.match(/^"([^"]*)"/);
    if (strMatch) {
      tokens.push({ type: 'string', value: `"${strMatch[1]}"` });
      rest = rest.slice(strMatch[0].length);
      continue;
    }
    const numMatch = rest.match(/^\d+(\.\d+)?/);
    if (numMatch) {
      tokens.push({ type: 'number', value: numMatch[0] });
      rest = rest.slice(numMatch[0].length);
      continue;
    }
    tokens.push({ type: 'punctuation', value: rest[0] });
    rest = rest.slice(1);
  }
  return tokens;
}

const colorMap: Record<Token['type'], string> = {
  key: 'text-code-key',
  string: 'text-code-string',
  number: 'text-code-yellow',
  punctuation: 'text-text-muted',
};

export default function EducationCodeView() {
  const t = useTranslations('EducationPage');
  const tData = useTranslations('EducationData');
  const [wrap, setWrap] = useState(false);

  const items = tData.raw('items');
  const json = JSON.stringify({ education: items }, null, 2);
  const lines = json.split('\n');

  return (
    <div className='card overflow-hidden'>
      <div className='flex items-center gap-2 px-4 py-3 bg-bg-surface border-b border-bg-border'>
        <span className='w-3 h-3 rounded-full bg-[#ff5f57]' aria-hidden='true' />
        <span className='w-3 h-3 rounded-full bg-[#febc2e]' aria-hidden='true' />
        <span className='w-3 h-3 rounded-full bg-[#28c840]' aria-hidden='true' />
        <span className='ml-2 text-text-muted text-xs font-mono'>education.json</span>
        <button
          onClick={() => setWrap((v) => !v)}
          aria-pressed={wrap}
          title='Toggle word wrap (Alt+Z)'
          className={`ml-auto flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono transition-colors ${
            wrap
              ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/40'
              : 'text-text-muted border border-bg-border hover:text-text-secondary hover:border-text-muted/40'
          }`}
        >
          <span aria-hidden='true'>↵</span>
          Wrap
        </button>
      </div>

      <pre
        className={`p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed ${
          wrap ? 'overflow-x-hidden' : 'overflow-x-auto'
        }`}
        aria-label={t('codeAriaLabel')}
      >
        <code>
          {lines.map((line, i) => (
            <div key={i} className={`flex ${wrap ? 'flex-wrap' : ''}`}>
              <span
                className='select-none w-8 sm:w-10 shrink-0 text-right pr-3 text-text-muted/40 text-xs leading-5'
                aria-hidden='true'
              >
                {i + 1}
              </span>
              <span className={wrap ? 'break-all whitespace-pre-wrap flex-1 min-w-0' : 'whitespace-pre'}>
                {tokenize(line).map((token, j) => (
                  <span key={j} className={colorMap[token.type]}>
                    {token.value}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
