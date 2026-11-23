/** Philippine flag — compact SVG mark for location chrome */
export function PhFlag({ className = "", title = "Philippines" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 36 24"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <rect width="36" height="12" fill="#0038A8" />
      <rect y="12" width="36" height="12" fill="#CE1126" />
      <path d="M0 0 L18 12 L0 24 Z" fill="#FFFFFF" />
      <circle cx="6.2" cy="12" r="2.15" fill="#FCD116" />
      {/* Three stars — simplified at triangle points */}
      <circle cx="3.2" cy="5.2" r="0.85" fill="#FCD116" />
      <circle cx="3.2" cy="18.8" r="0.85" fill="#FCD116" />
      <circle cx="12.4" cy="12" r="0.85" fill="#FCD116" />
    </svg>
  );
}
