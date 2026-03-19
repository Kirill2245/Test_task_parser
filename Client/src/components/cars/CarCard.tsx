// components/cars/CarCard.tsx
import React, { useState } from 'react';
import type { Car } from '../../types/car.types';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    car.mainImage,
    ...(car.additionalImages || [])
  ].filter(Boolean).map(img => 
    img?.startsWith('//') ? `https:${img}` : img
  );

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden 
                    border border-sakura-200 hover:shadow-xl transition-all 
                    hover:scale-[1.02] group">
      
      {/* Галерея изображений */}
      <div className="relative h-48 overflow-hidden bg-zen-50">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImage] || ""}
              alt={`${car.makeTranslated || 'Автомобиль'} ${car.modelTranslated || ''}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 
                           bg-black/50 text-white rounded-full flex items-center 
                           justify-center hover:bg-black/70 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 
                           bg-black/50 text-white rounded-full flex items-center 
                           justify-center hover:bg-black/70 transition-colors"
                >
                  →
                </button>
                
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 
                              flex gap-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImage 
                          ? 'bg-sakura-400 w-4' 
                          : 'bg-white/50 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zen-400">
            Нет изображения
          </div>
        )}
      </div>

      {/* Информация об автомобиле */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-zen-800">
            {car.makeTranslated || 'Марка'} {car.modelTranslated || ''}
          </h3>
          <span className="text-xs px-2 py-1 bg-sakura-100 text-sakura-600 rounded-full">
            {car.year} г.
          </span>
        </div>

        {/* Цена */}
        <div className="mb-3">
          <p className="text-2xl font-bold text-sakura-600">
            {car.totalPriceDisplay}
            <span className="text-sm font-normal text-zen-500 ml-1">
              ({(car.totalPriceRaw / 1000).toFixed(0)} тыс. йен)
            </span>
          </p>
          {car.basePriceRaw && (
            <p className="text-sm text-zen-500 line-through">
              {car.basePriceDisplay}
            </p>
          )}
        </div>

        {/* Характеристики */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="flex items-center gap-1">
            <span className="text-zen-400">⏱️</span>
            <span className="text-zen-600">{car.mileageDisplay || 'Н/Д'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zen-400">⚙️</span>
            <span className="text-zen-600">{car.transmissionTranslated || car.transmission || 'Н/Д'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zen-400">🎨</span>
            <span className="text-zen-600">{car.colorTranslated || car.color || 'Н/Д'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zen-400">🔧</span>
            <span className="text-zen-600">{car.engineSize || 'Н/Д'}</span>
          </div>
        </div>

        {/* Дополнительная информация */}
        {(car.inspectionTranslated || car.warrantyTranslated) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {car.inspectionTranslated && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                {car.inspectionTranslated}
              </span>
            )}
            {car.warrantyTranslated && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                {car.warrantyTranslated}
              </span>
            )}
            {car.repairHistory === false && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                Без ремонта
              </span>
            )}
          </div>
        )}

        {/* Магазин */}
        <div className="border-t border-sakura-100 pt-3 mt-3">
          <p className="text-xs text-zen-500">
            {car.shopNameTranslated || 'Магазин не указан'}
          </p>
          <p className="text-xs text-zen-400">
            📍 {car.shopLocationTranslated || 'Локация не указана'}
          </p>
        </div>

        {/* Кнопка подробнее */}
        <a
          href={car.detailUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full text-center px-4 py-2 bg-sakura-400 
                     text-white rounded-lg hover:bg-sakura-500 transition-colors
                     text-sm"
        >
          Подробнее на сайте
        </a>
      </div>
    </div>
  );
};