import { Card, CardContent } from "@/components/ui/card";

export default function Filtros() {
    return (
        <section className="mb-5">
            <Card className="bg-[#fff9f3] border-0 shadow rounded-2xl mb-3">
                <CardContent className="p-4">
                    <span className="block font-semibold text-[#62380e] mb-3">Filtros</span>
                    <div className="flex flex-wrap gap-2 items-end">
                        <select className="border border-gray-300 rounded px-3 py-2 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none">
                            <option>Todos los estados</option>
                            <option>Pagado</option>
                            <option>Pendiente</option>
                        </select>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none"
                            placeholder="Desde"
                        />
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none"
                            placeholder="Hasta"
                        />

                        <button className="bg-[#8c4a11] text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-[#a9641e]">
                            Buscar
                        </button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
