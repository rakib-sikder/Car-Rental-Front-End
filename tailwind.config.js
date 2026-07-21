/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0E0F13",
        signal: "#FF5A1F",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        overdrive: {
          primary: "#FF5A1F",
          "primary-content": "#ffffff",
          secondary: "#16171C",
          "secondary-content": "#ffffff",
          accent: "#0EA5A0",
          "accent-content": "#ffffff",
          neutral: "#0E0F13",
          "neutral-content": "#E7E5E1",
          "base-100": "#ffffff",
          "base-200": "#F6F5F2",
          "base-300": "#EAE8E2",
          "base-content": "#17181C",
          info: "#2563EB",
          success: "#16A34A",
          warning: "#D97706",
          error: "#DC2626",
          "--rounded-box": "1.1rem",
          "--rounded-btn": "0.7rem",
          "--rounded-badge": "1.9rem",
          "--border-btn": "1px",
          "--tab-radius": "0.6rem",
        },
      },
    ],
  },
};
