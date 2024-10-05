import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

function useAuth() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { replace } = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      // Delete the sessionId cookie
      const { data }: AxiosResponse<{ message: string }> = await axios.post(
        '/api/auth/admin/logout',
      );

      await message.success(data.message);
    } catch (error) {
      if (error instanceof Error) {
        // handle error (e.g., display error message)
        await message.error((error as any).response.data.error);
      }
    } finally {
      replace('/');
      setLoading(false);
    }
  };

  const login = async (): Promise<void> => {
    if (!username.trim() || !password.trim()) {
      await message.error('Username and password cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const { data }: AxiosResponse<{ message: string }> = await axios.post(
        '/api/auth/admin/login',
        {
          username,
          password,
        },
      );
      // handle successful login (e.g., store token, update UI)
      await message.success(data.message);
      replace('/admin/dashboard');
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        // handle error (e.g., display error message)
        setLoading(false);
        await message.error((error as any).response.data.error);
      }
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    login,
    logout,
  };
}

export default useAuth;
