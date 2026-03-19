
import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  onAuthSuccess?: () => void;
  defaultMode?: AuthMode;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onAuthSuccess,
  defaultMode = 'login',
}) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);

  return (
    <div className="w-full transition-all duration-300">
      {mode === 'login' ? (
        <LoginForm
          onSuccess={onAuthSuccess}
          onRegisterClick={() => setMode('register')}
        />
      ) : (
        <RegisterForm
          onSuccess={onAuthSuccess}
          onLoginClick={() => setMode('login')}
        />
      )}
    </div>
  );
};