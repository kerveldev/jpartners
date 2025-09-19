import { useState } from 'react';

export default function GrupoCard({ grupo }) {
  const [showQR, setShowQR] = useState(false);

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

  // Obtener texto del estado
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

  // Generar código QR simple (en producción usar una librería de QR)
  const generateQRData = (grupoId) => {
    return `https://lasjaras.com/grupo/${grupoId}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        {/* Información principal del grupo */}
        <div className="flex-1">
          <div className="flex items-start gap-6">
            {/* Columna izquierda - Info básica */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {grupo.group_name || 'Nombre del grupo'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Fecha de visita: {formatDate(grupo.visit_date)}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Visitantes</span>
                  <div className="font-medium">{grupo.visitors_count || 0}</div>
                </div>
                <div>
                  <span className="text-gray-500">Comisión</span>
                  <div className="font-medium">${grupo.commission_total || '0'}</div>
                </div>
              </div>
            </div>

            {/* Columna central - Fecha del evento */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Fecha</div>
              <div className="font-medium">
                {formatDate(grupo.visit_date)}
              </div>
            </div>

            {/* Columna derecha - Estado */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Status</div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(grupo.status)}`}>
                {getStatusText(grupo.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Sección de códigos QR */}
        <div className="ml-6 flex flex-col items-center gap-3">
          {/* QR Code */}
          <div className="w-20 h-20 bg-gray-900 flex items-center justify-center">
            <div className="w-16 h-16 bg-white flex items-center justify-center">
              {/* QR pattern simplificado */}
              <div className="grid grid-cols-8 gap-px w-12 h-12">
                {Array.from({ length: 64 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 ${
                      Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Botón Generar Código QR */}
          <button 
            onClick={() => setShowQR(!showQR)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
          >
            Generar Código QR
          </button>

          {/* Botón de acción adicional */}
          {grupo.status === 'active' && (
            <button className="text-orange-600 hover:text-orange-700 text-xs underline">
              Generar Código QR
            </button>
          )}
        </div>
      </div>

      {/* Modal o información expandida del QR */}
      {showQR && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border-t">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Código QR para el grupo: {grupo.group_name}
            </p>
            <p className="text-xs text-gray-500">
              URL: {generateQRData(grupo.id)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}