// Home page copy for the sections below the categories.
//
// TEMPLATE CONTENT: anything marked TBC must be confirmed by the client before launch
// (design system section 16). Never replace a TBC with an estimate.

export const TBC = "TBC";

export type IconName = "moq" | "sample" | "label" | "contact";

export const whyChooseUs: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "moq",
    title: "Orders from 500 pieces",
    text: "Start with 500 pieces per style. Test a new range without committing to a full season.",
  },
  {
    icon: "sample",
    title: "Samples before bulk",
    text: "Approve a physical sample of every style, in your fabric and size set, before production starts.",
  },
  {
    icon: "label",
    title: "Private label and packaging",
    text: "Woven labels, hang tags, polybags and cartons made to your brand guidelines.",
  },
  {
    icon: "contact",
    title: "One contact per order",
    text: "A dedicated merchandiser follows your order from tech pack to shipment, so you always know who to ask.",
  },
];

export const capabilities = {
  intro:
    "From pattern making to packing, every stage is checked before an order moves on.",
  departments: [
    "Pattern making and sampling",
    "Cutting",
    "Stitching lines",
    "Sock knitting",
    "Printing and embroidery",
    "Finishing, inspection and packing",
  ],
  photos: ["Photo: cutting table", "Photo: stitching floor", "Photo: sock knitting machines", "Photo: final inspection"],
  stats: [
    { value: "25,000+", label: "Pieces per month" },
    { value: "150+", label: "Machines on the floor" },
    { value: "15+", label: "Years exporting" },
    { value: "40+", label: "Countries shipped to" },
  ],
};

export const flowSteps: { title: string; text: string }[] = [
  { title: "Inquiry", text: "Send a tech pack, reference sample or photo with quantities and target price." },
  { title: "Costing and sampling", text: "We quote per style and make a sample in your fabric and colour." },
  { title: "Approval", text: "You approve the sample, sizes and trims. We lock the production plan." },
  { title: "Production", text: "Cutting, stitching and finishing, with inline checks on every line." },
  { title: "Inspection and shipping", text: "Final inspection, packing to your spec and export documents." },
];

// Placeholder slots only. Show a certificate here once the client confirms they hold it,
// with its number and validity (see the Quality & certificates page).
export const certifications: { name: string; text: string }[] = [
  { name: "Certificate 1", text: "Name and scope TBC" },
  { name: "Certificate 2", text: "Name and scope TBC" },
  { name: "Certificate 3", text: "Name and scope TBC" },
  { name: "Certificate 4", text: "Name and scope TBC" },
  { name: "Certificate 5", text: "Name and scope TBC" },
];

export const markets = {
  intro:
    "We produce to the sizing, labelling and packing rules of each market, and ship by sea or air on the terms you prefer.",
  regions: [
    { region: "United States", sizing: "US sizing", notes: TBC },
    { region: "United Kingdom", sizing: "UK sizing", notes: TBC },
    { region: "European Union", sizing: "EU sizing", notes: TBC },
    { region: "Other markets", sizing: "On request", notes: TBC },
  ],
};
