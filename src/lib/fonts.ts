import { Oswald, EB_Garamond } from "next/font/google";

export const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
  weight: ["300", "400", "700"],
  style: ["normal"],
});

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
