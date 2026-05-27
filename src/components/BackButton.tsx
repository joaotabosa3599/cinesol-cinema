"use client";
import { useRouter } from "next/navigation";

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function BackButton({ onClick, className, ...props }: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer group flex items-center gap-3 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 text-muted hover:text-primary focus:outline-none ${className || ''}`}
      aria-label="Voltar para a página anterior"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-x-1.5"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <span className="relative">
        Voltar

        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
      </span>
    </button>
  );
}