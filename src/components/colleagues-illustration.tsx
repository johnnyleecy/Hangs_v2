export default function ColleaguesIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <g id="worker">
          <circle cx="0" cy="0" r="9" fill="#009c6f" />
          <rect x="-8" y="9" width="16" height="22" rx="8" fill="#009c6f" />
        </g>
      </defs>

      {/* 屏幕 */}
      <rect x="20" y="18" width="372" height="216" rx="16" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
      <path d="M20 52 h372" stroke="#e5e7eb" strokeWidth="2" />
      <circle cx="42" cy="35" r="5" fill="#16a34a" />
      <circle cx="60" cy="35" r="5" fill="#e5e7eb" />
      <circle cx="78" cy="35" r="5" fill="#e5e7eb" />

      {/* 支架 */}
      <rect x="176" y="234" width="60" height="14" rx="4" fill="#0f172a" />
      <rect x="146" y="248" width="120" height="9" rx="4.5" fill="#0f172a" />

      {/* 屏幕內 10 個一模一樣嘅同事（2 行 × 5） */}
      <use href="#worker" x="80" y="96" />
      <use href="#worker" x="140" y="96" />
      <use href="#worker" x="200" y="96" />
      <use href="#worker" x="260" y="96" />
      <use href="#worker" x="320" y="96" />
      <use href="#worker" x="80" y="176" />
      <use href="#worker" x="140" y="176" />
      <use href="#worker" x="200" y="176" />
      <use href="#worker" x="260" y="176" />
      <use href="#worker" x="320" y="176" />

      {/* 屏外嗰個人飲咖啡 */}
      <g transform="translate(436, 230)">
        <rect x="-16" y="14" width="32" height="6" rx="3" fill="#0f172a" />
        <circle cx="0" cy="-22" r="11" fill="#0f172a" />
        <rect x="-9" y="-12" width="18" height="24" rx="9" fill="#0f172a" />
        <rect x="14" y="-8" width="14" height="16" rx="3" fill="#16a34a" />
        <path d="M28 -4 h7 a4 4 0 0 1 0 8 h-7" stroke="#16a34a" strokeWidth="2.5" fill="none" />
        <path d="M18 -14 q3 -4 0 -8 M25 -14 q3 -4 0 -8" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
