export function Button({ children, className = "", ...props }) {
    return (
        <button
            className={`px-4 py-2 rounded text-sm font-semibold bg-[#b45f17] text-white hover:opacity-90 transition ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
