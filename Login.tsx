import React, { useState } from 'react';

interface LoginProps {
  onLogin: (user: { username: string; role: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Default credentials
    const defaultUser = { username: 'admin', password: '123', role: 'Admin' };

    if (!username || !password) {
      setError('Both username and password are required!');
      return;
    }

    if (username === defaultUser.username && password === defaultUser.password) {
      onLogin({ username, role: defaultUser.role });
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Default credentials: <br /> Username: <span className="font-bold">admin</span> | Password: <span className="font-bold">123</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
