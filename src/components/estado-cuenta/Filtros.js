"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Filtros({ onFiltersChange, filters }) {
    const [localFilters, setLocalFilters] = useState({
        status: filters.status,
        from: filters.from,
        to: filters.to
    });

    const handleInputChange = (field, value) => {
        setLocalFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearch = () => {
        onFiltersChange(localFilters);
    };

    const handlePerPageChange = (perPage) => {
        onFiltersChange({ per_page: parseInt(perPage) });
    };

    return (
        <section className="mb-5">
            <Card className="bg-[#fff9f3] border-0 shadow rounded-2xl mb-3">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="block font-semibold text-[#62380e]">Filtros</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#62380e]">Mostrar:</span>
                            <select
                                value={filters.per_page}
                                onChange={(e) => handlePerPageChange(e.target.value)}
                                className="border border-gray-200 rounded px-2 py-1 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                        <select
                            value={localFilters.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                            className="border border-gray-200 rounded px-3 py-2 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="paid">Pagado</option>
                            <option value="pending">Pendiente</option>
                            <option value="overdue">Vencido</option>
                        </select>
                        <input
                            type="date"
                            value={localFilters.from}
                            onChange={(e) => handleInputChange('from', e.target.value)}
                            className="border border-gray-200 rounded px-3 py-2 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none placeholder:text-gray-400"
                            placeholder="Desde"
                        />
                        <input
                            type="date"
                            value={localFilters.to}
                            onChange={(e) => handleInputChange('to', e.target.value)}
                            className="border border-gray-200 rounded px-3 py-2 text-sm text-[#62380e] bg-white focus:ring-2 focus:ring-[#8c4a11] outline-none placeholder:text-gray-400"
                            placeholder="Hasta"
                        />

                        <div className="flex justify-start md:justify-end">
                            <button
                                onClick={handleSearch}
                                className="bg-[#8c4a11] text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-[#a9641e] transition-colors"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
