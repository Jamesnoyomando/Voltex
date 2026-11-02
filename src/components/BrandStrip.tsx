function AppleGlyph() {
  return (
    <svg
      viewBox="0 0 384 512"
      aria-hidden="true"
      className="h-[18px] w-auto shrink-0"
      fill="currentColor"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}

const wordmark = 'inline-flex items-center gap-1.5 text-foreground'

export function BrandStrip() {
  return (
    <div className="mt-6">
      <p className="text-center text-sm text-foreground/70">
        Genuine stock from the makers you already know
      </p>
      <div
        aria-label="Brands stocked at Voltix"
        className="mt-4 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 opacity-80 grayscale"
      >
        <span className={wordmark}>
          <AppleGlyph />
          <span className="font-display text-[15px] font-semibold tracking-tight">Apple</span>
        </span>
        <span className={`${wordmark} font-display text-[13px] font-bold tracking-[0.28em]`}>
          SAMSUNG
        </span>
        <span className={`${wordmark} font-display text-[15px] font-bold tracking-[0.18em]`}>
          SONY
        </span>
        <span className={wordmark}>
          <span className="grid size-7 place-items-center rounded-full border-2 border-current text-[11px] leading-none font-bold italic">
            hp
          </span>
        </span>
        <span className={`${wordmark} font-display text-[15px] font-bold tracking-tight`}>
          Lenovo
        </span>
      </div>
    </div>
  )
}
