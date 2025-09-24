import LoginForm from "../../organisms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
    <h1 className="mb-8 text-center">
  <span className="text-4xl md:text-5xl font-semibold font-sans tracking-tight">
    Lead
  </span>
  <span className="text-4xl md:text-5xl italic font-brandSerif font-medium text-white/90 ml-1 align-baseline">
    Social 360
  </span>
</h1>


        <LoginForm />
      </div>
    </div>
  );
}
