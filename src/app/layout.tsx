import type { Metadata } from "next";
import { Space_Grotesk, Roboto, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Preloader from "@/components/motion/Preloader";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import FooterReveal from "@/components/layout/FooterReveal";
import { SITE } from "@/content/site";
import "./globals.css";

/**
 * Typefaces carried over from the live site so the rebrand is a layout change
 * rather than a typographic one.
 *
 * The reference sets everything in Amiamie, which is licensed and not ours to
 * ship. Space Grotesk takes the display tier: it has the same slightly
 * mechanical, wide-aperture cut, and — the part that matters for this design —
 * it holds up at the 11rem sizes the display tier reaches, where a softer
 * grotesque goes muddy.
 *
 * The display weight range is 300–700 rather than the live site's 500/700: the
 * reference's section subheads are set light, and that tier does not exist in
 * the current build.
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Measure fish from your phone`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${roboto.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Preloader />
        <SmoothScroll>
          <a
            href="#main"
            className="bg-flare text-ink t-micro sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <Nav />
          {/* The footer is held behind the page and uncovered as the content
              scrolls off it; `FooterReveal` owns both layers and the space the
              page needs to slide into. */}
          <FooterReveal main={children}>
            <Footer />
          </FooterReveal>
        </SmoothScroll>
      </body>
    </html>
  );
}
