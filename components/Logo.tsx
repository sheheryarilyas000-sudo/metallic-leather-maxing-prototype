import Link from "next/link";
import Image from "next/image";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";

  return (
    <Link href="/" className="flex shrink-0 items-center gap-3 group" aria-label="Maxing Enterprises, home">
      <div
        className={`relative flex size-[46px] items-center justify-center overflow-hidden rounded-full border-2 bg-white transition-colors duration-300 ${
          dark ? "border-[#BF953F]" : "border-[#BF953F] shadow-xs"
        }`}
      >
        <Image
          src="/images/brand-logo.jpg"
          alt="Maxing Enterprises Logo"
          width={46}
          height={46}
          className="size-full object-cover"
          style={{
            filter: "sepia(1) hue-rotate(-50deg) saturate(3) brightness(0.8)",
          }}
          priority
        />
      </div>
      <span aria-hidden="true" className="flex flex-col leading-none">
        <span
          className="font-logo text-[23px] transition-colors duration-300 font-bold tracking-[0.06em] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text"
        >
          MAXING
        </span>
        <span
          className={`mt-1 text-[10px] transition-colors duration-300 font-bold tracking-[0.3em] ${
            dark ? "text-[#E6D5B8]" : "text-[#B38728]"
          }`}
        >
          ENTERPRISES
        </span>
      </span>
    </Link>
  );
}
