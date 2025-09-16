"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Filtros from "./Filtros";
import EstadoCuentaTable from "./EstadoCuentaTable";
import Resumen from "./Resumen";
import Pagination from "./Pagination";

export default function EstadoCuentaDashboard() {
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState({});
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 10,
        total: 0,
        last_page: 1
    });
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        promoter_id: 1,
        from: "2025-01-01",
        to: "2025-12-31",
        status: "all",
        per_page: 10
    });

    const fetchData = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                ...filters,
                page: page.toString()
            });

            const response = await fetch(`https://lasjaras-api.kerveldev.com/api/promoters/me/statements?${params}`);
            const result = await response.json();

            setData(result.data || []);
            setSummary(result.summary || {});
            setPagination(result.meta || {});
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchData(1);
    }, [fetchData]);

    const handlePageChange = (page) => {
        fetchData(page);
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

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
                    <Filtros onFiltersChange={handleFiltersChange} filters={filters} />
                    <EstadoCuentaTable data={data} loading={loading} />
                    <Pagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        loading={loading}
                    />
                    <Resumen summary={summary} />
                </CardContent>
            </Card>
        </div>
    );
}
