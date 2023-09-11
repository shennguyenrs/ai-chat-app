import { Providers } from "@/components/commons";
import { ebGaramond, oswald } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

export const metadata = {
  title: "Assist Me",
  description: "My custom ChatGPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${ebGaramond.variable} scroll-smooth`}
    >
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
