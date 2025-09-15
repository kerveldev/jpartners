"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CrearGrupo() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        promoter_id: 1, // Se puede hacer dinámico en el futuro
        group_name: "",
        visit_date: "",
        payment_method: "cash",
        origin_city: "",
        visitors_count: 1
    });
    const [tags, setTags] = useState({ guia: true, almuerzo: false });
    const [loading, setLoading] = useState(false);

    function toggleTag(key) {
        setTags((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleVisitorsCountChange(increment) {
        setFormData(prev => ({
            ...prev,
            visitors_count: Math.max(1, prev.visitors_count + increment)
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.group_name || !formData.visit_date || !formData.origin_city) {
            alert("Por favor complete todos los campos obligatorios");
            return;
        }

        setLoading(true);

        // Store form data in sessionStorage to pass to visitor form
        sessionStorage.setItem('groupData', JSON.stringify(formData));

        // Navigate to visitor form
        router.push('/asociado/visitante');
    }

    return (
         <div className="min-h-screen py-12 px-4 md:px-10 flex justify-center">
            <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl transition-transform hover:scale-[1.01] duration-200">
                <CardContent className="p-6 md:p-12">
                    <h1 className="text-3xl md:text-3xl font-bold text-[#B7804F] mb-2" style={{ fontFamily: 'Roboto Serif, serif', fontWeight: 'medium' }}>Crear Nuevo Grupo</h1>
                    <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'regular' }}>Complete el formulario para registrar un nuevo grupo de visitantes</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#B7804F] mb-1" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>Nombre del grupo *</label>
                            <input
                                name="group_name"
                                value={formData.group_name}
                                onChange={handleInputChange}
                                className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400"
                                placeholder="Ej: Limpieza energética de Las Jaras"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#B7804F] mb-1" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>Fecha de visita *</label>
                            <input
                                name="visit_date"
                                type="date"
                                value={formData.visit_date}
                                onChange={handleInputChange}
                                className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#B7804F] mb-1" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>Ciudad de origen *</label>
                            <input
                                name="origin_city"
                                value={formData.origin_city}
                                onChange={handleInputChange}
                                className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400"
                                placeholder="Ej: Zapopan"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#B7804F] mb-1" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>Método de pago</label>
                            <select
                                name="payment_method"
                                value={formData.payment_method}
                                onChange={handleInputChange}
                                className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400"
                            >
                                <option value="cash">Efectivo</option>
                                <option value="card">Tarjeta</option>
                                <option value="transfer">Transferencia</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#B7804F] mb-1" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>Número de personas</label>
                            <div className="inline-flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleVisitorsCountChange(-1)}
                                    aria-label="decrementar"
                                    className="px-3 py-1 border rounded bg-white text-[#B7804F] border-gray-200 hover:bg-[#f5efe6] font-semibold"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={formData.visitors_count}
                                    readOnly
                                    className="px-4 py-2 border rounded w-20 text-center placeholder:text-gray-400 bg-white text-[#B7804F] border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleVisitorsCountChange(1)}
                                    aria-label="incrementar"
                                    className="px-3 py-1 border rounded bg-white text-[#B7804F] border-gray-200 hover:bg-[#f5efe6] font-semibold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#B7804F] mb-2" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>Tipo de grupo</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span className="text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Estudiantes</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span className="text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Tercera Edad</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span className="text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Especial</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="radio" name="tipo" />
                                    <span className="text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>General</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#B7804F] mb-2" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>Etiquetas del grupo</label>
                            <p className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Seleccione las características que aplican a este grupo</p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    aria-pressed={tags.guia}
                                    onClick={() => toggleTag("guia")}
                                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold transition-colors ${tags.guia ? "bg-[#B7804F] text-white" : "bg-white text-[#B7804F] border border-gray-200"}`}
                                    style={{ fontFamily: 'Encode Sans, sans-serif' }}
                                >
                                    Requiere guía
                                </button>

                                <button
                                    type="button"
                                    aria-pressed={tags.almuerzo}
                                    onClick={() => toggleTag("almuerzo")}
                                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold transition-colors ${tags.almuerzo ? "bg-[#B7804F] text-white" : "bg-white text-[#B7804F] border border-gray-200"}`}
                                    style={{ fontFamily: 'Encode Sans, sans-serif' }}
                                >
                                    Con almuerzo
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span className="text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Accesibilidad</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span className="text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Taller</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span className="text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Transporte</span>
                                </label>
                                <label className="border rounded px-3 py-2 flex items-center gap-2">
                                    <input type="checkbox" /> <span className="text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Internacional</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#B7804F] text-white hover:bg-[#9A6D42]"
                                style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}
                            >
                                {loading ? 'Cargando...' : 'Añadir visitantes'}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-[#B7804F] pt-2">
                            <a href="/asociado" className="underline" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Cancelar y volver al inicio</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
