import { useState } from "react";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import PasswordField from "../molecules/PasswordField";
import { MailIcon, UserIcon } from "../atoms/Icon";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);
    setLoading(true);
    try {
      await register({ name, email, password });
      setOk(true);
      // Puedes redirigir directo al login:
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(err.message || "Error registrando usuario");
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
      {ok && (
        <div className="rounded-lg bg-emerald-500/10 text-emerald-300 px-3 py-2 text-sm ring-1 ring-emerald-500/30">
          ¡Registro exitoso! Redirigiendo…
        </div>
      )}

      <FormField
        id="name"
        label="Nombre"
        type="text"
        placeholder="Tu nombre"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        leftIcon={<UserIcon />}
      />

      <FormField
        id="email"
        label="Correo electrónico"
        type="email"
        placeholder="name@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<MailIcon />}
      />

      <PasswordField
        id="password"
        label="Contraseña"
        placeholder="••••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Creando cuenta..." : "Registrarse"}
      </Button>

      <div className="mt-4 text-center">
        <Link to="/" className="text-sm font-semibold text-brand-primary hover:underline">
          ¿Ya tienes cuenta? Iniciar sesión
        </Link>
      </div>
    </form>
  );
}
