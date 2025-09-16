"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VisitanteIndividual() {
    const router = useRouter();
    const [groupData, setGroupData] = useState(null);
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState(null);

    useEffect(() => {
        const storedGroupData = sessionStorage.getItem('groupData');
        if (storedGroupData) {
            const parsedData = JSON.parse(storedGroupData);
            setGroupData(parsedData);
            
            // Initialize visitors array based on visitors_count
            const initialVisitors = Array.from({ length: parsedData.visitors_count }, (_, index) => ({
                id: index + 1,
                name: "",
                lastname: "",
                birthdate: "",
                email: ""
            }));
            setVisitors(initialVisitors);
        } else {
            // If no group data, redirect back to create group
            router.push('/asociado/crear');
        }
    }, [router]);

    function handleVisitorChange(index, field, value) {
        setVisitors(prev => prev.map((visitor, i) => 
            i === index ? { ...visitor, [field]: value } : visitor
        ));
    }

    function validateVisitors() {
        return visitors.every(visitor => 
            visitor.name.trim() && 
            visitor.lastname.trim() && 
            visitor.birthdate && 
            visitor.email.trim()
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateVisitors()) {
            alert("Por favor complete todos los campos de todos los visitantes");
            return;
        }

        if (!groupData) {
            alert("Error: No se encontraron los datos del grupo");
            return;
        }

        setLoading(true);

        try {
            const requestBody = {
                promoter_id: groupData.promoter_id,
                group_name: groupData.group_name,
                visit_date: groupData.visit_date,
                payment_method: groupData.payment_method,
                origin_city: groupData.origin_city,
                visitors: visitors.map(visitor => ({
                    name: visitor.name,
                    lastname: visitor.lastname,
                    birthdate: visitor.birthdate,
                    email: visitor.email
                }))
            };

            console.log('Enviando datos:', requestBody);

            const response = await fetch('https://lasjaras-api.kerveldev.com/api/promoter-groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Respuesta de la API:', result);
            
            setSuccessData(result);
            sessionStorage.removeItem('groupData'); // Clear stored data
            
        } catch (error) {
            console.error('Error al crear el grupo:', error);
            alert(`Error al crear el grupo: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    // Success screen
    if (successData) {
        return (
            <div className="min-h-screen py-12 px-4 md:px-10 flex justify-center">
                <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl transition-transform hover:scale-[1.01] duration-200">
                    <CardContent className="p-6 md:p-12">
                        <h1 className="text-3xl md:text-3xl font-bold text-[#B7804F] mb-2" style={{ fontFamily: 'Roboto Serif, serif', fontWeight: 'medium' }}>
                            ¡Grupo Creado Exitosamente!
                        </h1>
                        <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'regular' }}>
                            El grupo ha sido registrado correctamente en el sistema
                        </p>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                            <h2 className="text-lg font-semibold text-[#B7804F] mb-4" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>
                                Resumen del Grupo
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm font-semibold text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>ID del Grupo:</p>
                                    <p className="text-lg font-bold text-[#B7804F]">{successData.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Nombre:</p>
                                    <p className="text-lg font-bold text-[#B7804F]">{successData.group_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Fecha de Visita:</p>
                                    <p className="text-lg font-bold text-[#B7804F]">{successData.visit_date}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Banda:</p>
                                    <p className="text-lg font-bold text-[#B7804F]">{successData.band}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-white rounded p-4 border">
                                    <p className="text-sm font-semibold text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Visitantes</p>
                                    <p className="text-2xl font-bold text-[#B7804F]">{successData.visitors_count}</p>
                                </div>
                                <div className="bg-white rounded p-4 border">
                                    <p className="text-sm font-semibold text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Precio Total</p>
                                    <p className="text-2xl font-bold text-[#B7804F]">${successData.total_price}</p>
                                </div>
                                <div className="bg-white rounded p-4 border">
                                    <p className="text-sm font-semibold text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Comisión Total</p>
                                    <p className="text-2xl font-bold text-[#B7804F]">${successData.commission_total}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-[#B7804F] mb-3" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>
                                    Visitantes Registrados
                                </h3>
                                <div className="space-y-2">
                                    {successData.visitors.map((visitor, index) => (
                                        <div key={visitor.id} className="bg-white rounded p-3 border flex justify-between items-center">
                                            <span className="font-medium text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                                                {visitor.name}
                                            </span>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Precio: ${visitor.price}</p>
                                                <p className="text-sm text-gray-600">Neto: ${visitor.net_price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={() => router.push('/asociado')}
                                className="flex-1 bg-[#B7804F] text-white hover:bg-[#9A6D42]"
                                style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}
                            >
                                Volver al Dashboard
                            </Button>
                            <Button
                                onClick={() => {
                                    sessionStorage.removeItem('groupData');
                                    router.push('/asociado/crear');
                                }}
                                variant="outline"
                                className="flex-1 border-[#B7804F] text-[#B7804F] hover:bg-[#B7804F] hover:text-white"
                                style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}
                            >
                                Crear Otro Grupo
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!groupData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#B7804F]" style={{ fontFamily: 'Encode Sans, sans-serif' }}>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-10 flex justify-center">
            <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl transition-transform hover:scale-[1.01] duration-200">
                <CardContent className="p-6 md:p-12">
                    <h1 className="text-3xl md:text-3xl font-bold text-[#B7804F] mb-2" style={{ fontFamily: 'Roboto Serif, serif', fontWeight: 'medium' }}>
                        Registrar Visitantes
                    </h1>
                    <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'regular' }}>
                        Complete los datos de los {groupData.visitors_count} visitantes para el grupo &ldquo;{groupData.group_name}&rdquo;
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {visitors.map((visitor, index) => (
                            <div key={visitor.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                <h3 className="text-lg font-semibold text-[#B7804F] mb-4" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>
                                    Visitante {index + 1}
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#B7804F] mb-1" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            value={visitor.name}
                                            onChange={(e) => handleVisitorChange(index, 'name', e.target.value)}
                                            className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400 bg-white text-[#171717]"
                                            placeholder="Ej: Juan"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#B7804F] mb-1" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>
                                            Apellido *
                                        </label>
                                        <input
                                            type="text"
                                            value={visitor.lastname}
                                            onChange={(e) => handleVisitorChange(index, 'lastname', e.target.value)}
                                            className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400 bg-white text-[#171717]"
                                            placeholder="Ej: Pérez"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#B7804F] mb-1" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>
                                            Fecha de Nacimiento *
                                        </label>
                                        <input
                                            type="date"
                                            value={visitor.birthdate}
                                            onChange={(e) => handleVisitorChange(index, 'birthdate', e.target.value)}
                                            className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400 bg-white text-[#171717]"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#B7804F] mb-1" style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}>
                                            Correo Electrónico *
                                        </label>
                                        <input
                                            type="email"
                                            value={visitor.email}
                                            onChange={(e) => handleVisitorChange(index, 'email', e.target.value)}
                                            className="w-full border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400 bg-white text-[#171717]"
                                            placeholder="ejemplo@correo.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#B7804F] text-white hover:bg-[#9A6D42]"
                                style={{ fontFamily: 'Encode Sans, sans-serif', fontWeight: 'semibold' }}
                            >
                                {loading ? 'Creando Grupo...' : `Crear Grupo con ${groupData.visitors_count} Visitantes`}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-[#B7804F] pt-2">
                            <button 
                                type="button"
                                onClick={() => router.push('/asociado/crear')}
                                className="underline" 
                                style={{ fontFamily: 'Encode Sans, sans-serif' }}
                            >
                                Volver al formulario del grupo
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
