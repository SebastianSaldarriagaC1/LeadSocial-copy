export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full h-12 rounded-xl bg-inputbg text-white placeholder-slate-400 
                  px-4 pr-12 outline-none ring-1 ring-transparent
                  focus:ring-2 focus:ring-brand-primary transition
                  ${className}`}
      {...props}
    />
  );
}
