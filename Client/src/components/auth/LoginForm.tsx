
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { LoginFormData } from '../../types/auth.types';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  onRegisterClick 
}) => {
  const { login, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const validate = () => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }
    
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData);
      onSuccess?.();
    } catch (error) {
      // Ошибка уже в контексте
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-5">
      <Input
        type="email"
        name="email"
        label="Email"
        placeholder="your@email.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={<span>✉️</span>}
        disabled={isLoading}
        autoComplete="email"
      />

      <Input
        type="password"
        name="password"
        label="Пароль"
        placeholder="••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        icon={<span>🔒</span>}
        disabled={isLoading}
        autoComplete="current-password"
      />

      {error && (
        <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg
                      flex items-start gap-2 sm:gap-3 animate-shake">
          <span className="text-red-500 text-lg sm:text-xl">⚠️</span>
          <p className="text-red-600 text-xs sm:text-sm flex-1">{error}</p>
          <button
            type="button"
            onClick={clearError}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <div className="pt-2 sm:pt-3">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
        >
          Войти
        </Button>
      </div>

      <div className="text-center text-xs sm:text-sm text-zen-600">
        <span>Нет аккаунта?</span>
        <button
          type="button"
          onClick={onRegisterClick}
          className="ml-2 text-sakura-500 hover:text-sakura-600 
                     font-medium transition-colors
                     relative after:absolute after:bottom-0 after:left-0 
                     after:w-full after:h-px after:bg-sakura-500 
                     after:scale-x-0 hover:after:scale-x-100 
                     after:transition-transform after:duration-300"
          disabled={isLoading}
        >
          Создать аккаунт
        </button>
      </div>

    </form>
  );
};