/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { primary: "#1E64FA" }, 
        inputbg: "#1E293B",            
      },
      boxShadow: {
        "focus-blue": "0 0 0 3px rgba(30,100,250,0.35)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],      
        brandSerif: ['"Playfair Display"', "serif"],                      
      },
    },
  },
  plugins: [],
}
