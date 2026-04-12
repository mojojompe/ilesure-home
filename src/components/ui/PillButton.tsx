import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

type Variant = 'mustard' | 'outline-brown' | 'ghost' | 'brown';
type Size = 'sm' | 'md' | 'lg';

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

const sizeMap: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-[15px]',
  lg: 'px-9 py-4 text-base',
};

const variantMap: Record<Variant, string> = {
  mustard: 'btn-mustard',
  'outline-brown': 'btn-outline-brown',
  ghost: 'inline-flex items-center justify-center gap-2 rounded-pill font-semibold text-brown hover:text-mustard transition-colors duration-200 cursor-pointer',
  brown: 'inline-flex items-center justify-center gap-2 rounded-pill font-semibold text-white transition-all duration-200 cursor-pointer bg-brown hover:bg-brown-dark shadow-clay-sm',
};

export function PillButton({
  variant = 'mustard',
  size = 'md',
  children,
  icon,
  iconRight,
  fullWidth = false,
  className = '',
  ...props
}: PillButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${variantMap[variant]} ${sizeMap[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...(props as any)}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </motion.button>
  );
}
