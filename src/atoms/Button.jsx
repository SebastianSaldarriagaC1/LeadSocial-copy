export default function Button({ children, className = "", ...props }) {
    return (
        <button
            className={`w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl 
                  bg-brand-primary text-white font-semibold 
                  hover:opacity-95 active:opacity-90 transition
                  focus:outline-none focus:shadow-focus-blue
                  ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
