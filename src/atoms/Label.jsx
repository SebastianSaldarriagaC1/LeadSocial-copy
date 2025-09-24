export default function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-200 mb-2">
      {children}
    </label>
  );
}
