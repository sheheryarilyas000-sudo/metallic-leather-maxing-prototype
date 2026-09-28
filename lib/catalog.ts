// Product catalogue.
//
// SAMPLE DATA: every style, fabric, GSM, MOQ and lead time below is a placeholder that
// shapes the layout. Replace it with the client's confirmed product list before launch
// (design system section 16). Never publish figures the client cannot back up.

export const productColours = {
  Navy: "#14213D",
  Red: "#C9202F",
  Blue: "#2B4A8C",
  Sand: "#D8CFBC",
  Grey: "#8A8D93",
  Olive: "#5C6249",
  Black: "#26272B",
  White: "#F5F4F0",
  Khaki: "#A8956B",
} as const;

export type ColourName = keyof typeof productColours;

/** Garment silhouette used by illustrated tiles until real photos exist. */
export type GarmentShape = "tee" | "polo" | "hoodie" | "sweatshirt" | "jacket" | "raglan" | "sock";

export interface Category {
  slug: string;
  name: string;
  /** One line for category cards. */
  summary: string;
  /** Intro line for the category page header. */
  intro: string;
  /** Garment cut-out on a transparent 7:9 canvas (photo, or illustration until the shoot). */
  image: string;
  /** Soft background colour painted behind the cut-out on cards. */
  tint: string;
  shape: GarmentShape;
}

export interface Product {
  slug: string;
  categorySlug: string;
  styleCode: string;
  name: string;
  description: string;
  fabric: string;
  /** Fabric weight in GSM. 0 for knitted items (socks) where GSM is not quoted. */
  gsm: number;
  sizes: string;
  colours: ColourName[];
  /** Minimum order in pieces. */
  moq: number;
  /** Production lead time in days after sample approval. */
  leadTimeDays: string;
  customisation: string;
  shape: GarmentShape;
}

export const categories: Category[] = [
  {
    slug: "t-shirts",
    name: "T-shirts",
    summary: "Crew and V-neck tees in cotton jersey and blends.",
    intro: "Crew necks, V-necks and long sleeves in cotton, organic cotton and blends, ready for print or embroidery.",
    image: "/images/categories/t-shirts.svg",
    tint: "#ffffff",
    shape: "tee",
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    summary: "Fleece and French terry hoodies and sweatshirts.",
    intro: "Pullover and zip hoodies and crew sweatshirts in brushed fleece and French terry.",
    image: "/images/categories/hoodies.webp",
    tint: "#ffffff",
    shape: "hoodie",
  },
  {
    slug: "jackets",
    name: "Jackets",
    summary: "Bomber, soft-shell and varsity jackets.",
    intro: "Padded bombers, soft-shell and varsity jackets for retail and team programmes.",
    image: "/images/categories/jackets.svg",
    tint: "#ffffff",
    shape: "jacket",
  },
  {
    slug: "polos",
    name: "Polos",
    summary: "Piqué, jersey and performance polos.",
    intro: "Polo shirts in cotton piqué, jersey and moisture-wicking performance fabrics.",
    image: "/images/categories/polos.webp",
    tint: "#ffffff",
    shape: "polo",
  },
  {
    slug: "activewear",
    name: "Activewear",
    summary: "Training tops, leggings and track jackets.",
    intro: "Training tops, leggings and track jackets in technical knits with stretch and moisture control.",
    image: "/images/categories/activewear.webp",
    tint: "#ffffff",
    shape: "raglan",
  },
  {
    slug: "socks-hosiery",
    name: "Socks & hosiery",
    summary: "Crew, ankle, sports and dress socks.",
    intro: "Socks knitted in cotton, bamboo and technical blends, with custom jacquard and retail packaging.",
    image: "/images/categories/socks-hosiery.svg",
    tint: "#ffffff",
    shape: "sock",
  },
];

const defaultCustomisation = "Private label, woven labels, hang tags, custom packaging";

