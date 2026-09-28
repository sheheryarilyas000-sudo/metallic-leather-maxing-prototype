import Link from "next/link";
import { Logo } from "@/components/Logo";
import { categories, categoryHref } from "@/lib/catalog";
import { quoteHref, site } from "@/lib/site";

const companyLinks = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "About us", href: "/about" },
  { label: "Quality & certificates", href: "/quality" },
  { label: "Get a quote", href: quoteHref },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-sans text-[15px] font-bold tracking-normal bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text">
      {children}
    </h2>
  );
}

export function Footer() {
  const linkClass = "text-[15px] text-[#D5C7B8] transition-colors hover:text-[#FCF6BA]";

  return (
    <footer
      className="bg-[#0A0A0A] w-full text-[#D5C7B8] relative border-t-[2px] border-[#BF953F]"
    >
      <div className="wrap relative z-10 pb-[max(32px,env(safe-area-inset-bottom))] pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] sm:grid-cols-2">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-[34ch] text-[15px] text-[#D5C7B8]">
              Manufacturer and exporter of premium leather apparel, bespoke goods and accessories from Pakistan.
            </p>
          </div>

          <div>
            <FooterHeading>Products</FooterHeading>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={categoryHref(category)} className={linkClass}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Export inquiries</FooterHeading>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a href={`mailto:${site.contact.email}`} className={linkClass}>
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                  {site.contact.phone}
                </a>
              </li>
              <li>{site.contact.address}</li>
              <li>{site.contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-dashed border-[#BF953F]/25 pt-6 text-[14px]">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
