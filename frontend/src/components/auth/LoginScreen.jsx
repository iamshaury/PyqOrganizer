import React, { useState } from 'react';
import axios from 'axios';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { UserIcon, LockIcon } from '../icons/Icons';

const LoginScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    const endpoint = isLogin ? '/login' : '/register';
    try {
      const response = await axios.post(`http://localhost:5000/api/users${endpoint}`, { email, password });
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        onLogin();
      } else {
        setMessage('Registration successful! Please log in.');
        setMessageType('success');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-2xl">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">Q</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PYQ Organizer
          </h1>
          <p className="text-gray-400 mt-3 text-lg">Organize your exam papers with AI</p>
        </div>

        <Card className="backdrop-blur-xl bg-gray-800/90 border-gray-700/50 shadow-2xl">
          <Card.Content className="p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-400 mt-2 text-base">
                {isLogin ? 'Sign in to your account' : 'Join us today'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {message && (
                <div className={`p-4 rounded-xl text-sm border ${
                  messageType === 'success' 
                    ? 'bg-green-900/20 text-green-400 border-green-500/30' 
                    : 'bg-red-900/20 text-red-400 border-red-500/30'
                }`}>
                  {message}
                </div>
              )}

              <Input
                type="email"
                label="Email"
                icon={<UserIcon className="w-4 h-4 text-gray-500" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <Input
                type="password"
                label="Password"
                icon={<LockIcon className="w-4 h-4 text-gray-500" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isLoading}
                className="w-full mt-8"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="mt-3 text-purple-400 hover:text-purple-300"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
