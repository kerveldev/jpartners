"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CrearGrupo() {
    const [tags, setTags] = useState({ guia: true, almuerzo: false });

    function toggleTag(key) {
        setTags((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    return (
         <div className="min-h-screen py-12 px-4 md:px-10 flex justify-center">
            <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl transition-transform hover:scale-[1.01] duration-200">
                <CardContent className="p-6 md:p-12">
                    <h1 className="text-3xl md:text-3xl font-bold text-[#8c4a11] mb-2">Crear Nuevo Grupo</h1>
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
                                <button
                                    type="button"
                                    aria-label="decrementar"
                                    className="px-3 py-1 border rounded bg-white text-[#62380e] border-gray-200 hover:bg-[#f5efe6] font-semibold"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="px-4 py-2 border rounded w-20 text-center placeholder:text-gray-400 bg-white text-[#62380e] border-gray-200"
                                    placeholder="25"
                                />
                                <button
                                    type="button"
                                    aria-label="incrementar"
                                    className="px-3 py-1 border rounded bg-white text-[#62380e] border-gray-200 hover:bg-[#f5efe6] font-semibold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-2">Tipo de grupo</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span className="text-[#62380e]">Estudiantes</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span className="text-[#62380e]">Tercera Edad</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span className="text-[#62380e]">Especial</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span className="text-[#62380e]">General</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-2">Etiquetas del grupo</label>
                            <p className="text-xs text-gray-500 mb-2">Seleccione las características que aplican a este grupo</p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    aria-pressed={tags.guia}
                                    onClick={() => toggleTag("guia")}
                                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold transition-colors ${tags.guia ? "bg-[#8c4a11] text-white" : "bg-white text-[#62380e] border border-gray-200"}`}
                                >
                                    Requiere guía
                                </button>

                                <button
                                    type="button"
                                    aria-pressed={tags.almuerzo}
                                    onClick={() => toggleTag("almuerzo")}
                                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold transition-colors ${tags.almuerzo ? "bg-[#8c4a11] text-white" : "bg-white text-[#62380e] border border-gray-200"}`}
                                >
                                    Con almuerzo
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span className="text-[#62380e]">Accesibilidad</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span className="text-[#62380e]">Taller</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span className="text-[#62380e]">Transporte</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span className="text-[#62380e]">Internacional</span>
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