export const products: Product[] = [
  // T-shirts
  {
    slug: "classic-crew-neck-tee",
    categorySlug: "t-shirts",
    styleCode: "MX-TS-101",
    name: "Classic crew neck tee",
    description: "A regular-fit crew neck in combed cotton single jersey. Suits retail basics and print programmes.",
    fabric: "100% combed cotton single jersey",
    gsm: 180,
    sizes: "XS to 3XL (EU and US sizing)",
    colours: ["White", "Black", "Navy", "Grey"],
    moq: 500,
    leadTimeDays: "45 to 60",
    customisation: `${defaultCustomisation}, screen print, embroidery`,
    shape: "tee",
  },
  {
    slug: "organic-cotton-tee",
    categorySlug: "t-shirts",
    styleCode: "MX-TS-120",
    name: "Organic cotton tee",
    description: "A relaxed-fit tee in organic cotton jersey for brands with sustainability goals.",
    fabric: "100% organic cotton single jersey",
    gsm: 160,
    sizes: "XS to 2XL (EU and US sizing)",
    colours: ["Sand", "White", "Olive"],
    moq: 500,
    leadTimeDays: "50 to 65",
    customisation: `${defaultCustomisation}, screen print`,
    shape: "tee",
  },
  {
    slug: "long-sleeve-tee",
    categorySlug: "t-shirts",
    styleCode: "MX-TS-131",
    name: "Long sleeve tee",
    description: "Long sleeve crew neck with rib cuffs, cut from the same jersey as the classic tee.",
    fabric: "100% combed cotton single jersey",
    gsm: 190,
    sizes: "XS to 3XL (EU and US sizing)",
    colours: ["White", "Black", "Navy"],
    moq: 500,
    leadTimeDays: "45 to 60",
    customisation: `${defaultCustomisation}, screen print, embroidery`,
    shape: "tee",
  },

  // Hoodies
  {
    slug: "pullover-fleece-hoodie",
    categorySlug: "hoodies",
    styleCode: "MX-HD-201",
    name: "Pullover fleece hoodie",
    description: "Brushed-back fleece hoodie with a lined hood, kangaroo pocket and rib cuffs.",
    fabric: "80% cotton, 20% polyester fleece",
    gsm: 320,
    sizes: "XS to 3XL (EU and US sizing)",
    colours: ["Grey", "Black", "Navy"],
    moq: 500,
    leadTimeDays: "55 to 70",
    customisation: `${defaultCustomisation}, embroidery, puff print`,
    shape: "hoodie",
  },
  {
    slug: "zip-through-hoodie",
    categorySlug: "hoodies",
    styleCode: "MX-HD-208",
    name: "Zip-through hoodie",
    description: "Full-zip hoodie in French terry with metal or nylon zip options.",
    fabric: "100% cotton French terry",
    gsm: 300,
    sizes: "S to 3XL (EU and US sizing)",
    colours: ["Navy", "Grey", "Olive"],
    moq: 500,
    leadTimeDays: "55 to 70",
    customisation: `${defaultCustomisation}, custom zip pullers`,
    shape: "hoodie",
  },
  {
    slug: "crew-neck-sweatshirt",
    categorySlug: "hoodies",
    styleCode: "MX-HD-215",
    name: "Crew neck sweatshirt",
    description: "Classic crew sweatshirt with raglan sleeves and a V-insert at the neck.",
    fabric: "80% cotton, 20% polyester fleece",
    gsm: 300,
    sizes: "XS to 3XL (EU and US sizing)",
    colours: ["Sand", "Grey", "Navy", "Black"],
    moq: 500,
    leadTimeDays: "50 to 65",
    customisation: `${defaultCustomisation}, embroidery`,
    shape: "sweatshirt",
  },

  // Jackets
  {
    slug: "padded-bomber-jacket",
    categorySlug: "jackets",
    styleCode: "MX-JK-301",
    name: "Padded bomber jacket",
    description: "Water-repellent bomber with polyester wadding, rib trims and a lined body.",
    fabric: "100% nylon shell, polyester lining and wadding",
    gsm: 120,
    sizes: "S to 3XL (EU and US sizing)",
    colours: ["Black", "Olive", "Navy"],
    moq: 500,
    leadTimeDays: "60 to 75",
    customisation: `${defaultCustomisation}, custom trims and hardware`,
    shape: "jacket",
  },
  {
    slug: "soft-shell-jacket",
    categorySlug: "jackets",
    styleCode: "MX-JK-310",
    name: "Soft-shell jacket",
    description: "Three-layer soft-shell with a fleece back, zip pockets and adjustable cuffs.",
    fabric: "Polyester and elastane with bonded fleece",
    gsm: 280,
    sizes: "S to 3XL (EU and US sizing)",
    colours: ["Black", "Navy", "Grey"],
    moq: 500,
    leadTimeDays: "60 to 75",
    customisation: `${defaultCustomisation}, embroidery, heat transfer`,
    shape: "jacket",
  },
  {
    slug: "varsity-jacket",
    categorySlug: "jackets",
    styleCode: "MX-JK-322",
    name: "Varsity jacket",
    description: "Wool-blend body with contrast sleeves, snap front and striped rib trims.",
    fabric: "Wool-blend melton body, PU sleeves",
    gsm: 450,
    sizes: "S to 2XL (EU and US sizing)",
    colours: ["Navy", "Red", "Black"],
    moq: 500,
    leadTimeDays: "65 to 80",
    customisation: `${defaultCustomisation}, chenille patches, embroidery`,
    shape: "jacket",
  },

  // Polos
  {
    slug: "pique-polo-shirt",
    categorySlug: "polos",
    styleCode: "MX-PL-401",
    name: "Piqué polo shirt",
    description: "Two-button polo in cotton piqué with a flat-knit collar and cuffs.",
    fabric: "100% cotton piqué",
    gsm: 220,
    sizes: "S to 3XL (EU and US sizing)",
    colours: ["Navy", "White", "Red", "Blue"],
    moq: 500,
    leadTimeDays: "50 to 65",
    customisation: `${defaultCustomisation}, embroidery`,
    shape: "polo",
  },
  {
    slug: "jersey-polo-shirt",
    categorySlug: "polos",
    styleCode: "MX-PL-408",
    name: "Jersey polo shirt",
    description: "Soft single-jersey polo with a self-fabric collar for a relaxed retail fit.",
    fabric: "95% cotton, 5% elastane single jersey",
    gsm: 200,
    sizes: "S to 3XL (EU and US sizing)",
    colours: ["White", "Navy", "Sand"],
    moq: 500,
    leadTimeDays: "50 to 65",
    customisation: `${defaultCustomisation}, embroidery`,
    shape: "polo",
  },
  {
    slug: "performance-polo-shirt",
    categorySlug: "polos",
    styleCode: "MX-PL-415",
    name: "Performance polo shirt",
    description: "Moisture-wicking polo for golf, corporate and team wear, with a three-button placket.",
    fabric: "100% polyester bird-eye mesh",
    gsm: 160,
    sizes: "S to 3XL (EU and US sizing)",
    colours: ["Blue", "Black", "White", "Red"],
    moq: 500,
    leadTimeDays: "50 to 65",
    customisation: `${defaultCustomisation}, heat transfer, sublimation`,
    shape: "polo",
  },

  // Activewear
  {
    slug: "raglan-training-top",
    categorySlug: "activewear",
    styleCode: "MX-AW-501",
    name: "Raglan training top",
    description: "Lightweight raglan tee with flatlock seams and contrast sleeves.",
    fabric: "100% polyester interlock, moisture-wicking finish",
    gsm: 150,
    sizes: "XS to 3XL (EU and US sizing)",
    colours: ["Blue", "Black", "Grey"],
    moq: 500,
    leadTimeDays: "50 to 65",
    customisation: `${defaultCustomisation}, sublimation, reflective prints`,
    shape: "raglan",
  },
  {
    slug: "high-waist-leggings",
    categorySlug: "activewear",
    styleCode: "MX-AW-510",
    name: "High-waist leggings",
    description: "Squat-proof leggings with a wide waistband and hidden key pocket.",
    fabric: "78% polyamide, 22% elastane",
    gsm: 240,
    sizes: "XS to XL (EU and US sizing)",
    colours: ["Black", "Navy", "Olive"],
    moq: 500,
    leadTimeDays: "55 to 70",
    customisation: `${defaultCustomisation}, heat transfer`,
    shape: "raglan",
  },
  {
    slug: "track-jacket",
    categorySlug: "activewear",
    styleCode: "MX-AW-522",
    name: "Track jacket",
    description: "Full-zip track jacket in tricot with side pockets and contrast piping.",
    fabric: "100% polyester tricot",
    gsm: 260,
    sizes: "S to 3XL (EU and US sizing)",
    colours: ["Navy", "Black", "Red"],
    moq: 500,
    leadTimeDays: "55 to 70",
    customisation: `${defaultCustomisation}, embroidery, custom piping`,
    shape: "jacket",
  },

  // Socks & hosiery
  {
    slug: "cotton-crew-sock",
    categorySlug: "socks-hosiery",
    styleCode: "MX-HS-601",
    name: "Cotton crew sock",
    description: "Everyday crew sock with a hand-linked toe and reinforced heel.",
    fabric: "80% combed cotton, 17% polyamide, 3% elastane",
    gsm: 0,
    sizes: "EU 36 to 46 (US 4 to 12)",
    colours: ["White", "Black", "Grey", "Navy"],
    moq: 500,
    leadTimeDays: "40 to 55",
    customisation: "Custom jacquard, private label, bands and header cards",
    shape: "sock",
  },
  {
    slug: "cushioned-sports-sock",
    categorySlug: "socks-hosiery",
    styleCode: "MX-HS-612",
    name: "Cushioned sports sock",
    description: "Half-terry cushioned sole with arch support and a breathable mesh top.",
    fabric: "Cotton, polyester and elastane blend",
    gsm: 0,
    sizes: "EU 36 to 46 (US 4 to 12)",
    colours: ["White", "Black"],
    moq: 500,
    leadTimeDays: "40 to 55",
    customisation: "Custom jacquard, private label, retail packaging",
    shape: "sock",
  },
  {
    slug: "bamboo-dress-sock",
    categorySlug: "socks-hosiery",
    styleCode: "MX-HS-620",
    name: "Bamboo dress sock",
    description: "Fine-gauge dress sock in bamboo viscose with a comfort top.",
    fabric: "75% bamboo viscose, 22% polyamide, 3% elastane",
    gsm: 0,
    sizes: "EU 39 to 46 (US 7 to 12)",
    colours: ["Navy", "Black", "Grey", "Khaki"],
    moq: 500,
    leadTimeDays: "40 to 55",
    customisation: "Custom patterns, private label, gift boxes",
    shape: "sock",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProduct(categorySlug: string, productSlug: string): Product | undefined {
  return products.find((p) => p.categorySlug === categorySlug && p.slug === productSlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function categoryHref(category: Pick<Category, "slug">): string {
  return `/products/${category.slug}`;
}

export function productHref(product: Pick<Product, "slug" | "categorySlug">): string {
  return `/products/${product.categorySlug}/${product.slug}`;
}

/** "180 GSM", or null for knitted items (socks) where GSM is not quoted. */
export function formatWeight(product: Pick<Product, "gsm">): string | null {
  return product.gsm > 0 ? `${product.gsm} GSM` : null;
}
