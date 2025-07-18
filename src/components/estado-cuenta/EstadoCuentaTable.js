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
                <tr className="bg-[#fff4e3]">
                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">Fecha</th>
                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">Concepto</th>
                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">Monto</th>
                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">Estado</th>
                </tr>
                </thead>
                <tbody>
                {movimientos.map((m, idx) => (
                    <tr key={idx} className="border-t">
                        <td className="p-3 !text-[#62380e] font-medium">{m.fecha}</td>
                        <td className="p-3 !text-[#62380e] font-medium">{m.concepto}</td>
                        <td className="p-3 !text-[#62380e] font-bold">
                            ${m.monto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3">
                <span className={
                    m.estado === "Pagado"
                        ? "bg-green-100 text-green-600 px-3 py-1 rounded-xl font-bold"
                        : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-xl font-bold"
                }>
                  {m.estado}
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
