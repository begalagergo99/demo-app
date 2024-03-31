import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';

const SignUp: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form className="flex flex-col space-y-4">
        <Input type="email" placeholder="Enter your email" />
        <Input type="password" placeholder="Enter your password" />
        <Input type="password" placeholder="Confirm your password" />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
        <Link to="/login" className="text-blue-300 hover:text-blue-400 font-bold">
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
