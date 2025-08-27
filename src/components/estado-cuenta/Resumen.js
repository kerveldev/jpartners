export default function Resumen() {
    // Hardcodeo de datos como en la UI
    const pagado = 5300;
    const pendiente = 3800;
    const balance = 9100;
    const progreso = Math.round((pagado / (pagado + pendiente)) * 100);

    return (
        <section className="bg-[#fff9f3] rounded-2xl p-5 mt-2 shadow border border-[#ffe0b2]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffefe0]">
                        <span className="block text-xs text-gray-500">Total pagado</span>
                        <span className="block text-2xl font-bold text-green-600">
              ${pagado.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffefe0]">
                        <span className="block text-xs text-gray-500">Total pendiente</span>
                        <span className="block text-2xl font-bold text-[#e87517]">
              ${pendiente.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffefe0]">
                        <span className="block text-xs text-gray-500">Balance total</span>
                        <span className="block text-2xl font-bold text-[#8c4a11]">
              ${balance.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
                    </div>
                </div>

                <div className="flex items-center md:justify-end w-full md:w-auto">
                    <button className="bg-white text-[#8c4a11] font-semibold px-4 py-2 rounded-xl border border-[#e4d1b0] shadow hover:bg-[#fffaf5]">
                        Descargar PDF
                    </button>
                </div>
            </div>

            {/* Barra de progreso */}
            <div className="flex items-center justify-between">
                <div className="w-full md:w-11/12">
                    <div className="mb-1 text-xs text-[#8c4a11] font-semibold flex justify-between">
                        <span>Progreso de pagos</span>
                        <span>{progreso}%</span>
                    </div>
                    <div className="h-3 rounded-lg bg-[#fbe8d2] relative overflow-hidden">
                        <div
                            className="h-full bg-[#8c4a11] rounded-lg transition-all duration-300"
                            style={{ width: `${progreso}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
