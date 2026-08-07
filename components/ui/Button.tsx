import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  showArrow?: boolean;
  external?: boolean;
  download?: boolean | string;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const variants: Record<string, string> = {
  primary:
    "bg-electric text-white hover:bg-electric-dark shadow-softer hover:shadow-lift",
  secondary:
    "bg-white text-navy border border-line hover:border-electric hover:text-electric",
  ghost: "bg-transparent text-navy hover:text-electric",
  dark: "bg-white text-navy hover:bg-skyline-light",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  showArrow = false,
  external = false,
  download,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl2 px-6 py-3.5 text-sm font-semibold transition-all duration-200 ease-out";
  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    if (download) {
      return (
        <a
          href={href}
          download={download}
          className={classes}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
