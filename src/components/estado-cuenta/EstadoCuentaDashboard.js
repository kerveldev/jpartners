import { Card, CardContent } from "@/components/ui/card";
import Filtros from "./Filtros";
import EstadoCuentaTable from "./EstadoCuentaTable";
import Resumen from "./Resumen";

export default function EstadoCuentaDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5eee5] to-[#ffe7cf] py-10 px-2 md:px-10 flex justify-center">
            <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl">
                <CardContent className="p-6 md:p-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#62380e] mb-2">
                        Estado de Cuenta
                    </h1>
                    <p className="text-sm text-gray-500 mb-6">
                        Visualiza y administra tus transacciones
                    </p>
                    <Filtros />
                    <EstadoCuentaTable />
                    <Resumen />
                </CardContent>
            </Card>
        </div>
    );
}
