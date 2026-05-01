export const BRAND = {
  name: "Suryanshi Makeover",
  short: "Suryanshi",
  tagline: "Flawless Makeup for Your Special Moments",
  phoneDisplay: "+91 81446 02025",
  phoneTel: "+918144602025",
  whatsappNumber: "918144602025",
  email: "chous325@gmail.com",
  instagramUrl: "https://www.instagram.com/suryanshi_makeover_offcial",
  instagramHandle: "@suryanshi_makeover_offcial",
  mapUrl: "https://maps.app.goo.gl/1Kx41Pr68squARkGA",
  mapEmbed: "https://www.google.com/maps?q=Bhubaneswar,Odisha&output=embed",
  address: "Bhubaneswar · Odisha · India",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
