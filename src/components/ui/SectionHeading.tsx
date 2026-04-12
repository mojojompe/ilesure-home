

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center px-4 py-1.5 rounded-pill text-xs font-bold uppercase tracking-widest text-mustard-dark bg-mustard-50 border border-mustard-200 self-start">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-brown leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-brown-light text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
