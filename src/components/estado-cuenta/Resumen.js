export default function Resumen({ summary = {} }) {
    const {
        total_paid = 0,
        total_pending = 0,
        balance_total = 0,
        progress_pct = 0
    } = summary;

    return (
        <section className="bg-[#fff9f3] rounded-2xl p-5 mt-2 shadow border border-[#ffe0b2]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffefe0]">
                        <span className="block text-xs text-gray-500">Total pagado</span>
                        <span className="block text-2xl font-bold text-green-600">
                            ${total_paid.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffefe0]">
                        <span className="block text-xs text-gray-500">Total pendiente</span>
                        <span className="block text-2xl font-bold text-[#e87517]">
                            ${total_pending.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffefe0]">
                        <span className="block text-xs text-gray-500">Balance total</span>
                        <span className="block text-2xl font-bold text-[#8c4a11]">
                            ${balance_total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                <div className="flex items-center md:justify-end w-full md:w-auto">
                    <button className="bg-white text-[#8c4a11] font-semibold px-4 py-2 rounded-xl border border-[#e4d1b0] shadow hover:bg-[#fffaf5] transition-colors">
                        Descargar PDF
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="w-full md:w-11/12">
                    <div className="mb-1 text-xs text-[#8c4a11] font-semibold flex justify-between">
                        <span>Progreso de pagos</span>
                        <span>{progress_pct}%</span>
                    </div>
                    <div className="h-3 rounded-lg bg-[#fbe8d2] relative overflow-hidden">
                        <div
                            className="h-full bg-[#8c4a11] rounded-lg transition-all duration-300"
                            style={{ width: `${progress_pct}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
