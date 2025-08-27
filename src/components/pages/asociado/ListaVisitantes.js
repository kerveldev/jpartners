import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ListaVisitantes() {
    const visitantes = [
        { id: "V-2023-0458", nombre: "Miguel Rodríguez", tipo: "Adulto", edad: 45, monto: 200 },
        { id: "V-2023-0459", nombre: "Ana Rodríguez", tipo: "Adulto", edad: 42, monto: 200 },
        { id: "V-2023-0460", nombre: "Laura Rodríguez", tipo: "Adolescente", edad: 16, monto: 150 },
        { id: "V-2023-0461", nombre: "Carlos Rodríguez", tipo: "Niño", edad: 10, monto: 100 },
        { id: "V-2023-0462", nombre: "Martín González", tipo: "Adulto", edad: 68, monto: 180 },
    ];

    return (
        <div className="min-h-screen py-12 px-4 md:px-10 flex items-center justify-center">
            <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl transition-transform hover:scale-[1.01] hover:shadow-gold/60 duration-200">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-[#8c4a11] mb-2">Lista de Visitantes Registrados</h1>
                    <p className="text-sm text-gray-600 mb-6">Grupo: Familia Rodríguez - 24 Junio 2023</p>

                    <Card className="mb-6">
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <span className="block text-xs text-gray-500">Total de visitantes</span>
                                <span className="block text-xl font-bold text-[#62380e]">8 personas</span>
                            </div>
                            <div className="bg-white p-4 rounded shadow-sm">
                                <span className="block text-xs text-gray-500">Precio total estimado</span>
                                <span className="block text-xl font-bold text-[#8c4a11]">$1,200.00 MXN</span>
                            </div>
                            <div className="bg-white p-4 rounded shadow-sm">
                                <span className="block text-xs text-gray-500">Comisión estimada</span>
                                <span className="block text-xl font-bold text-[#8c4a11]">$180.00 MXN</span>
                            </div>
                            <div className="bg-white p-4 rounded shadow-sm">
                                <span className="block text-xs text-gray-500">Fecha de visita</span>
                                <span className="block text-xl font-bold text-[#62380e]">24/06/2023</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mb-4 flex justify-end gap-3">
                        <Button className="bg-gray-300 text-black">Imprimir</Button>
                        <Button className="bg-gray-300 text-black">Descargar</Button>
                    </div>

                    <div className="bg-white rounded-lg shadow divide-y">
                        {visitantes.map((v) => (
                            <div key={v.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-[#62380e]">{v.nombre}</div>
                                    <div className="text-sm text-gray-500">{v.tipo} • {v.edad} años</div>
                                    <div className="text-xs text-gray-400 mt-2">ID: #{v.id}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-[#8c4a11]">${v.monto}.00 MXN</div>
                                    <div className="mt-2 w-12 h-12 bg-white border rounded flex items-center justify-center">
                                        {/* placeholder QR */}
                                        <div className="w-8 h-8 bg-black" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <button className="w-full bg-[#8c4a11] text-white py-3 rounded font-semibold">Finalizar Grupo</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
