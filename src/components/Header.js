export default function Header() {
    return (
        <div className="flex items-center justify-between mb-6 px-4 py-3 bg-white shadow-sm">
            <h1 className="text-2xl font-medium text-gray-600" style={{ fontFamily: 'Roboto Serif, serif' }}>LAS JARAS</h1>
            <div className="flex items-center gap-4">
                <span className="text-gray-600">Estado de Cuenta</span>
                <span className="text-gray-600">Mis Grupos</span>
                <span className="text-gray-600">Perfil</span>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Carlos M.</span>
                </div>
            </div>
        </div>
    );
}