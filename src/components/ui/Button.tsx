import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'lg';

const BASE =
  'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-orange text-white hover:bg-[#d06422] focus-visible:ring-orange',
  outline: 'border-2 border-orange text-orange hover:bg-orange hover:text-white focus-visible:ring-orange',
  ghost: 'text-charcoal hover:text-orange focus-visible:ring-charcoal',
};

const SIZES: Record<Size, string> = {
  sm: 'px-5 py-2 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  type = 'button',
  disabled,
  target,
  rel,
}: ButtonProps) {
  const classes = [BASE, VARIANTS[variant], SIZES[size], className].join(' ');

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <Link
        href={href}
        className={classes}
        target={target ?? (isExternal ? '_blank' : undefined)}
        rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
