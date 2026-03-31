interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 ${alignClasses}`}>
      <h2
        className="font-black text-4xl md:text-5xl leading-tight text-charcoal"
        style={{ fontFamily: "'Satoshi', sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-charcoal/60 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
