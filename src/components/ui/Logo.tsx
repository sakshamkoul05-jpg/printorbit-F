import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  dark?: boolean;
}

export default function Logo({ size = 'md', showText = true, dark = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-7 h-7', img: 22 },
    md: { container: 'w-9 h-9', img: 28 },
    lg: { container: 'w-12 h-12', img: 36 },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.container} flex items-center justify-center`}>
        <Image
          src="/logo-printorbit.png"
          alt="PrintOrbit"
          width={s.img}
          height={s.img}
          className="object-contain"
          priority
        />
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
