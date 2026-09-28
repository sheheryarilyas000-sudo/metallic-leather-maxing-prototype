// Site-wide settings. Contact details are placeholders until the client confirms them
// (design system section 16).

export const site = {
  name: "Maxing Enterprises",
  tagline: "Apparel, hosiery & outerwear, made in Pakistan",
  description:
    "Maxing Enterprises manufactures and exports T-shirts, hoodies, jackets, polos, activewear and socks for brands and retailers in the US, UK and Europe.",
  catalogueUrl: "/catalogue/maxing-enterprises-catalogue.pdf",
  contact: {
    email: "export@example.com",
    phone: "+92 000 0000000",
    address: "Address to be confirmed, Pakistan",
    hours: "Monday to Saturday, 9:00 to 18:00 PKT",
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About us", href: "/about" },
  { label: "Quality & certificates", href: "/quality" },
];

export const quoteHref = "/quote";
