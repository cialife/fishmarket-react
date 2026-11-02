import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode; // Isi dari tombol (teks atau icon)
  href?: string;             // Jika ada, tombol akan menjadi Link
  onClick?: () => void;      // Jika ada, tombol akan menjalankan fungsi saat diklik
  className?: string;        // Tambahan class CSS jika diperlukan
  type?: "button" | "submit" | "reset"; // Berguna untuk form order nanti
}

export default function Button({ children, href, onClick, className = "", type = "button" }: ButtonProps) {
  
  // Menggabungkan class bawaan ".button" dari globals.css dengan class tambahan
  const customClass = `button ${className}`.trim();

  // 1. Jika tombol memiliki 'href', maka jadikan dia sebagai <Link> Next.js
  if (href) {
    return (
      <Link href={href} className={customClass}>
        {children}
      </Link>
    );
  }

  // 2. Jika tidak ada 'href', maka jadikan dia <button> HTML biasa
  return (
    <button type={type} onClick={onClick} className={customClass}>
      {children}
    </button>
  );
}