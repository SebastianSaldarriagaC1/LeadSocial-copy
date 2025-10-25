import { useState } from "react";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import PasswordField from "../molecules/PasswordField";
import { MailIcon } from "../atoms/Icon";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import InstagramBusinessButton from "./InstagramBusinessButton"; // 👈 nuevo

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      const to = location.state?.from?.pathname || "/first-time";
      navigate(to, { replace: true });
    } catch (err) {
      setError(err.message || "Error iniciando sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-lg bg-red-500/10 text-red-300 px-3 py-2 text-sm ring-1 ring-red-500/30">
          {error}
        </div>
      )}

      <FormField
        id="email"
        label="Email Address"
        type="email"
        placeholder="name@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<MailIcon />}
      />

      <PasswordField
        id="password"
        placeholder="***********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </Button>

      {/* Separador */}
      <div className="flex items-center gap-3 text-white/50">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs">o</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Instagram Business Login */}
      <InstagramBusinessButton />

      <div className="mt-2 text-center">
        <Link
          to="/register"
          className="text-sm font-semibold text-brand-primary hover:underline"
        >
          Registrarse
        </Link>
      </div>
    </form>
  );
}
