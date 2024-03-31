import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form className="flex flex-col space-y-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign In
        </button>
        <Link to="/signup" className="text-blue-300 hover:text-blue-400 font-bold">
          Don't have an account? Create one
        </Link>
      </form>
    </div>
  );
};

export default Login;
