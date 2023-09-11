import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      prefix: "i-",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  theme: {
    fontFamily: {
      sans: "var(--font-oswald)",
      serif: "var(--font-eb-garamond)",
    },
  },
});
