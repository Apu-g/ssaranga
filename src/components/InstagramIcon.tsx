export default function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="26" height="26" rx="7" />
      <circle cx="16" cy="16" r="5.5" />
      <circle cx="22.8" cy="9.2" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}