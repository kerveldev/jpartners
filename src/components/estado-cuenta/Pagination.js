import React from "react";

export default function Pagination({ pagination, onPageChange, loading }) {
    const { current_page, last_page, total, per_page } = pagination;

    if (!total || total === 0) return null;

    const startItem = ((current_page - 1) * per_page) + 1;
    const endItem = Math.min(current_page * per_page, total);

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, current_page - delta); i <= Math.min(last_page - 1, current_page + delta); i++) {
            range.push(i);
        }

        if (current_page - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (current_page + delta < last_page - 1) {
            rangeWithDots.push('...', last_page);
        } else {
            if (last_page > 1) rangeWithDots.push(last_page);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="bg-white rounded-xl shadow mb-8 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{startItem}</span> a{" "}
                    <span className="font-medium">{endItem}</span> de{" "}
                    <span className="font-medium">{total}</span> resultados
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onPageChange(current_page - 1)}
                        disabled={current_page === 1 || loading}
                        className="px-3 py-2 text-sm font-medium text-[#62380e] bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>

                    {visiblePages.map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={index} className="px-3 py-2 text-sm font-medium text-gray-500">
                                    ...
                                </span>
                            );
                        }

                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                disabled={loading}
                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                    current_page === page
                                        ? "bg-[#8c4a11] text-white"
                                        : "text-[#62380e] bg-white border border-gray-300 hover:bg-gray-50"
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => onPageChange(current_page + 1)}
                        disabled={current_page === last_page || loading}
                        className="px-3 py-2 text-sm font-medium text-[#62380e] bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#8c4a11]"></div>
                </div>
            )}
        </div>
    );
}