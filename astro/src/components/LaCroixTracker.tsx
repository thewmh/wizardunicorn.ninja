import { useLayoutEffect, useState } from 'react';

const CAN_IMAGE = '/assets/img/la-croix.png';
const DAY_MS = 864e5;

function getCansSince(startDate: string): number {
  const d = Math.round((Date.now() - Date.parse(startDate)) / DAY_MS);
  // Subtract non-work days (~2 weekend days per 7)
  const wkd = d - (d / 7 | 0) * 2;
  return wkd * 2;
}

export default function LaCroixTracker() {
  const [cansSince, setCansSince] = useState<number>();

  useLayoutEffect(() => {
    // Run synchronously after paint so hydration is immediate (no flash of "—")
    const count = getCansSince('Sept 3, 2019');
    setCansSince(count);
  }, []);

  if (cansSince === undefined) {
    return null; // SSR renders placeholder — component handles it client-side
  }

  const cans: React.ReactNode[] = [];
  for (let i = 0; i < cansSince && i < 5000; i++) {
    if (i % 6 === 0) {
      const rotation = i % 12 === 0 ? 'rotate(180deg)' : i % 2 === 0 ? 'rotate(12deg)' : 'rotate(-12deg)';
      cans.push(<span key={i} className="c" style={{ transform: rotation }} />);
    } else {
      cans.push(<span key={i} className="c" />);
    }
  }

  return (
    <>
      <style>{`
        #lc-app .count { text-align:center; margin:2rem auto; }
        #lc-app .num { font-size:3rem; font-weight:700; color:var(--accent); }
        #lc-app .lbl { font-size:14px; color:var(--text-muted); margin-top:.25rem; }
        #lc-app .grid { display:flex; flex-wrap:wrap; justify-content:center; gap:6px; max-width:500px; margin:1rem auto 0; min-height:100px; }
        #lc-app .c { width:28px; height:72px; background-image:url('/assets/img/la-croix.png'); background-size:contain; background-repeat:no-repeat; background-position:center; display:inline-block; transform-origin:center; }
      `}</style>
      <div id="lc-app">
        <h2 style={{ fontFamily: 'inherit', fontWeight: 600, color: 'var(--text)', margin: '0 0 16px' }}>La Croix Tracker</h2>
      <div className="count">
        <div className="num">{cansSince.toLocaleString()}</div>
        <div className="lbl">cans consumed since Sept 3, 2019 (2 per work day)</div>
      </div>
        <div className="grid">{cans}</div>
      </div>
    </>
  );
}
