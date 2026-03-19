
import React from 'react';
import { SakuraDecoration } from '../ui/SakuraDecoration';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 via-white to-sakura-100 
                    relative overflow-hidden flex items-center justify-center">
      <SakuraDecoration />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 
                          border border-sakura-200/50">
            
            <div className="text-center mb-8">
              <h1 className="font-japanese text-5xl text-zen-800 mb-2 relative inline-block">
                {title}
                <span className="absolute -top-3 -right-6 text-sakura-400 text-2xl">⚡</span>
              </h1>
              {subtitle && (
                <p className="text-zen-500 text-sm mt-2">{subtitle}</p>
              )}
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};