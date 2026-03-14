import React, { useState } from 'react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Vote, AlertCircle } from 'lucide-react';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const user = await api.login({ username, password });
      onLogin(user); // Triggers routing to /candidates
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100svh] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg">
            <Vote size={32} />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">EduVote</h1>
            <p className="text-slate-500 font-medium">Student Election Portal</p>
          </div>
        </div>

        <Card className="border-0 shadow-xl shadow-slate-200/50">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <p className="text-sm text-slate-500 mt-2">
              Enter your student credentials to vote
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-start gap-3 border border-red-100/50">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="Student ID"
                  placeholder="e.g. student1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full text-lg shadow-primary-600/20 shadow-lg"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  'Sign In to Vote'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm font-medium text-slate-500 bg-slate-50 rounded-lg p-4">
              <p>Demo Credentials:</p>
              <p className="mt-1 font-mono text-slate-700">student1 / password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
