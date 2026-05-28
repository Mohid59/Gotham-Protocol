// Accurate modern wide-wing Batman emblem.
// Only the right half is drawn, then mirrored via matrix(-1 0 0 1 512 0)
// so x -> 512 - x. Guarantees perfect symmetry along the x=256 seam.
const HALF =
  "M256 58 " +
  "C 258 46 266 46 270 50 " +
  "L 280 26 " +
  "C 286 46 291 58 295 68 " +
  "C 302 61 311 61 322 63 " +
  "C 384 57 444 66 500 94 " +
  "C 503 96 504 100 501 106 " +
  "C 485 105 475 117 470 124 " +
  "C 468 108 459 106 453 118 " +
  "C 449 132 439 134 431 125 " +
  "C 427 111 418 111 412 124 " +
  "C 408 140 396 142 388 131 " +
  "C 384 119 375 121 369 132 " +
  "C 363 152 345 156 327 151 " +
  "C 307 147 294 158 286 174 " +
  "C 278 188 267 198 256 212 " +
  "Z";

export default function BatSymbol({ className = "", title }) {
  return (
    <svg
      viewBox="0 0 512 224"
      className={className}
      fill="currentColor"
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      <g>
        <path d={HALF} />
        <path d={HALF} transform="matrix(-1 0 0 1 512 0)" />
      </g>
    </svg>
  );
}
