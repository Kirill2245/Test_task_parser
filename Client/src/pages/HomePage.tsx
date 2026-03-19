// pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CarCard } from '../components/cars/CarCard';
import CarService from '../services/car.service';
import type { Car } from '../types/car.types';

export const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    avgPrice: 0,
    uniqueMakes: 0,
  });

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      const data = await CarService.getAllCars();
      setCars(data);
      
      // Подсчет статистики
      const makes = new Set(data.map(car => car.makeTranslated).filter(Boolean));
      const avgPrice = data.reduce((acc, car) => acc + car.totalPriceRaw, 0) / data.length;
      
      setStats({
        total: data.length,
        avgPrice: Math.round(avgPrice),
        uniqueMakes: makes.size,
      });
      
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить автомобили');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Шапка */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-japanese text-zen-800">
              Добро пожаловать, {user?.email}!
            </h1>
            <p className="text-zen-500 text-sm mt-1">
              Здесь вы можете просматривать автомобили с японских аукционов
            </p>
          </div>
          
          <button
            onClick={logout}
            className="px-6 py-2 bg-sakura-400 text-white rounded-lg 
                       hover:bg-sakura-500 transition-colors"
          >
            Выйти
          </button>
        </div>

        {/* Статистика */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 
                            border border-sakura-200">
              <p className="text-zen-500 text-sm">Всего автомобилей</p>
              <p className="text-2xl font-bold text-sakura-600">{stats.total}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 
                            border border-sakura-200">
              <p className="text-zen-500 text-sm">Средняя цена</p>
              <p className="text-2xl font-bold text-sakura-600">
                {(stats.avgPrice / 1000).toFixed(0)} тыс. йен
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 
                            border border-sakura-200">
              <p className="text-zen-500 text-sm">Уникальных марок</p>
              <p className="text-2xl font-bold text-sakura-600">{stats.uniqueMakes}</p>
            </div>
          </div>
        )}

        {/* Состояния загрузки и ошибок */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-sakura-200 rounded-full" />
              <div className="absolute inset-0 border-4 border-sakura-500 rounded-full 
                            border-t-transparent animate-spin" />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadCars}
              className="px-6 py-2 bg-red-400 text-white rounded-lg 
                         hover:bg-red-500 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        )}

        {/* Сетка автомобилей */}
        {!loading && !error && (
          <>
            {cars.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 
                              text-center border border-sakura-200">
                <p className="text-2xl mb-4">🚗</p>
                <h2 className="text-xl text-zen-800 mb-2">
                  Автомобили не найдены
                </h2>
                <p className="text-zen-600">
                  Запустите парсер, чтобы импортировать автомобили
                </p>
              </div>
            ) : (
              <>
                <p className="text-zen-500 mb-4">
                  Найдено автомобилей: {cars.length}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};