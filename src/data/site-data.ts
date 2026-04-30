import bridal from "@/assets/service-bridal.jpg";
import party from "@/assets/service-party.jpg";
import hd from "@/assets/service-hd.jpg";
import hair from "@/assets/service-hair.jpg";
import prewed from "@/assets/service-prewed.jpg";
import saree from "@/assets/service-saree.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export type Service = {
  slug: string; name: string; tagline: string; description: string; priceFrom: number; image: string;
};

export const SERVICES: Service[] = [
  { slug: "bridal", name: "Bridal Makeup", tagline: "The Kalinga Bride", description: "Comprehensive heirloom artistry for the wedding day. Long-lasting base, intricate detailing, traditional alta and mukuta styling.", priceFrom: 25000, image: bridal },
  { slug: "party", name: "Party Makeup", tagline: "Evening Glamour", description: "Sculpted, photo-ready glam for receptions, sangeets, and special occasions.", priceFrom: 5500, image: party },
  { slug: "hd", name: "HD Makeup", tagline: "Flawless on Camera", description: "High-definition formulas designed for 4K cameras and professional photography.", priceFrom: 7500, image: hd },
  { slug: "airbrush", name: "Airbrush Makeup", tagline: "Weightless Perfection", description: "Featherlight, lasting coverage applied through professional airbrush technology.", priceFrom: 9500, image: hd },
  { slug: "hair", name: "Hairstyling", tagline: "Crowning Touches", description: "Bridal updos, traditional braiding with floral & jewelled adornments.", priceFrom: 3500, image: hair },
  { slug: "prewed", name: "Pre-wedding Shoots", tagline: "Romantic Prelude", description: "Cohesive looks across multiple outfits and locations for your shoot day.", priceFrom: 12000, image: prewed },
  { slug: "saree", name: "Saree Draping", tagline: "Heritage Drape", description: "Expert draping in traditional Odia, Bengali, Nivi & contemporary styles.", priceFrom: 1500, image: saree },
];

export type Pkg = { name: string; price: number; popular?: boolean; features: string[] };

export const PACKAGES: Pkg[] = [
  { name: "Engagement Ritual", price: 28000, features: ["HD bridal makeup", "Hairstyling with adornments", "Saree/lehenga draping", "Trial session", "Touch-up kit", "On-location service"] },
  { name: "Royal Bride", price: 55000, popular: true, features: ["Premium airbrush makeup", "Heritage hairstyling", "Full draping & jewellery setting", "Pre-bridal trial", "Mother of bride makeup", "All-day touch-ups", "Reception look"] },
  { name: "Heirloom Trousseau", price: 95000, features: ["3 ceremonies covered", "Sangeet, Wedding & Reception", "Premium airbrush throughout", "Family makeup (4 members)", "Two artists on wedding day", "Pre-bridal skin consult", "Travel within 100km included"] },
];

export const GALLERY = [
  { src: g1, category: "Bridal", alt: "Traditional bridal portrait" },
  { src: g2, category: "Bridal", alt: "Pink lehenga bride" },
  { src: g3, category: "Party", alt: "Party glam look" },
  { src: g4, category: "Fashion", alt: "Editorial fashion makeup" },
  { src: g5, category: "Bridal", alt: "Haldi mehendi look" },
  { src: g6, category: "Party", alt: "Reception couple" },
];

export const TESTIMONIALS = [
  { name: "Ananya P.", role: "Bride, Cuttack", text: "Kaashvi made me feel like royalty. The makeup lasted from the haldi to the vidaai — and every photograph looks like art." },
  { name: "Ritika S.", role: "Bride, Bhubaneswar", text: "She didn't just do my makeup, she understood my heritage. The Odia bridal look she created was stunning." },
  { name: "Meera K.", role: "Bride, Puri", text: "From skincare prep to reception look, every detail was thought through. Worth every rupee." },
];

export const BRANDS = ["MAC", "Huda Beauty", "Lakmé", "Charlotte Tilbury", "NARS", "Bobbi Brown", "Estée Lauder", "Anastasia"];

export const WHY_US = [
  { title: "12+ Years Experience", text: "A decade of crafting brides across Odisha and beyond." },
  { title: "Premium Imported Products", text: "Only luxury brands trusted by international artists." },
  { title: "Strict Hygiene Protocol", text: "Sanitised tools and disposable applicators for every client." },
  { title: "Long-lasting Finish", text: "Engineered to last through ceremonies, weather and tears of joy." },
];
