"use client";

import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <div className="flex items-center justify-between mb-6 px-4 py-3 bg-white shadow-sm">
            <h1 
                className="text-2xl font-medium text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" 
                style={{ fontFamily: 'Roboto Serif, serif' }}
                onClick={() => handleNavigation('/')}
            >
                LAS JARAS
            </h1>
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => handleNavigation('/estado-cuenta')}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Estado de Cuenta
                </button>
                <button 
                    onClick={() => handleNavigation('/mis-grupos')}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Mis Grupos
                </button>
                <button 
                    onClick={() => handleNavigation('/perfil')}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Perfil
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Carlos M.</span>
                </div>
            </div>
        </div>
    );
}