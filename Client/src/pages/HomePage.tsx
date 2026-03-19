
import React from 'react';
import { useAuth } from '../context/AuthContext';

export const HomePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-japanese text-zen-800">
            Добро пожаловать, {user?.email}!
          </h1>
          <button
            onClick={logout}
            className="px-6 py-2 bg-sakura-400 text-white rounded-lg 
                       hover:bg-sakura-500 transition-colors"
          >
            Выйти
          </button>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 
                        border border-sakura-200">
          <h2 className="text-xl text-zen-800 mb-4">
            Вы успешно авторизовались!
          </h2>
          <p className="text-zen-600">
            Это ваша защищенная домашняя страница. Только авторизованные 
            пользователи могут ее видеть.
          </p>
        </div>
      </div>
    </div>
  );
};