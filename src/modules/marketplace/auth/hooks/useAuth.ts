import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import { message } from 'antd';

interface AuthFormState {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

function useAuth() {
  const [loginForm, setLoginForm] = useState<AuthFormState>({
    email: '',
    password: '',
  });
  const [signupForm, setSignupForm] = useState<AuthFormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { replace } = useRouter();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/user/login', {
        email: loginForm.email,
        password: loginForm.password,
      });

      await message.success(response.data.message);
      replace('/');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/user/register', {
        name: `${signupForm.firstName} ${signupForm.lastName}`,
        email: signupForm.email,
        password: signupForm.password,
      });

      console.log('REGISTER', response.data);
      await message.success('User Registered successfully.');
      replace('/user/login');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loginForm,
    signupForm,
    loading,
    error,
    handleLoginChange,
    handleSignupChange,
    login,
    signup,
  };
}

export default useAuth;
