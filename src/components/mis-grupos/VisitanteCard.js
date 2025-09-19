export default function VisitanteCard({ visitor, onDelete, canDelete, loading }) {
  const handleDelete = () => {
    if (canDelete && !loading) {
      onDelete(visitor.id);
    }
  };

  // Generar patrón QR simple para visualización
  const generateQRPattern = () => {
    const patterns = [];
    for (let i = 0; i < 64; i++) {
      patterns.push(Math.random() > 0.5);
    }
    return patterns;
  };

  const qrPattern = generateQRPattern();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
      {/* Información del visitante */}
      <div className="flex-1">
        <div className="flex items-start gap-4">
          {/* Datos personales */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">
              {visitor.name || `${visitor.first_name || ''} ${visitor.last_name || ''}`.trim() || 'Sin nombre'}
            </h4>
            <p className="text-sm text-gray-600">
              {visitor.email || 'Sin email'}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>ID: {visitor.id}</span>
              <span>{visitor.ticket_type || 'Entrada general'}</span>
            </div>
          </div>

          {/* Precio */}
          <div className="text-right">
            <div className="text-lg font-bold text-red-600">
              ${visitor.price || visitor.public_price || '0'}.00 MXN
            </div>
            <div className="text-sm text-gray-500">
              ID: {visitor.confirmation_id || visitor.id}
            </div>
          </div>
        </div>
      </div>

      {/* Código QR */}
      <div className="flex items-center gap-3 ml-6">
        <div className="w-16 h-16 bg-white border-2 border-gray-300 flex items-center justify-center">
          {/* Patrón QR simplificado */}
          <div className="grid grid-cols-8 gap-px w-12 h-12">
            {qrPattern.map((filled, index) => (
              <div
                key={index}
                className={`w-1 h-1 ${filled ? 'bg-black' : 'bg-white'}`}
              />
            ))}
          </div>
        </div>

        {/* Botón eliminar */}
        <button
          onClick={handleDelete}
          disabled={!canDelete || loading}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            canDelete && !loading
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title={!canDelete ? 'No se puede eliminar. El grupo debe tener al menos 1 visitante.' : 'Eliminar visitante'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {loading ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}