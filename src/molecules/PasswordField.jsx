import { useState } from "react";
import FormField from "./FormField";
import { LockIcon, EyeIcon } from "../atoms/Icon";

export default function PasswordField({ id = "password", label = "Password", ...props }) {
  const [show, setShow] = useState(false);
  return (
    <FormField
      id={id}
      label={label}
      type={show ? "text" : "password"}
      leftIcon={<LockIcon />}
      rightSlot={
        <button
          type="button"
          className="p-1 rounded-md hover:text-white/90 focus:outline-none focus:shadow-focus-blue"
          onClick={() => setShow(s => !s)}
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <EyeIcon open={show} />
        </button>
      }
      autoComplete="current-password"
      {...props}
    />
  );
}
