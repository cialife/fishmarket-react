import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Button({ 
  children, 
  href, 
  className = "", 
  type = "button", 
  disabled,
  onClick,
  ...restProps
}: ButtonProps) {
  
  const customClass = `button ${className}`.trim();

  // Jika tombol memiliki 'href', maka jadikan dia sebagai <Link> Next.js
  if (href) {
    return (
      <Link href={href} className={customClass}>
        {children}
      </Link>
    );
  }

  // Jika tidak ada 'href', maka jadikan dia <button> HTML biasa
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
      className={customClass} 
      {...restProps} // Menyebarkan atribut tambahan (seperti disabled, aria-*, dll)
    >
      {children}
    </button>
  );
}
