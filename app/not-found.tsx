import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section bg-[url('/leather-bg-full.jpg')] bg-cover bg-center bg-fixed relative min-h-[75vh] flex items-center">
      <div className="wrap relative z-10 py-16">
        <span className="text-[13px] font-bold tracking-[0.25em] uppercase bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text">
          404 Error
        </span>
        <h1 className="t-page stitch-h mt-2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text">
          Page not found
        </h1>
        <p className="measure mt-5 text-[#FDFBF7]/80 text-lg leading-relaxed">
          This page does not exist or has moved. Browse the product range or send us your requirements.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="btn bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold shadow-lg hover:brightness-110 transition-all border-none"
          >
            View products
          </Link>
          <Link
            href="/"
            className="btn border border-[#BF953F]/60 text-[#FCF6BA] font-semibold hover:bg-[#BF953F]/20 hover:border-[#FCF6BA] transition-all"
          >
            Go to home page
          </Link>
        </div>
      </div>
    </section>
  );
}
