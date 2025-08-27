"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VisitanteIndividual() {
    const [qrGenerated, setQrGenerated] = useState(false);
    const [form, setForm] = useState({ nombre: "", edad: "", telefono: "", email: "" });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    function generarQr() {
        // placeholder visual; in a real app generate a QR image
        setQrGenerated(true);
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-10 flex justify-center">
            <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl transition-transform hover:scale-[1.01] duration-200">
                <CardContent className="p-6 md:p-12">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#8c4a11] mb-2">Añadir Visitante Individual</h1>
                    <p className="text-sm text-gray-500 mb-6">Complete los datos del visitante para generar su código QR de acceso</p>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-1">Nombre completo</label>
                            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ingrese nombre completo" className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400 bg-white text-[#171717]" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-1">Edad</label>
                            <input name="edad" value={form.edad} onChange={handleChange} placeholder="Ingrese edad" className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400 bg-white text-[#171717]" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-1">Teléfono</label>
                            <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Ingrese número de teléfono" className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400 bg-white text-[#171717]" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#62380e] mb-1">Correo electrónico</label>
                            <input name="email" value={form.email} onChange={handleChange} placeholder="Ingrese correo electrónico" className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400 bg-white text-[#171717]" />
                        </div>

                        <div className="my-4 border-t pt-4"></div>

                        <h3 className="text-sm font-semibold text-[#62380e] mb-3">Opciones de código QR</h3>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="w-full md:w-1/2">
                                <Button type="button" className="w-full bg-[#8c4a11]" onClick={generarQr}>Generar código QR</Button>
                            </div>

                            <div className="w-full md:w-1/2 flex justify-center">
                                <div className="w-40 h-40 bg-white border border-gray-200 rounded-md flex items-center justify-center">
                                    {qrGenerated ? (
                                        // simple SVG placeholder for QR
                                        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="120" height="120" fill="#fff" />
                                            <g fill="#111">
                                                <rect x="10" y="10" width="30" height="30" />
                                                <rect x="80" y="10" width="30" height="30" />
                                                <rect x="10" y="80" width="30" height="30" />
                                                <rect x="50" y="50" width="10" height="10" />
                                                <rect x="70" y="50" width="10" height="10" />
                                                <rect x="50" y="70" width="10" height="10" />
                                                <rect x="30" y="30" width="8" height="8" />
                                                <rect x="90" y="90" width="6" height="6" />
                                            </g>
                                        </svg>
                                    ) : (
                                        <span className="text-xs text-gray-400">QR no generado</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <h3 className="text-sm font-semibold text-[#62380e] mt-4">Enviar código QR</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button type="button" className="w-full bg-gray-700 text-white rounded px-4 py-2">Enviar por WhatsApp</button>
                            <button type="button" className="w-full bg-gray-700 text-white rounded px-4 py-2">Enviar por Email</button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <button type="button" className="w-full bg-[#8c4a11] text-white rounded px-4 py-2">Guardar visitante</button>
                            <button type="button" className="w-full bg-[#8c4a11] text-white rounded px-4 py-2">Guardar y añadir otro</button>
                        </div>

                        <div className="flex justify-between items-center mt-4 text-sm">
                            <a href="/asociado" className="text-[#8c4a11]">Volver</a>
                            <a href="#" className="text-gray-600">Ver resumen del grupo →</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
