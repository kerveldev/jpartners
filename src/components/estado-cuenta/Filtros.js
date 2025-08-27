import { Card, CardContent } from "@/components/ui/card";

export default function Filtros() {
    return (
        <section className="mb-5">
            <Card className="bg-[#fff9f3] border-0 shadow rounded-2xl mb-3">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="block font-semibold text-[#62380e]">Filtros</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                        <select className="border border-gray-200 rounded px-3 py-2 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none">
                            <option>Todos los estados</option>
                            <option>Pagado</option>
                            <option>Pendiente</option>
                        </select>
                        <input
                            type="date"
                            className="border border-gray-200 rounded px-3 py-2 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none"
                            placeholder="Desde"
                        />
                        <input
                            type="date"
                            className="border border-gray-200 rounded px-3 py-2 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none"
                            placeholder="Hasta"
                        />

                        <div className="flex justify-start md:justify-end">
                            <button className="bg-[#8c4a11] text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-[#a9641e]">
                                Buscar
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
