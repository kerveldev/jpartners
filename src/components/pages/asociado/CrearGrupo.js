import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CrearGrupo() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5eee5] to-[#ffe7cf] py-12 px-4 md:px-10 flex justify-center">
            <Card className="w-full max-w-3xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl">
                <CardContent className="p-6 md:p-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#8c4a11] mb-2">Crear Nuevo Grupo</h1>
                    <p className="text-sm text-gray-500 mb-6">Complete el formulario para registrar un nuevo grupo de visitantes</p>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-1">Nombre del grupo</label>
                            <input className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400" placeholder="Ej: Colegio San José 5° Grado" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-1">Fecha de visita</label>
                            <input type="text" className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400" placeholder="DD/MM/AAAA" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-1">Número de personas</label>
                            <div className="inline-flex items-center gap-3">
                                <button type="button" className="px-3 py-1 border rounded">-</button>
                                <input type="number" className="px-4 py-2 border rounded w-20 text-center placeholder:text-gray-400" placeholder="25" />
                                <button type="button" className="px-3 py-1 border rounded">+</button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-2">Tipo de grupo</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span>Estudiantes</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span>Tercera Edad</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span>Especial</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span>General</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-2">Etiquetas del grupo</label>
                            <p className="text-xs text-gray-500 mb-2">Seleccione las características que aplican a este grupo</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-block bg-[#e6b88a] text-white px-3 py-1 rounded-full">Requiere guía</span>
                                <span className="inline-block bg-[#e6b88a] text-white px-3 py-1 rounded-full">Con almuerzo</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span>Accesibilidad</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span>Taller</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span>Transporte</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span>Internacional</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button className="w-full bg-[#8c4a11]">Añadir visitantes</Button>
                        </div>

                        <div className="text-center text-sm text-[#8c4a11] pt-2">
                            <a href="/asociado" className="underline">Cancelar y volver al inicio</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
