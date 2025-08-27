import { Card, CardContent } from "@/components/ui/card";
import Filtros from "./Filtros";
import EstadoCuentaTable from "./EstadoCuentaTable";
import Resumen from "./Resumen";

export default function EstadoCuentaDashboard() {
    return (
        <div className="min-h-screen py-12 px-4 md:px-10 flex items-center justify-center">
            <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl transition-transform hover:scale-[1.01] hover:shadow-gold/60 duration-200">
                <CardContent className="p-6 md:p-12">
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
