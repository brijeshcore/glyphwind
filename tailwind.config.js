/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,js,jsx,html}", "./components/**/*.{ts,tsx}"],

  theme: {
    // ─── Container ─────────────────────────────────────────────────────────────
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1400px" },
    },

    // ─── Override defaults to enforce the system ────────────────────────────────
    borderRadius: {
      none: "0",
      sm: "0.125rem",   // 2px — tightest allowed
      DEFAULT: "0.25rem", // 4px — standard precision
      md: "0.25rem",    // 4px — cards, inputs
      lg: "0.375rem",   // 6px — max structural radius. Never "full" for containers.
      full: "9999px",   // only for badges/dots
    },

    extend: {
      // ─── Color Tokens ──────────────────────────────────────────────────────────
      // All colors map to CSS custom properties so both themes work via class toggle.
      colors: {
        // ── Semantic surface scale ──────────────────────────────────────────────
        // Tokens are raw HSL — Tailwind wraps them in hsl() automatically.
        background:   "hsl(var(--background))",
        foreground:   "hsl(var(--foreground))",

        surface: {
          DEFAULT: "hsl(var(--surface))",
          low:     "hsl(var(--surface-low))",
          card:    "hsl(var(--surface-card))",
          high:    "hsl(var(--surface-high))",
          highest: "hsl(var(--surface-highest))",
        },

        // ── Text scale ─────────────────────────────────────────────────────────
        ink: {
          DEFAULT: "hsl(var(--ink))",
          muted:   "hsl(var(--ink-muted))",
          subtle:  "hsl(var(--ink-subtle))",
          ghost:   "hsl(var(--ink-ghost))",
        },

        // ── Signal red ─────────────────────────────────────────────────────────
        signal: {
          DEFAULT:    "hsl(var(--signal))",
          foreground: "hsl(var(--signal-foreground))",
        },

        // ── Borders & inputs ───────────────────────────────────────────────────
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",

        // ── shadcn/ui compatibility aliases ───────────────────────────────────
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // ─── Typography ───────────────────────────────────────────────────────────
      fontFamily: {
        sans:  ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono:  ["Space Mono", "Roboto Mono", "monospace"],
        // dot: map to your Ndot / DotMatrix font if loaded
        dot:   ["Doto", "Ndot-55", "DotMatrix", "Space Mono", "monospace"],
      },

      fontSize: {
        // Display — dot-matrix statement layer (3 words max)
        "display-lg": ["4.5rem",   { lineHeight: "1",    letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-md": ["3.5rem",   { lineHeight: "1",    letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-sm": ["2.5rem",   { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],

        // Headlines — section anchors
        "headline-lg": ["2rem",   { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["1.5rem", { lineHeight: "1.2",  letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-sm": ["1.25rem",{ lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],

        // Titles
        "title-lg": ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }],
        "title-md": ["1rem",     { lineHeight: "1.4", fontWeight: "500" }],
        "title-sm": ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],

        // Body — use Inter/Space Grotesk, never dot-matrix
        "body-lg": ["1rem",     { lineHeight: "1.65", fontWeight: "400" }],
        "body-md": ["0.875rem", { lineHeight: "1.6",  fontWeight: "400" }],
        "body-sm": ["0.8rem",   { lineHeight: "1.55", fontWeight: "400" }],

        // Labels — always uppercase, tracked. Machinery labels.
        "label-lg": ["0.75rem",  { lineHeight: "1",   letterSpacing: "0.08em",  fontWeight: "500" }],
        "label-md": ["0.6875rem",{ lineHeight: "1",   letterSpacing: "0.09em",  fontWeight: "500" }],
        "label-sm": ["0.625rem", { lineHeight: "1",   letterSpacing: "0.10em",  fontWeight: "500" }],
      },

      letterSpacing: {
        "tightest":    "-0.03em",
        "tighter":     "-0.02em",
        "tight":       "-0.01em",
        "normal":       "0em",
        "label":        "0.08em",
        "label-wide":   "0.10em",
        "label-widest": "0.12em",
      },

      // ─── Spacing ──────────────────────────────────────────────────────────────
      // 4px base grid. All spacing is a multiple of 4px.
      spacing: {
        px:   "1px",
        0:    "0",
        0.5:  "0.125rem",  // 2px
        1:    "0.25rem",   // 4px  — base unit
        1.5:  "0.375rem",  // 6px
        2:    "0.5rem",    // 8px
        2.5:  "0.625rem",  // 10px
        3:    "0.75rem",   // 12px
        4:    "1rem",      // 16px — gutter min
        5:    "1.25rem",   // 20px
        6:    "1.5rem",    // 24px — card padding
        7:    "1.75rem",   // 28px
        8:    "2rem",      // 32px — section internal
        10:   "2.5rem",    // 40px
        12:   "3rem",      // 48px
        14:   "3.5rem",    // 56px
        16:   "4rem",      // 64px — section gap min
        20:   "5rem",      // 80px
        24:   "6rem",      // 96px
        32:   "8rem",      // 128px — hero breathing room
        40:   "10rem",     // 160px
        48:   "12rem",     // 192px
      },

      // ─── Box Shadow — "Ambient Diffusion" not drop shadows ────────────────────
      boxShadow: {
        // White light-leak for dark mode floaters
        "float-dark":   "0 0 64px 0 rgba(255,255,255,0.05)",
        // Red thermal glow for signal elements
        "signal-glow":  "0 0 32px 0 rgba(255,65,50,0.12)",
        // Light mode float — barely-there
        "float-light":  "0 4px 32px 0 rgba(0,0,0,0.06)",
        // Ghost border shadow alternative
        "ghost":        "inset 0 0 0 1px rgba(255,255,255,0.08)",
        "ghost-light":  "inset 0 0 0 1px rgba(0,0,0,0.08)",
        // Modal / overlay
        "modal":        "0 0 80px 0 rgba(0,0,0,0.6)",
        none:           "none",
      },

      // ─── Backdrop blur ────────────────────────────────────────────────────────
      backdropBlur: {
        xs:  "4px",
        sm:  "8px",
        md:  "12px",  // nav / floating panels
        lg:  "20px",  // overlays
        xl:  "32px",
      },

      // ─── Keyframes & Animation ────────────────────────────────────────────────
      keyframes: {
        // LED pulse — Glyphwindwind indicator
        "led-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.25" },
        },
        // Fade + micro-lift entrance
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        // Subtle scale-in for modals / dropdowns
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        // Accordion (shadcn compatible)
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        // Scanning line effect (optional decorative)
        "scan": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },

      animation: {
        "led-pulse":       "led-pulse 2.4s ease-in-out infinite",
        "led-pulse-fast":  "led-pulse 1s ease-in-out infinite",
        "fade-up":         "fade-up 0.18s ease-out",
        "scale-in":        "scale-in 0.15s ease-out",
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "scan":            "scan 3s linear infinite",
      },

      // ─── Transitions ─────────────────────────────────────────────────────────
      transitionDuration: {
        fast:    "80ms",
        DEFAULT: "150ms",
        slow:    "300ms",
      },

      transitionTimingFunction: {
        "precision": "cubic-bezier(0.4, 0, 0.2, 1)",
        "snap":      "cubic-bezier(0.0, 0, 0.2, 1)",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    // Uncomment if using @tailwindcss/typography for prose content:
    // require("@tailwindcss/typography"),
  ],
};
