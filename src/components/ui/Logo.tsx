interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  dark?: boolean;
}

export default function Logo({ size = 'md', showText = true, dark = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-7 h-7', svg: 22 },
    md: { container: 'w-9 h-9', svg: 28 },
    lg: { container: 'w-12 h-12', svg: 36 },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.container} rounded-lg flex items-center justify-center`}>
        <svg viewBox="0 0 40 40" width={s.svg} height={s.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 4C11.163 4 4 11.163 4 20s7.163 16 16 16c2.43 0 4.75-.546 6.84-1.525C21.16 35.16 17 30.12 17 24.5c0-6.904 5.596-12.5 12.5-12.5.584 0 1.156.04 1.714.115C29.595 7.73 25.097 4 20 4z"
            fill="url(#orange-grad)"
          />
          <path
            d="M18 11h7.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5H18V11z"
            fill="url(#blue-grad)"
          />
          <defs>
            <linearGradient id="orange-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7A00" />
              <stop offset="1" stopColor="#FF5500" />
            </linearGradient>
            <linearGradient id="blue-grad" x1="18" y1="11" x2="33" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C2FF" />
              <stop offset="1" stopColor="#0090FF" />
            </linearGradient>
          </defs>
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
