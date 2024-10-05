import { useState } from 'react';

import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

function useAuth() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (): Promise<void> => {
    if (!username.trim() || !password.trim()) {
      await message.error('Username and password cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const response: AxiosResponse<{ message: string }> = await axios.post(
        '/api/auth/admin/login',
        {
          username,
          password,
        },
      );
      // handle successful login (e.g., store token, update UI)
      await message.success(response.data.message);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        // handle error (e.g., display error message)
        setLoading(false);
        await message.error((error as any).response.data.error);
      }
    }
  };

  return { username, setUsername, password, setPassword, loading, login };
}

export default useAuth;
