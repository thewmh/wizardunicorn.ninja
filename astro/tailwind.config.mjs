/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['DM Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        code: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        'space-1': '0.25rem',
        'space-2': '0.5rem',
        'space-3': '0.75rem',
        'space-4': '1rem',
        'space-6': '1.5rem',
        'space-8': '2rem',
        'space-12': '3rem',
        'space-16': '4rem',
        'space-20': '5rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-links-hover': 'var(--accent-hover)',
            '--tw-prose-underline': 'var(--accent)',
            '--tw-prose-code': 'var(--text)',
            '--tw-prose-bold': 'var(--text)',
            '--tw-prose-counters': 'var(--text-muted)',
            '--tw-prose-bullets': 'var(--text-muted)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-quotes': 'var(--text)',
            '--tw-prose-quote-borders': 'var(--border)',
            '--tw-prose-pre-bg': 'var(--code-block-bg)',
            '--tw-prose-pre-code': 'var(--text)',
            '--tw-prose-figcaption': 'var(--text-muted)',
            color: 'var(--text)',
            a: {
              color: 'var(--accent)',
              '&:hover': {
                color: 'var(--accent-hover)',
              },
            },
            code: {
              color: 'var(--text)',
              backgroundColor: 'var(--code-bg)',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'h1, h2, h3, h4': {
              color: 'var(--text)',
            },
            blockquote: {
              borderLeftColor: 'var(--border)',
              color: 'var(--text-muted)',
            },
            'ol > li::marker': {
              color: 'var(--text-muted)',
            },
            'ul > li::marker': {
              color: 'var(--text-muted)',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
