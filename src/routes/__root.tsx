import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import { NotFound } from "@/components/not-found";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Suryanshi Makeover — Best Bridal & HD Makeup Artist in Odisha" },
      { name: "description", content: "Premium bridal, HD, airbrush & party makeup artist in Bhubaneswar, Odisha. Flawless makeup for your most special moments. Book your consultation on WhatsApp." },
      { name: "author", content: "Suryanshi Makeover" },
      { name: "keywords", content: "best makeup artist in Odisha, bridal makeup near me, HD makeup artist Bhubaneswar, airbrush makeup, party makeup Odisha" },
      { property: "og:title", content: "Suryanshi Makeover — Best Bridal & HD Makeup Artist in Odisha" },
      { property: "og:description", content: "Premium bridal, HD, airbrush & party makeup artist in Bhubaneswar, Odisha. Flawless makeup for your most special moments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Suryanshi Makeover — Best Bridal & HD Makeup Artist in Odisha" },
      { name: "twitter:description", content: "Premium bridal, HD, airbrush & party makeup artist in Bhubaneswar, Odisha. Flawless makeup for your most special moments." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ec91972f-24f5-4dfe-bb96-2c721c14a2e4/id-preview-2b0e1626--1ecd7bba-fbd7-4f10-a02a-6be9a6d05637.lovable.app-1777551462911.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ec91972f-24f5-4dfe-bb96-2c721c14a2e4/id-preview-2b0e1626--1ecd7bba-fbd7-4f10-a02a-6be9a6d05637.lovable.app-1777551462911.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingActions />
      <Toaster />
    </div>
  );
}
