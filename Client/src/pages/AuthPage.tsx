
import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthForm } from '../components/auth/AuthForm';

export const AuthPage: React.FC = () => {
  return (
    <AuthLayout title="禅" subtitle="Войдите в состояние потока">
      <AuthForm />
    </AuthLayout>
  );
};