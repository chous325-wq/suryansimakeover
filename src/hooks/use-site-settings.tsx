import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BRAND } from "@/lib/brand";

export type SiteSettings = {
  brand_name: string;
  brand_short: string;
  tagline: string;
  phone_display: string;
  phone_tel: string;
  whatsapp_number: string;
  instagram_url: string;
  instagram_handle: string;
  facebook_url: string;
  map_url: string;
  map_embed: string;
  address: string;
  hero_video_url: string;
};

export const SETTING_KEYS = [
  "brand_name",
  "tagline",
  "phone_display",
  "phone_tel",
  "whatsapp_number",
  "instagram_url",
  "instagram_handle",
  "facebook_url",
  "map_url",
  "map_embed",
  "address",
  "hero_video_url",
] as const;

const DEFAULTS: SiteSettings = {
  brand_name: BRAND.name,
  brand_short: BRAND.short,
  tagline: BRAND.tagline,
  phone_display: BRAND.phoneDisplay,
  phone_tel: BRAND.phoneTel,
  whatsapp_number: BRAND.whatsappNumber,
  instagram_url: BRAND.instagramUrl,
  instagram_handle: BRAND.instagramHandle,
  facebook_url: "",
  map_url: BRAND.mapUrl,
  map_embed: BRAND.mapEmbed,
  address: BRAND.address,
  hero_video_url: "",
};

const Ctx = createContext<SiteSettings>(DEFAULTS);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, string> = {};
        data.forEach((r) => {
          if (r.value != null) map[r.key] = r.value;
        });
        setSettings((prev) => {
          const next = { ...prev };
          (Object.keys(prev) as (keyof SiteSettings)[]).forEach((k) => {
            if (map[k] !== undefined) (next as Record<string, string>)[k] = map[k];
          });
          // Derive short brand from brand_name first word
          if (map.brand_name) next.brand_short = map.brand_name.split(/\s+/)[0] || map.brand_name;
          return next;
        });
      });
  }, []);

  return <Ctx.Provider value={settings}>{children}</Ctx.Provider>;
}

export function useSiteSettings() {
  return useContext(Ctx);
}

export function whatsappLinkFor(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}