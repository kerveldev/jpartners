"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

export default function AsociadoDashboard() {
    const router = useRouter();
    const [groupsData, setGroupsData] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 10,
        total: 0,
        last_page: 1
    });
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState({
        totalGroups: 0,
        totalVisitors: 0,
        totalCommission: 0,
        pendingPayments: 0
    });

    const fetchGroupsData = async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                promoter_id: "1",
                status: "active",
                per_page: "10",
                page: page.toString()
            });

            const response = await fetch(`https://lasjaras-api.kerveldev.com/api/promoter-groups?${params}`);
            const result = await response.json();

            setGroupsData(result.data || []);
            setPagination(result.meta || {});

            // Calculate summary from the data
            const totalVisitors = result.data?.reduce((sum, group) => sum + group.visitors_count, 0) || 0;
            const totalCommission = result.data?.reduce((sum, group) => sum + group.commission_total, 0) || 0;

            setSummary({
                totalGroups: result.meta?.total || 0,
                totalVisitors,
                totalCommission,
                pendingPayments: 1200 // This would come from another API
            });
        } catch (error) {
            console.error("Error fetching groups data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroupsData(1);
    }, []);

    const handlePageChange = (page) => {
        fetchGroupsData(page);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount);
    };
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="py-12 px-4 md:px-10 flex items-center justify-center">
                <Card className="w-full max-w-6xl bg-white/95 border border-[#e4d1b0] shadow-2xl rounded-3xl transition-transform hover:scale-[1.01] hover:shadow-gold/60 duration-200">
                    <CardContent className="p-6 md:p-12">
                    {/* Encabezado principal */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#62380e] tracking-tight">
                                Mi Panel de Asociado
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">Resumen rápido de tus grupos y pagos</p>
                        </div>
                        <Button
                            onClick={() => router.push('/asociado/crear')}
                            className="bg-[#8c4a11] text-white shadow-md text-base px-6 py-2 rounded-xl hover:bg-[#a9641e]"
                        >
                            Crear nuevo grupo
                        </Button>
                    </header>

                    {/* Resumen superior */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <Card className="border-0 bg-[#fff9f3] shadow-md rounded-2xl">
                            <CardContent className="p-5">
                                <p className="text-sm text-[#62380e]">Grupos creados</p>
                                <p className="text-3xl font-extrabold text-[#62380e]">
                                    {loading ? "..." : summary.totalGroups}
                                </p>
                                <p className="text-xs text-gray-400">Grupos activos actualmente</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 bg-[#fff9f3] shadow-md rounded-2xl">
                            <CardContent className="p-5">
                                <p className="text-sm text-[#62380e]">Visitantes registrados</p>
                                <p className="text-3xl font-extrabold text-[#62380e]">
                                    {loading ? "..." : summary.totalVisitors}
                                </p>
                                <p className="text-xs text-gray-400">Total en todos los grupos</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 bg-[#fff9f3] shadow-md rounded-2xl">
                            <CardContent className="p-5">
                                <p className="text-sm text-[#62380e]">Comisión acumulada</p>
                                <p className="text-3xl font-extrabold text-[#62380e]">
                                    {loading ? "..." : formatCurrency(summary.totalCommission)}
                                </p>
                                <p className="text-xs text-gray-400">Desde enero 2023</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 bg-[#fff9f3] shadow-md rounded-2xl">
                            <CardContent className="p-5">
                                <p className="text-sm text-[#62380e]">Pagos pendientes</p>
                                <p className="text-3xl font-extrabold text-[#62380e]">
                                    {loading ? "..." : formatCurrency(summary.pendingPayments)}
                                </p>
                                <p className="text-xs text-gray-400">Por recibir este mes</p>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Mis grupos */}
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl md:text-2xl font-semibold text-[#62380e]">
                                Mis grupos
                            </h2>
                            <Button
                                variant="link"
                                className="p-0 text-[#e87517] font-semibold hover:underline"
                            >
                                Ver todos
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex justify-center items-center p-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8c4a11]"></div>
                                    <span className="ml-3 text-[#62380e]">Cargando grupos...</span>
                                </div>
                            ) : groupsData.length === 0 ? (
                                <div className="flex justify-center items-center p-8">
                                    <span className="text-gray-500">No hay grupos disponibles</span>
                                </div>
                            ) : (
                                groupsData.map((grupo) => (
                                    <Card
                                        key={grupo.id}
                                        className="border border-[#ffe0b2] bg-white/90 rounded-xl shadow group hover:shadow-lg transition"
                                    >
                                        <CardContent className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center">
                                            <div>
                                                <p className="font-bold text-[#62380e] text-base md:text-lg">
                                                    {grupo.group_name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Visita: {formatDate(grupo.visit_date)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-6 mt-3 md:mt-0 w-full md:w-auto">
                                                <div className="flex gap-4 flex-wrap text-sm text-[#62380e]">
                                                    <span className="font-medium">
                                                        Visitantes: {grupo.visitors_count}
                                                    </span>
                                                    <span className="font-medium">
                                                        Comisión: {formatCurrency(grupo.commission_total)}
                                                    </span>
                                                    <span className="font-medium">ID: {grupo.id}</span>
                                                </div>
                                                <div className="ml-auto md:ml-4">
                                                    <Badge
                                                        className={`text-sm font-semibold ${
                                                            grupo.status === 'active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {grupo.status === 'active' ? 'Activo' : grupo.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>

                        {/* Pagination Controls */}
                        {pagination.total > 0 && pagination.last_page > 1 && (
                            <div className="bg-white rounded-xl shadow p-4 mt-4">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm text-gray-700">
                                        Mostrando{" "}
                                        <span className="font-medium">
                                            {((pagination.current_page - 1) * pagination.per_page) + 1}
                                        </span>{" "}
                                        a{" "}
                                        <span className="font-medium">
                                            {Math.min(pagination.current_page * pagination.per_page, pagination.total)}
                                        </span>{" "}
                                        de{" "}
                                        <span className="font-medium">{pagination.total}</span> grupos
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button
                                            onClick={() => handlePageChange(pagination.current_page - 1)}
                                            disabled={pagination.current_page === 1 || loading}
                                            variant="outline"
                                            size="sm"
                                            className="text-[#62380e] border-[#e4d1b0] hover:bg-[#fff9f3]"
                                        >
                                            Anterior
                                        </Button>

                                        {[...Array(pagination.last_page)].map((_, index) => {
                                            const page = index + 1;
                                            if (
                                                page === 1 ||
                                                page === pagination.last_page ||
                                                (page >= pagination.current_page - 1 && page <= pagination.current_page + 1)
                                            ) {
                                                return (
                                                    <Button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        disabled={loading}
                                                        variant={pagination.current_page === page ? "default" : "outline"}
                                                        size="sm"
                                                        className={
                                                            pagination.current_page === page
                                                                ? "bg-[#8c4a11] text-white hover:bg-[#a9641e]"
                                                                : "text-[#62380e] border-[#e4d1b0] hover:bg-[#fff9f3]"
                                                        }
                                                    >
                                                        {page}
                                                    </Button>
                                                );
                                            }
                                            return null;
                                        })}

                                        <Button
                                            onClick={() => handlePageChange(pagination.current_page + 1)}
                                            disabled={pagination.current_page === pagination.last_page || loading}
                                            variant="outline"
                                            size="sm"
                                            className="text-[#62380e] border-[#e4d1b0] hover:bg-[#fff9f3]"
                                        >
                                            Siguiente
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Pagos recientes */}
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl md:text-2xl font-semibold text-[#62380e]">
                                Pagos recientes
                            </h2>
                            <Button
                                variant="link"
                                className="p-0 text-[#e87517] font-semibold hover:underline"
                            >
                                Ver estado de cuenta
                            </Button>
                        </div>
                        <div className="bg-white rounded-xl shadow overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="bg-[#fff4e3]">
                                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">
                                        Concepto
                                    </th>
                                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">
                                        Fecha
                                    </th>
                                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">
                                        Monto
                                    </th>
                                    <th className="p-3 text-left !text-[#62380e] font-bold text-base">
                                        Estado
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {[
                                    {
                                        concepto: "Comisión Grupo Cascada",
                                        fecha: "15/05/2023",
                                        monto: "$960",
                                        estado: "Pagado",
                                    },
                                    {
                                        concepto: "Comisión Grupo Mirador",
                                        fecha: "02/06/2023",
                                        monto: "$1,350",
                                        estado: "Pendiente",
                                    },
                                    {
                                        concepto: "Comisión Grupo Bosque",
                                        fecha: "05/06/2023",
                                        monto: "$840",
                                        estado: "Pagado",
                                    },
                                    {
                                        concepto: "Bono por referidos",
                                        fecha: "01/06/2023",
                                        monto: "$500",
                                        estado: "Pagado",
                                    },
                                ].map((pago, idx) => (
                                    <tr key={idx} className="border-t">
                                        <td className="p-3 !text-[#62380e] font-medium">
                                            {pago.concepto}
                                        </td>
                                        <td className="p-3 !text-[#62380e] font-medium">
                                            {pago.fecha}
                                        </td>
                                        <td className="p-3 !text-[#62380e] font-medium">
                                            {pago.monto}
                                        </td>
                                        <td className="p-3">
                                            {pago.estado === "Pagado" ? (
                                                <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                                                    {pago.estado}
                                                </span>
                                            ) : (
                                                <span className="inline-block bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full font-semibold text-sm">
                                                    {pago.estado}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* CTA final */}
                    <section className="mt-10">
                        <div className="bg-[#fbe8d2] rounded-xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm border border-[#ffe0b2]">
                            <p className="text-[#62380e] text-base mb-2 md:mb-0 font-medium">
                                ¿Listo para crear un nuevo grupo? Organiza una nueva visita y aumenta tus comisiones
                            </p>
                            <Button
                                onClick={() => router.push('/asociado/crear')}
                                className="bg-[#8c4a11] text-white px-8 py-2 rounded-xl text-base shadow hover:bg-[#a9641e]"
                            >
                                Crear grupo
                            </Button>
                        </div>
                    </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
