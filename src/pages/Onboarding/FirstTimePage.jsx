// src/pages/Onboarding/FirstTimePage.jsx
import Button from "../../atoms/Button";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveInstagramTokens } from "../../lib/ig";

export default function FirstTimePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search] = useSearchParams();
  const [justConnected, setJustConnected] = useState(false);

  // ⬇️ Captura tokens si vienen en la URL y limpia la URL
  useEffect(() => {
    const accessToken  = search.get("accessToken");
    const refreshToken = search.get("refreshToken");

    if (accessToken || refreshToken) {
      saveInstagramTokens({ accessToken, refreshToken });
      setJustConnected(true);

      // Limpia los query params para que no queden visibles
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, navigate, search]);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white grid place-items-center px-4">
      <div className="w-[92%] max-w-sm rounded-2xl bg-[#475569]/80 p-6 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-center text-2xl font-extrabold leading-snug mb-5">
          ¿Entras por primera vez?
        </h2>

        {justConnected && (
          <div className="mb-4 rounded-lg bg-emerald-500/15 text-emerald-300 px-3 py-2 text-sm ring-1 ring-emerald-400/30">
            Cuenta de Instagram conectada. ✅
          </div>
        )}

        <div className="space-y-3">
          <Button onClick={() => navigate("/onboarding/new-user")}>
            Nuevo usuario
          </Button>

          <Button
            className="bg-inputbg hover:bg-inputbg/90"
            onClick={() => navigate("/onboarding/returning-user")}
          >
            Antiguo usuario
          </Button>
        </div>
      </div>
    </div>
  );
}
