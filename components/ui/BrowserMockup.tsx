import { ReactNode } from "react";

export default function BrowserMockup({
  children,
  url = "yourproject.com",
  href,
  className = "",
}: {
  children: ReactNode;
  url?: string;
  href?: string;
  className?: string;
}) {
  const addressClass =
    "ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-xs text-navy-soft/60 border border-line";

  return (
    <div
      className={`overflow-hidden rounded-xl3 border border-line bg-white shadow-soft ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-base-off px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`${addressClass} transition-colors hover:text-electric`}
          >
            {url}
          </a>
        ) : (
          <div className={addressClass}>{url}</div>
        )}
      </div>
      <div className="bg-base-off">{children}</div>
    </div>
  );
}
