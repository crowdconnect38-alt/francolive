import type { Config } from "tailwindcss";

// FrancoLive design tokens
// Palette inspired by Parisian café awnings & enamel street signage —
// deliberately NOT the generic cream/terracotta AI default.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A2035",       // near-black blue, primary text
        paper: "#EFF1F5",     // cool pale paper, page background
        plaque: "#FFFFFF",    // card surfaces ("enamel plaque" white)
        bleu: {
          DEFAULT: "#2C4A7C", // café-awning blue, primary brand color
          deep: "#16233D",    // dark sections, footer, video classroom chrome
          soft: "#E4EAF3",    // tinted backgrounds, hover states
        },
        ochre: {
          DEFAULT: "#D8A73D", // signage ochre, primary accent / CTA
          deep: "#B4872A",
        },
        rouge: "#B23A34",     // muted brick red, used sparingly (ratings, live indicator)
        sage: "#4A7856",      // progress, success, "verified" states
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        plaque: "6px",
      },
      letterSpacing: {
        signage: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
