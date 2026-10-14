/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--fg)',
        surface: 'var(--surface)',
        'surface-warm': 'var(--surface-warm)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        success: 'var(--success)',
        warn: 'var(--warn)',
        danger: 'var(--danger)',
        medkeNavy: '#243181',
        medkeBlue: '#0047FF',
        medkeBlueHover: '#0038CC',
        medkeSoft: '#EBF2FF',
        medkeGreen: '#0E8345',
        medkeMuted: '#64748B',
      },
      boxShadow: {
        'glow-cta': '0 10px 25px -5px rgba(0, 71, 255, 0.4)',
        'card-subtle': '0 8px 30px rgba(15, 23, 42, 0.08)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [],
};
