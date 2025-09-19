"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import VisitanteCard from '@/components/mis-grupos/VisitanteCard';
import EditarGrupoModal from '@/components/mis-grupos/EditarGrupoModal';

export default function InformacionGrupo({ groupId }) {
  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
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

  // Eliminar visitante
  const handleDeleteVisitor = async (visitorId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este visitante?')) {
      return;
    }

    try {
      setActionLoading(true);
      const response = await fetch(
        `https://lasjaras-api.kerveldev.com/api/promoter-groups/${groupId}/visitors/${visitorId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        if (response.status === 422) {
          throw new Error('No se puede eliminar el visitante. El grupo no puede quedar vacío.');
        }
        throw new Error('Error al eliminar el visitante');
      }

      // Recargar información del grupo
      await fetchGrupoDetail();
      alert('Visitante eliminado correctamente');
    } catch (err) {
      alert(err.message);
      console.error('Error deleting visitor:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Finalizar grupo
  const handleFinalizeGroup = async () => {
    if (!confirm('¿Estás seguro de que deseas finalizar este grupo? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      setActionLoading(true);
      const response = await fetch(
        `https://lasjaras-api.kerveldev.com/api/promoter-groups/${groupId}/finalize`,
        {
          method: 'PUT',
        }
      );

      if (!response.ok) {
        if (response.status === 422) {
          throw new Error('No se puede finalizar el grupo. Debe tener al menos 1 visitante.');
        }
        throw new Error('Error al finalizar el grupo');
      }

      const data = await response.json();
      setGrupo(data);
      alert('Grupo finalizado correctamente');
    } catch (err) {
      alert(err.message);
      console.error('Error finalizing group:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Manejar actualización del grupo
  const handleUpdateGroup = async (updateData) => {
    try {
      setActionLoading(true);
      const response = await fetch(
        `https://lasjaras-api.kerveldev.com/api/promoter-groups/${groupId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        if (response.status === 422) {
          throw new Error('No se puede editar el grupo. Es posible que esté finalizado o cancelado.');
        }
        throw new Error(`Error al actualizar el grupo: ${response.status}`);
      }

      // Recargar información del grupo
      await fetchGrupoDetail();
      setShowEditModal(false);
      alert('Grupo actualizado correctamente');
    } catch (err) {
      alert(err.message);
      console.error('Error updating group:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Manejar añadir visitante - redirigir a página existente
  const handleAddVisitor = () => {
    // Guardar el ID del grupo actual para regresar después
    sessionStorage.setItem('currentGroupId', groupId);
    sessionStorage.setItem('addingToExistingGroup', 'true');
    
    // Guardar datos del grupo actual para el contexto
    const groupContext = {
      group_name: grupo.group_name,
      visit_date: grupo.visit_date,
      origin_city: grupo.origin_city || 'Zapopan',
      payment_method: grupo.payment_method || 'cash',
      promoter_id: promoterId
    };
    sessionStorage.setItem('groupData', JSON.stringify(groupContext));
    
    // Redirigir a la página de añadir visitante
    router.push('/asociado/visitante');
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

  // Verificar si el grupo se puede editar
  const canEditGroup = () => {
    return grupo?.settlement_status === 'none' && grupo?.status !== 'cancelled';
  };

  // Verificar si se pueden añadir visitantes
  const canAddVisitors = () => {
    return grupo?.status === 'active' && grupo?.status !== 'cancelled' && grupo?.status !== 'past';
  };

  // Verificar si el grupo se puede finalizar
  const canFinalizeGroup = () => {
    return grupo?.status === 'active' && grupo?.settlement_status === 'none' && (grupo?.visitors_count || 0) > 0;
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

            {/* Búsqueda y lista de visitantes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Visitantes</h3>
                <div className="flex items-center gap-3">
                  {/* Botón Añadir Visitante */}
                  <button
                    onClick={handleAddVisitor}
                    disabled={!canAddVisitors() || actionLoading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      canAddVisitors() && !actionLoading
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    title={!canAddVisitors() ? 'No se pueden añadir visitantes. El grupo debe estar activo.' : 'Añadir visitante al grupo'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Añadir Visitante
                  </button>
                  
                  {/* Barra de búsqueda */}
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
              </div>

              {/* Lista de visitantes con tarjetas individuales */}
              <div className="space-y-3">
                {filteredVisitors.length > 0 ? (
                  filteredVisitors.map((visitor, index) => (
                    <VisitanteCard 
                      key={visitor.id || index} 
                      visitor={visitor} 
                      onDelete={handleDeleteVisitor}
                      canDelete={filteredVisitors.length > 1}
                      loading={actionLoading}
                    />
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

        {/* Botones de acción fijos en la parte inferior */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
            {/* Botón Guardar cambios */}
            <button
              onClick={() => setShowEditModal(true)}
              disabled={actionLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                !actionLoading
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title="Editar datos del grupo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Guardar cambios
            </button>

            {/* Botón Finalizar Grupo */}
            <button
              onClick={handleFinalizeGroup}
              disabled={actionLoading || (grupo?.visitors_count || 0) === 0 || grupo?.settlement_status !== 'none'}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                !actionLoading && (grupo?.visitors_count || 0) > 0 && grupo?.settlement_status === 'none'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title={
                (grupo?.visitors_count || 0) === 0 
                  ? 'No se puede finalizar. El grupo debe tener al menos 1 visitante.'
                  : grupo?.settlement_status !== 'none'
                  ? 'El grupo ya ha sido finalizado.'
                  : 'Finalizar grupo y congelar comisión'
              }
            >
              {actionLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Finalizar Grupo
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal de edición */}
        {showEditModal && (
          <EditarGrupoModal
            grupo={grupo}
            onSave={handleUpdateGroup}
            onClose={() => setShowEditModal(false)}
            loading={actionLoading}
          />
        )}

        {/* Espacio adicional para los botones fijos */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}