import { useState, useEffect } from 'react';

const themes = [
  { name: 'wizard', className: 'light', icon: '🧙‍♂️', label: 'Wizard (Light)' },
  { name: 'unicorn', className: 'colorful', icon: '🦄', label: 'Unicorn (Colorful)' },
  { name: 'ninja', className: 'dark', icon: '🥷', label: 'Ninja (Dark)' },
];

function getThemeIndex(): number {
  const dataTheme = document.documentElement.getAttribute('data-theme');
  const index = themes.findIndex(t => t.className === dataTheme);
  return index >= 0 ? index : -1;
}

export default function ThemeSwitcher() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const index = getThemeIndex();
    if (index >= 0) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(0);
    }
  }, []);

  useEffect(() => {
    if (currentIndex === null) return;
    document.documentElement.setAttribute('data-theme', themes[currentIndex].className);
    localStorage.setItem('theme', themes[currentIndex].name);
  }, [currentIndex]);

  return (
    <div className="theme-switcher flex items-center gap-1" role="radiogroup" aria-label="Theme selector">
      {themes.map((theme, index) => (
        <button
          key={theme.name}
          className={`theme-btn ${index === currentIndex ? 'active' : ''}`}
          onClick={() => setCurrentIndex(index)}
          aria-label={theme.label}
          aria-pressed={index === currentIndex}
          role="radio"
          tabIndex={0}
          title={theme.label}
        >
          <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{theme.icon}</span>
        </button>
      ))}
    </div>
  );
}
