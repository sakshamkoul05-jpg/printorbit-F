import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  dark?: boolean;
}

export default function Logo({ size = 'md', showText = true, dark = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-25 h-25', img: 22 },
    md: { container: 'w-25 h-25', img: 28 },
    lg: { container: 'w-25 h-25', img: 36 },
  };

  const s = sizes[size];

  return (
    <div className="d-flex align-items-center gap-2">
      <div className={`${s.container} d-flex align-items-center justify-content-center`}>
        <Image
          src="/logo-printorbit.png"
          alt="PrintOrbit"
          width={s.img}
          height={s.img}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      {showText && (
        <div className="d-flex flex-column" style={{ lineHeight: 1 }}>
          <span className={`fs-5 fw-bold font-heading ${dark ? 'text-dark' : 'text-white'}`} style={{ letterSpacing: '-0.02em' }}>PrintOrbit</span>
          <span className={`text-uppercase ${dark ? 'text-muted' : 'text-white'}`} style={{ fontSize: '8px', letterSpacing: '0.15em', marginTop: '-2px', opacity: dark ? 1 : 0.4 }}>India&apos;s Printing Platform</span>
        </div>
      )}
    </div>
  );
}
