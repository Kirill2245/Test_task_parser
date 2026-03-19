
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { RegisterFormData } from '../../types/auth.types';

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSuccess, 
  onLoginClick 
}) => {
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validate = () => {
    const newErrors: Partial<RegisterFormData> = {};
    

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть минимум 6 символов';
    } else if (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(formData.password)) {
      newErrors.password = 'Пароль должен содержать буквы и цифры';
    }
    

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    return newErrors;
  };

  const getPasswordStrength = (password: string): { strength: number; color: string } => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/(?=.*[0-9])/.test(password)) strength += 1;
    if (/(?=.*[a-z])/.test(password)) strength += 1;
    if (/(?=.*[A-Z])/.test(password)) strength += 1;
    if (password.length >= 8) strength += 1;
    
    const colors = {
      0: 'bg-red-400',
      1: 'bg-orange-400',
      2: 'bg-yellow-400',
      3: 'bg-lime-400',
      4: 'bg-green-400',
      5: 'bg-emerald-400',
    };
    
    return {
      strength: Math.min(strength, 5),
      color: colors[strength as keyof typeof colors] || 'bg-gray-300',
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterFormData]) {
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
      await register({ email: formData.email, password: formData.password });
      onSuccess?.();
    } catch (error) {

    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

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

      <div className="space-y-2">
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
          autoComplete="new-password"
        />
        
        {formData.password && (
          <div className="space-y-1">
            <div className="flex gap-1 h-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full rounded-full transition-all duration-300
                    ${i < passwordStrength.strength 
                      ? passwordStrength.color 
                      : 'bg-gray-200'
                    }`}
                />
              ))}
            </div>
            <p className="text-2xs text-zen-500">
              {passwordStrength.strength === 0 && 'Очень слабый'}
              {passwordStrength.strength === 1 && 'Слабый'}
              {passwordStrength.strength === 2 && 'Средний'}
              {passwordStrength.strength === 3 && 'Хороший'}
              {passwordStrength.strength >= 4 && 'Сильный'}
            </p>
          </div>
        )}
      </div>

      <Input
        type="password"
        name="confirmPassword"
        label="Подтверждение пароля"
        placeholder="••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        icon={<span>✓</span>}
        disabled={isLoading}
        autoComplete="new-password"
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

      <div className="space-y-1.5 p-3 bg-zen-50 rounded-lg">
        <p className="text-2xs text-zen-500 mb-1">Требования к паролю:</p>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${formData.password.length >= 6 ? 'text-green-500' : 'text-zen-400'}`}>
            {formData.password.length >= 6 ? '✓' : '○'}
          </span>
          <span className="text-2xs text-zen-600">Минимум 6 символов</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${/(?=.*[0-9])/.test(formData.password) ? 'text-green-500' : 'text-zen-400'}`}>
            {/(?=.*[0-9])/.test(formData.password) ? '✓' : '○'}
          </span>
          <span className="text-2xs text-zen-600">Хотя бы одна цифра</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${/(?=.*[a-zA-Z])/.test(formData.password) ? 'text-green-500' : 'text-zen-400'}`}>
            {/(?=.*[a-zA-Z])/.test(formData.password) ? '✓' : '○'}
          </span>
          <span className="text-2xs text-zen-600">Хотя бы одна буква</span>
        </div>
      </div>

      <div className="pt-2 sm:pt-3">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
        >
          Создать аккаунт
        </Button>
      </div>

      <div className="text-center text-xs sm:text-sm text-zen-600">
        <span>Уже есть аккаунт?</span>
        <button
          type="button"
          onClick={onLoginClick}
          className="ml-2 text-sakura-500 hover:text-sakura-600 
                     font-medium transition-colors
                     relative after:absolute after:bottom-0 after:left-0 
                     after:w-full after:h-px after:bg-sakura-500 
                     after:scale-x-0 hover:after:scale-x-100 
                     after:transition-transform after:duration-300"
          disabled={isLoading}
        >
          Войти
        </button>
      </div>
    </form>
  );
};