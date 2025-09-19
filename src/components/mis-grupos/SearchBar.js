import { useState } from 'react';

export default function SearchBar({ onSearch, onStatusChange, statusFilter }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusChange = (e) => {
    onStatusChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Barra de búsqueda */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Buscar Visitante"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filtro de estado */}
      <div className="min-w-[120px]">
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
        >
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="past">Pasados</option>
          <option value="cancelled">Cancelados</option>
        </select>
      </div>
    </div>
  );
}