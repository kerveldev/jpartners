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
            // Asegurar que tenemos los valores por defecto
            const completeGroupData = {
                ...parsedData,
                payment_method: parsedData.payment_method || "cash",
                origin_city: parsedData.origin_city || "Zapopan"
            };
            setGroupData(completeGroupData);
            
            // Initialize with one visitor to start
            const initialVisitors = [{
                id: 1,
                name: "",
                lastname: "",
                birthdate: "",
                email: "",
                phone: ""
            }];
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

    function addVisitor() {
        const newVisitor = {
            id: visitors.length + 1,
            name: "",
            lastname: "",
            birthdate: "",
            email: "",
            phone: ""
        };
        setVisitors(prev => [...prev, newVisitor]);
    }

    function removeVisitor(index) {
        if (visitors.length > 1) {
            setVisitors(prev => prev.filter((_, i) => i !== index));
        }
    }

    function validateVisitors() {
        return visitors.every(visitor => 
            visitor.name.trim() && 
            visitor.lastname.trim() && 
            visitor.birthdate && 
            visitor.email.trim()
            // Teléfono es opcional
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
                payment_method: "cash", // Valor por defecto
                origin_city: "Zapopan", // Valor por defecto
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
        <div className="min-h-screen bg-gray-50">
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

            <div className="max-w-2xl mx-auto p-4">
                <Card className="bg-white shadow-lg rounded-lg">
                    <CardContent className="p-8">
                        <h1 className="text-2xl font-medium text-[#B7804F] mb-2" style={{ fontFamily: 'Roboto Serif, serif' }}>
                            Añadir Visitante Individual
                        </h1>
                        <p className="text-gray-500 mb-8" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                            Complete los datos del visitante para generar su código QR de acceso
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={visitors[0]?.name || ''}
                                    onChange={(e) => handleVisitorChange(0, 'name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#B7804F] bg-gray-50"
                                    placeholder="Ingrese nombre(s)"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    value={visitors[0]?.lastname || ''}
                                    onChange={(e) => handleVisitorChange(0, 'lastname', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#B7804F] bg-gray-50"
                                    placeholder="Ingrese apellido(s)"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                                    Fecha de nacimiento
                                </label>
                                <input
                                    type="date"
                                    value={visitors[0]?.birthdate || ''}
                                    onChange={(e) => handleVisitorChange(0, 'birthdate', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#B7804F] bg-gray-50"
                                    placeholder="día/mes/año"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    value={visitors[0]?.phone || ''}
                                    onChange={(e) => handleVisitorChange(0, 'phone', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#B7804F] bg-gray-50"
                                    placeholder="Ingrese número de teléfono"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Encode Sans, sans-serif' }}>
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    value={visitors[0]?.email || ''}
                                    onChange={(e) => handleVisitorChange(0, 'email', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#B7804F] bg-gray-50"
                                    placeholder="Ingrese correo electrónico"
                                    required
                                />
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#B7804F] text-white hover:bg-[#9A6D42] py-4 rounded-lg font-medium text-lg"
                                    style={{ fontFamily: 'Encode Sans, sans-serif' }}
                                >
                                    {loading ? 'Guardando...' : 'Guardar visitante'}
                                </Button>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <button 
                                    type="button"
                                    onClick={() => router.push('/asociado')}
                                    className="text-[#B7804F] text-sm" 
                                    style={{ fontFamily: 'Encode Sans, sans-serif' }}
                                >
                                    Volver
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        // Mostrar resumen del grupo
                                        console.log('Ver resumen del grupo');
                                    }}
                                    className="text-[#B7804F] text-sm flex items-center gap-1" 
                                    style={{ fontFamily: 'Encode Sans, sans-serif' }}
                                >
                                    Ver resumen del grupo →
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
