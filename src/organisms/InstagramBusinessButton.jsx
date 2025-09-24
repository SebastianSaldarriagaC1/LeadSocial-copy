// src/organisms/InstagramBusinessButton.jsx
import React from "react";

// usa .env si quieres cambiarlo sin tocar código
const CONNECT_URL =
  import.meta.env.VITE_IG_CONNECT_URL ||
  "https://utilizable-peridermal-candace.ngrok-free.app/api/social/instagram/connect";

export default function InstagramBusinessButton({ className = "" }) {
  const goToInstagramConnect = () => {
    // redirección en la misma pestaña hacia tu backend
    window.location.assign(CONNECT_URL);
  };

  return (
    <button
      type="button"
      onClick={goToInstagramConnect}
      className={[
        "w-full h-12 px-4 rounded-xl bg-white/10 ring-1 ring-white/15",
        "text-white font-semibold hover:bg-white/15 transition-colors",
        "flex items-center justify-center gap-3",
        className,
      ].join(" ")}
    >
      {/* ícono IG inline */}
      <span className="inline-flex w-5 h-5 items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
        </svg>
      </span>
      <span>Continuar con Instagram</span>
    </button>
  );
}
