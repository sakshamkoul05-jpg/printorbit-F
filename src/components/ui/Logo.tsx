import { useId } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  dark?: boolean;
}

export default function Logo({ size = 'md', showText = true, dark = true }: LogoProps) {
  const id = useId();

  const sizes = {
    sm: { container: 'w-7 h-7', svg: 22 },
    md: { container: 'w-9 h-9', svg: 28 },
    lg: { container: 'w-12 h-12', svg: 36 },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.container} flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" width={s.svg} height={s.svg} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-og`} x1="20" y1="0" x2="180" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FF8C00" />
              <stop offset="1" stopColor="#E85D00" />
            </linearGradient>
            <linearGradient id={`${id}-bg`} x1="0" y1="30" x2="160" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#003580" />
              <stop offset="0.5" stopColor="#0078D4" />
              <stop offset="1" stopColor="#00B4E6" />
            </linearGradient>
          </defs>

          {/* Orange outer C-ring */}
          <circle cx="100" cy="100" r="98" fill={`url(#${id}-og)`} />
          {/* White inner area (creates ring thickness) */}
          <circle cx="100" cy="100" r="68" fill="white" />
          {/* White left opening (creates C gap) */}
          <rect x="0" y="22" width="46" height="156" fill="white" />

          {/* Blue P shape with counter cutout */}
          <path
            fillRule="evenodd"
            d="
              M 16 148 L 16 164 L 56 164 L 56 116
              C 118 116 144 98 144 78
              C 144 56 118 34 56 34
              L 26 34 L 26 148 Z
              M 62 54 L 118 54
              A 20 22 0 0 1 118 98
              L 62 98 Z
            "
            fill={`url(#${id}-bg)`}
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`text-lg font-bold font-heading tracking-tight ${dark ? 'text-dark' : 'text-white'}`}>PrintOrbit</span>
          <span className={`text-[8px] uppercase tracking-[0.15em] -mt-0.5 ${dark ? 'text-muted' : 'text-white/40'}`}>India&apos;s Printing Platform</span>
        </div>
      )}
    </div>
  );
}
