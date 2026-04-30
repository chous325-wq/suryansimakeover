import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { TESTIMONIALS } from "@/data/site-data";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Kaashvi Beauty Studio" },
      { name: "description", content: "Read what brides across Odisha say about their experience with Kaashvi Beauty Studio." },
    ],
  }),
  component: ReviewsPage,
});

const EXTRA = [
  { name: "Sneha M.", role: "Bride, Bhubaneswar", text: "I had three trials with other artists before finding Kaashvi. The difference was night and day — she actually listened to what I wanted." },
  { name: "Priya T.", role: "Reception Bride", text: "My HD makeup looked stunning in every photograph. Even in 4K video, the skin looked flawless and natural." },
  { name: "Anjali D.", role: "Bride, Cuttack", text: "From the trial to the wedding day, everything was seamless. The team is professional, talented, and so warm." },
  { name: "Smruti R.", role: "Mother of the Bride", text: "Kaashvi made me feel beautiful at 52. Subtle, elegant, and absolutely my style. Thank you." },
  { name: "Lipika P.", role: "Pre-wedding Shoot", text: "Two locations, three outfit changes — never broke a sweat. The makeup held up perfectly." },
];

function ReviewsPage() {
  const all = [...TESTIMONIALS, ...EXTRA];
  return (
    <>
      <PageHero eyebrow="Cherished Words" title={<>Stories from <span className="italic">our brides</span></>} subtitle="Each review is a moment we treasure — thank you for letting us be part of your story." />
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {all.map((t, i) => (
            <div key={i} className="bg-surface border border-gold/20 p-8 md:p-10">
              <div className="flex gap-0.5 text-gold mb-5">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
              <p className="font-display italic text-xl text-ink leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush to-nude flex items-center justify-center font-display text-xl text-gold-dark">{t.name[0]}</div>
                <div>
                  <p className="font-display text-lg text-ink">{t.name}</p>
                  <p className="text-xs uppercase tracking-widest text-gold font-sans-ui mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
