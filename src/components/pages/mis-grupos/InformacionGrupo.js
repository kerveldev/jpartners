"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function InformacionGrupo({ groupId }) {
  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Mock promoter ID - en producción debería venir del contexto de autenticación
  const promoterId = 1;

  const fetchGrupoDetail = async () => {
    try {
      setLoading(true);
      const url = `https://lasjaras-api.kerveldev.com/api/promoter-groups/${groupId}?promoter_id=${promoterId}${searchTerm ? `&q=${searchTerm}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Error al cargar la información del grupo');
      }
      
      const data = await response.json();
      setGrupo(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching grupo detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchGrupoDetail();
    }
  }, [groupId, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBack = () => {
    router.push('/mis-grupos');
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Obtener color del estado
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'past':
        return 'text-gray-600 bg-gray-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'Activo';
      case 'past':
        return 'Pasado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status || 'Sin estado';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Cargando información del grupo...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!grupo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center py-12 text-gray-500">
            No se encontró información del grupo
          </div>
        </div>
      </div>
    );
  }

  // Filtrar visitantes por búsqueda local
  const filteredVisitors = grupo.visitors?.filter(visitor =>
    visitor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${visitor.first_name || ''} ${visitor.last_name || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Botón de regreso */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Mis Grupos
        </button>

        {/* Header de la página */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-orange-600 mb-2">
            Información del Grupo
          </h1>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Información básica del grupo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {grupo.group_name}
              </h2>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Fecha de visita:</span>
                  <div className="font-medium">{formatDate(grupo.visit_date)}</div>
                </div>
                
                <div>
                  <span className="text-gray-500">Estado:</span>
                  <div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(grupo.status)}`}>
                      {getStatusText(grupo.status)}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-gray-500">Banda:</span>
                  <div className="font-medium">{grupo.band || 'No especificada'}</div>
                </div>

                <div>
                  <span className="text-gray-500">Precio público:</span>
                  <div className="font-medium">${grupo.public_price || '0'}</div>
                </div>

                <div>
                  <span className="text-gray-500">Precio promotor:</span>
                  <div className="font-medium">${grupo.promoter_net || '0'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna central y derecha - Resumen y lista de visitantes */}
          <div className="lg:col-span-2">
            {/* Resumen */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Grupo</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{grupo.visitors_count || 0}</div>
                  <div className="text-sm text-gray-500">personas</div>
                </div>
                
                <div>
                  <div className="text-2xl font-bold text-green-600">${grupo.total_price || '0'}</div>
                  <div className="text-sm text-gray-500">Total precio</div>
                </div>
                
                <div>
                  <div className="text-2xl font-bold text-blue-600">${grupo.total_net || '0'}</div>
                  <div className="text-sm text-gray-500">Total neto</div>
                </div>
                
                <div>
                  <div className="text-2xl font-bold text-orange-600">${grupo.commission_total || '0'}</div>
                  <div className="text-sm text-gray-500">Comisión total</div>
                </div>
              </div>
            </div>

            {/* Búsqueda de visitantes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Lista de Visitantes</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar visitante..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Lista de visitantes */}
              <div className="space-y-2">
                {filteredVisitors.length > 0 ? (
                  filteredVisitors.map((visitor, index) => (
                    <div key={visitor.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">
                          {visitor.name || `${visitor.first_name || ''} ${visitor.last_name || ''}`.trim() || 'Sin nombre'}
                        </div>
                        {visitor.email && (
                          <div className="text-sm text-gray-500">{visitor.email}</div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {visitor.ticket_type || 'Entrada general'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {searchTerm ? 'No se encontraron visitantes que coincidan con la búsqueda' : 'No hay visitantes registrados'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}