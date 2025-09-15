export default function EstadoCuentaTable({ data = [], loading = false }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-MX");
    };

    const getStatusDisplay = (status) => {
        switch (status) {
            case "paid":
                return { text: "Pagado", color: "text-green-600" };
            case "pending":
                return { text: "Pendiente", color: "text-yellow-700" };
            case "overdue":
                return { text: "Vencido", color: "text-red-600" };
            default:
                return { text: status || "N/A", color: "text-gray-600" };
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow mb-8 overflow-x-auto">
                <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8c4a11]"></div>
                    <span className="ml-3 text-[#62380e]">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow mb-8 overflow-x-auto">
                <div className="flex justify-center items-center p-8">
                    <span className="text-gray-500">No se encontraron resultados</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow mb-8 overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-3 text-left text-sm text-[#62380e] font-semibold">Fecha</th>
                    <th className="p-3 text-left text-sm text-[#62380e] font-semibold">Concepto</th>
                    <th className="p-3 text-left text-sm text-[#62380e] font-semibold">Monto</th>
                    <th className="p-3 text-left text-sm text-[#62380e] font-semibold">Estado</th>
                    <th className="p-3 text-left text-sm text-[#62380e] font-semibold">Grupo</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, idx) => {
                    const statusInfo = getStatusDisplay(item.status);
                    return (
                        <tr key={idx} className="border-t last:border-b">
                            <td className="p-3 text-[#62380e] font-medium">
                                {formatDate(item.date)}
                            </td>
                            <td className="p-3 text-[#62380e] font-medium">
                                {item.concept}
                            </td>
                            <td className="p-3 text-[#62380e] font-bold">
                                ${item.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                            </td>
                            <td className="p-3">
                                <span className={`${statusInfo.color} font-semibold`}>
                                    {statusInfo.text}
                                </span>
                            </td>
                            <td className="p-3 text-[#62380e] font-medium">
                                Grupo {item.group_id}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
