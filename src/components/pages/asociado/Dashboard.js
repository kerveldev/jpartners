import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AsociadoDashboard() {
    return (
        <div className="min-h-screen py-12 px-4 md:px-10 flex items-center justify-center">
            <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl transition-transform hover:scale-[1.01] hover:shadow-gold/60 duration-200">
                <CardContent className="p-6 md:p-12">
                    {/* Encabezado principal */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#62380e] tracking-tight">
                                Mi Panel de Asociado
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">Resumen rápido de tus grupos y pagos</p>
                        </div>
                        <Button className="bg-[#8c4a11] text-white shadow-md text-base px-6 py-2 rounded-xl hover:bg-[#a9641e]">
                            Crear nuevo grupo
                        </Button>
                    </header>

                    {/* Resumen superior */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <Card className="border-0 bg-[#fff9f3] shadow-md rounded-2xl">
                            <CardContent className="p-5">
                                <p className="text-sm text-[#62380e]">Grupos creados</p>
                                <p className="text-3xl font-extrabold text-[#62380e]">5</p>
                                <p className="text-xs text-gray-400">Grupos activos actualmente</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 bg-[#fff9f3] shadow-md rounded-2xl">
                            <CardContent className="p-5">
                                <p className="text-sm text-[#62380e]">Visitantes registrados</p>
                                <p className="text-3xl font-extrabold text-[#62380e]">127</p>
                                <p className="text-xs text-gray-400">Total en todos los grupos</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 bg-[#fff9f3] shadow-md rounded-2xl">
                            <CardContent className="p-5">
                                <p className="text-sm text-[#62380e]">Comisión acumulada</p>
                                <p className="text-3xl font-extrabold text-[#62380e]">$4,850</p>
                                <p className="text-xs text-gray-400">Desde enero 2023</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 bg-[#fff9f3] shadow-md rounded-2xl">
                            <CardContent className="p-5">
                                <p className="text-sm text-[#62380e]">Pagos pendientes</p>
                                <p className="text-3xl font-extrabold text-[#62380e]">$1,200</p>
                                <p className="text-xs text-gray-400">Por recibir este mes</p>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Mis grupos */}
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl md:text-2xl font-semibold text-[#62380e]">
                                Mis grupos
                            </h2>
                            <Button
                                variant="link"
                                className="p-0 text-[#e87517] font-semibold hover:underline"
                            >
                                Ver todos
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {[
                                {
                                    nombre: "Excursión Cascada El Salto",
                                    fecha: "15 mayo 2023",
                                    visitantes: 32,
                                    comision: "$960",
                                    fechaPago: "28 mayo 2023",
                                },
                                {
                                    nombre: "Tour Mirador Las Jaras",
                                    fecha: "2 junio 2023",
                                    visitantes: 45,
                                    comision: "$1,350",
                                    fechaPago: "15 junio 2023",
                                },
                                {
                                    nombre: "Senderismo Bosque Encantado",
                                    fecha: "10 junio 2023",
                                    visitantes: 28,
                                    comision: "$840",
                                    fechaPago: "25 junio 2023",
                                },
                            ].map((grupo, idx) => (
                                <Card
                                    key={idx}
                                    className="border border-[#ffe0b2] bg-white/90 rounded-xl shadow group hover:shadow-lg transition"
                                >
                                    <CardContent className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div>
                                            <p className="font-bold text-[#62380e] text-base md:text-lg">
                                                {grupo.nombre}
                                            </p>
                                            <p className="text-xs text-gray-500">Creado: {grupo.fecha}</p>
                                        </div>
                                        <div className="flex items-center gap-6 mt-3 md:mt-0 w-full md:w-auto">
                                            <div className="flex gap-4 flex-wrap text-sm text-[#62380e]">
                                                <span className="font-medium">Visitantes: {grupo.visitantes}</span>
                                                <span className="font-medium">Comisión: {grupo.comision}</span>
                                                <span className="font-medium">Fecha: {grupo.fechaPago}</span>
                                            </div>
                                            <div className="ml-auto md:ml-4">
                                                <span className="text-sm font-semibold text-[#e87517]">Activo</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Pagos recientes */}
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl md:text-2xl font-semibold text-[#62380e]">
                                Pagos recientes
                            </h2>
                            <Button
                                variant="link"
                                className="p-0 text-[#e87517] font-semibold hover:underline"
                            >
                                Ver estado de cuenta
                            </Button>
                        </div>
                        <div className="bg-white rounded-xl shadow overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="bg-[#fff4e3]">
                                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">
                                        Concepto
                                    </th>
                                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">
                                        Fecha
                                    </th>
                                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">
                                        Monto
                                    </th>
                                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">
                                        Estado
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {[
                                    {
                                        concepto: "Comisión Grupo Cascada",
                                        fecha: "15/05/2023",
                                        monto: "$960",
                                        estado: "Pagado",
                                    },
                                    {
                                        concepto: "Comisión Grupo Mirador",
                                        fecha: "02/06/2023",
                                        monto: "$1,350",
                                        estado: "Pendiente",
                                    },
                                    {
                                        concepto: "Comisión Grupo Bosque",
                                        fecha: "05/06/2023",
                                        monto: "$840",
                                        estado: "Pagado",
                                    },
                                    {
                                        concepto: "Bono por referidos",
                                        fecha: "01/06/2023",
                                        monto: "$500",
                                        estado: "Pagado",
                                    },
                                ].map((pago, idx) => (
                                    <tr key={idx} className="border-t">
                                        <td className="p-3 !text-[#62380e] font-medium">
                                            {pago.concepto}
                                        </td>
                                        <td className="p-3 !text-[#62380e] font-medium">
                                            {pago.fecha}
                                        </td>
                                        <td className="p-3 !text-[#62380e] font-medium">
                                            {pago.monto}
                                        </td>
                                        <td className="p-3">
                                            {pago.estado === "Pagado" ? (
                                                <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                                                    {pago.estado}
                                                </span>
                                            ) : (
                                                <span className="inline-block bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full font-semibold text-sm">
                                                    {pago.estado}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* CTA final */}
                    <section className="mt-10">
                        <div className="bg-[#fbe8d2] rounded-xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm border border-[#ffe0b2]">
                            <p className="text-[#62380e] text-base mb-2 md:mb-0 font-medium">
                                ¿Listo para crear un nuevo grupo? Organiza una nueva visita y aumenta tus comisiones
                            </p>
                            <Button className="bg-[#8c4a11] text-white px-8 py-2 rounded-xl text-base shadow hover:bg-[#a9641e]">
                                Crear grupo
                            </Button>
                        </div>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}
