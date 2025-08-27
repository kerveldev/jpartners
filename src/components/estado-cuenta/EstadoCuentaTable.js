export default function EstadoCuentaTable() {
    const movimientos = [
        { fecha: "15/05/2023", concepto: "Cuota mensual", monto: 1500, estado: "Pagado" },
        { fecha: "01/06/2023", concepto: "Mantenimiento", monto: 2300, estado: "Pagado" },
        { fecha: "15/06/2023", concepto: "Cuota mensual", monto: 1500, estado: "Pagado" },
        { fecha: "01/07/2023", concepto: "Mantenimiento", monto: 2300, estado: "Pendiente" },
        { fecha: "15/07/2023", concepto: "Cuota mensual", monto: 1500, estado: "Pendiente" },
    ];

    return (
        <div className="bg-white rounded-xl shadow mb-8 overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-3 text-left text-sm text-[#62380e] font-semibold">Fecha</th>
                    <th className="p-3 text-left text-sm text-[#62380e] font-semibold">Concepto</th>
                    <th className="p-3 text-left text-sm text-[#62380e] font-semibold">Monto</th>
                    <th className="p-3 text-left text-sm text-[#62380e] font-semibold">Estado</th>
                </tr>
                </thead>
                <tbody>
                {movimientos.map((m, idx) => (
                    <tr key={idx} className="border-t last:border-b">
                        <td className="p-3 text-[#62380e] font-medium">{m.fecha}</td>
                        <td className="p-3 text-[#62380e] font-medium">{m.concepto}</td>
                        <td className="p-3 text-[#62380e] font-bold">{`$${m.monto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`}</td>
                        <td className="p-3">
                            {m.estado === "Pagado" ? (
                                <span className="text-green-600 font-semibold">{m.estado}</span>
                            ) : (
                                <span className="text-yellow-700 font-semibold">{m.estado}</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
