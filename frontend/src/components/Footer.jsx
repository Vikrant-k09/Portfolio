export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[radial-gradient(circle_at_top,rgba(168,196,216,0.28),rgba(236,242,246,0.96)_46%,rgba(228,236,242,0.98)_100%)] px-6 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <svg
          viewBox="0 0 120 44"
          className="h-8 w-16 text-[var(--accent-ice-deep)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 36L32 14L48 25L68 6L112 36"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Made by Vik · 2026
        </p>
      </div>
    </footer>
  );
}
