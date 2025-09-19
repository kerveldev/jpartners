"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/mis-grupos/SearchBar';
import GrupoCard from '@/components/mis-grupos/GrupoCard';
import Pagination from '@/components/mis-grupos/Pagination';

export default function MisGruposDashboard() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Mock promoter ID - en producción debería venir del contexto de autenticación
  const promoterId = 1;

  const fetchGrupos = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://lasjaras-api.kerveldev.com/api/promoter-groups?promoter_id=${promoterId}&status=${statusFilter}&per_page=10&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error('Error al cargar los grupos');
      }
      
      const data = await response.json();
      
      setGrupos(data.data || []);
      setTotalPages(data.meta?.last_page || 1);
      setTotalItems(data.meta?.total || 0);
      setCurrentPage(data.meta?.current_page || 1);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching grupos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrupos(currentPage);
  }, [statusFilter, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Implementar búsqueda local o llamar al API con parámetro de búsqueda
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredGrupos = grupos.filter(grupo =>
    grupo.group_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header de la página */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-orange-600 mb-2">
            Lista de Mis Grupos
          </h1>
          <div className="text-sm text-gray-600">
            Mis grupos
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <SearchBar 
          onSearch={handleSearch}
          onStatusChange={handleStatusChange}
          statusFilter={statusFilter}
        />

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Cargando grupos...</div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="text-red-800">Error: {error}</div>
          </div>
        )}

        {/* Lista de grupos */}
        {!loading && !error && (
          <>
            <div className="space-y-4 mb-6">
              {filteredGrupos.length > 0 ? (
                filteredGrupos.map((grupo) => (
                  <GrupoCard key={grupo.id} grupo={grupo} />
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No se encontraron grupos
                </div>
              )}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {/* Botón crear nuevo grupo */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <button 
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition-colors"
            onClick={() => {
              // Navegar a la página de crear grupo
              window.location.href = '/asociado/crear';
            }}
          >
            Crear nuevo grupo
          </button>
        </div>

        {/* Footer de confirmación */}
        <div className="text-center text-xs text-gray-500 mt-8 mb-20">
          Al finalizar se generarán los pases y se enviará la confirmación
        </div>
      </div>
    </div>
  );
}