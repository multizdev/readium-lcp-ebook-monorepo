'use client';

import React, { ReactElement } from 'react';

import { Loader2 } from 'lucide-react';

import { Button } from '@shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shadcn/components/ui/card';
import { Input } from '@shadcn/components/ui/input';
import { Label } from '@shadcn/components/ui/label';

import useAuth from '@admin/auth/hooks/useAuth';

function LoginPage(): ReactElement {
  const { username, setUsername, password, setPassword, login, loading } =
    useAuth();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your username and password below to login.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={loading} onClick={login}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
