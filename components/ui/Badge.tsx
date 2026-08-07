export default function Badge({
  children,
  active = false,
  onClick,
  as = "span",
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  as?: "span" | "button";
}) {
  const classes = `inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
    active
      ? "border-electric bg-electric text-white"
      : "border-line bg-white text-navy-soft hover:border-electric hover:text-electric"
  }`;

  if (as === "button") {
    return (
      <button type="button" onClick={onClick} className={classes} aria-pressed={active}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
