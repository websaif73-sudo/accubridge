// AccuBridge logo — luxury monogram mark.
// A rounded badge with a gold gradient rim carries a clean "AB" ligature,
// paired with a refined wordmark. No visual noise — just mark + words.

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
}

export function Logo({ className = "h-10 w-auto", variant = "dark", showWordmark = true }: LogoProps) {
  const ink = variant === "light" ? "#FFFFFF" : "#0A1F44";
  const sub = variant === "light" ? "rgba(255,255,255,0.65)" : "#5B6577";
  const rimId = "ab-rim";
  const fillId = "ab-fill";
  const letterId = "ab-letter";

  return (
    <svg
      viewBox={showWordmark ? "0 0 360 100" : "0 0 100 100"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="AccuBridge Business Services"
    >
      <defs>
        <linearGradient id={rimId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4D06F" />
          <stop offset="55%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8B6B14" />
        </linearGradient>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#122A5C" />
          <stop offset="100%" stopColor="#0A1F44" />
        </linearGradient>
        <linearGradient id={letterId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4D06F" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>

      {/* Badge */}
      <g transform="translate(8, 8)">
        {/* Outer gold rim */}
        <rect x="0" y="0" width="84" height="84" rx="20" fill={`url(#${rimId})`} />
        {/* Inner royal fill (1.5px inset creates the rim) */}
        <rect x="2.5" y="2.5" width="79" height="79" rx="17.5" fill={`url(#${fillId})`} />

        {/* AB ligature — thick strokes, sharing a middle stem */}
        <g fill="none" stroke={`url(#${letterId})`} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
          {/* A — apex at top center-left */}
          <path d="M 18 62 L 32 22 L 46 62" />
          <path d="M 24 48 L 40 48" />
          {/* B — shares the right leg of A as its spine */}
          <path d="M 46 22 L 46 62" />
          <path d="M 46 22 L 58 22 Q 68 22 68 30 Q 68 38 58 38 L 46 38" />
          <path d="M 46 38 L 60 38 Q 70 38 70 50 Q 70 62 58 62 L 46 62" />
        </g>

        {/* Gold keystone dot above the A apex */}
        <circle cx="32" cy="14" r="2.6" fill="#F4D06F" />
      </g>

      {showWordmark && (
        <g transform="translate(112, 12)">
          <text
            x="0"
            y="44"
            fontFamily="Playfair Display, serif"
            fontWeight="700"
            fontSize="34"
            fill={ink}
            letterSpacing="-0.6"
          >
            AccuBridge
          </text>
          <g transform="translate(2, 60)">
            <line x1="0" y1="0" x2="18" y2="0" stroke="#C9A227" strokeWidth="1.4" />
            <text
              x="24"
              y="4"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              fontSize="8.5"
              letterSpacing="3"
              fill={sub}
            >
              BUSINESS SERVICES (PVT.) LTD.
            </text>
          </g>
          <text
            x="2"
            y="82"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
            fontSize="7.5"
            letterSpacing="4.5"
            fill="#C9A227"
          >
            ACCURACY · CONNECTING · GROWTH
          </text>
        </g>
      )}
    </svg>
  );
}
