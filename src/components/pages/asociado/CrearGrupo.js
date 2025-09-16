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
        payment_method: "cash", // Valor por defecto
        origin_city: "Zapopan", // Valor por defecto
    });
    const [loading, setLoading] = useState(false);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.group_name || !formData.visit_date) {
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
         <div className="min-h-screen bg-gray-50 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4 py-3 bg-white shadow-sm">
                <h1 className="text-2xl font-medium text-gray-600" style={{ fontFamily: 'Roboto Serif, serif' }}>LAS JARAS</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Estado de Cuenta</span>
                    <span className="text-gray-600">Mis Grupos</span>
                    <span className="text-gray-600">Perfil</span>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-600">Carlos M.</span>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <Card className="bg-white shadow-lg rounded-lg">
                    <CardContent className="p-8">
                        <h1 className="text-2xl font-medium text-[#B7804F] mb-2" style={{ fontFamily: 'Roboto Serif, serif' }}>
                            Crear Nuevo Grupo
                        </h1>
                        <p className="text-gray-500 mb-8" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                            Complete el formulario para registrar un nuevo grupo de visitantes
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                                    Nombre del grupo
                                </label>
                                <input
                                    name="group_name"
                                    value={formData.group_name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500 placeholder:text-gray-400 focus:outline-none focus:border-[#B7804F]"
                                    placeholder="Ej: Colegio San José 5° Grado"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                                    Fecha de visita
                                </label>
                                <input
                                    name="visit_date"
                                    type="date"
                                    value={formData.visit_date}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500 focus:outline-none focus:border-[#B7804F]"
                                    placeholder="DD/MM/AAAA"
                                    required
                                />
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-600" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                                    Para crear un nuevo grupo debes añadir por lo menos 1 visitante.
                                </p>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#B7804F] text-white hover:bg-[#9A6D42] py-4 rounded-lg font-medium text-lg"
                                    style={{ fontFamily: 'Encode Sans, sans-serif' }}
                                >
                                    {loading ? 'Cargando...' : 'Añadir visitantes'}
                                </Button>
                            </div>

                            <div className="text-center pt-4">
                                <button 
                                    type="button"
                                    onClick={() => router.push('/asociado')}
                                    className="text-[#B7804F] text-sm underline" 
                                    style={{ fontFamily: 'Encode Sans, sans-serif' }}
                                >
                                    Cancelar y volver al inicio
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
                <div className="flex justify-around items-center max-w-md mx-auto">
                    <button className="flex flex-col items-center gap-1 text-gray-400">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <span className="text-xs">Inicio</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <span className="text-xs">Grupos</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-[#B7804F]">
                        <div className="w-6 h-6 bg-[#B7804F] rounded"></div>
                        <span className="text-xs">Crear</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <span className="text-xs">Pagos</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <span className="text-xs">Perfil</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
