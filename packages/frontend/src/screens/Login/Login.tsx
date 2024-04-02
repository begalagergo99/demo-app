import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { FormEvent, useState } from 'react';
import { LoginDto } from '../../../../shared/models/user';
import { AuthService } from '../../services/AuthService';
import axios, { AxiosError } from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const payload: LoginDto = {
      email,
      password,
    };
    try {
      setLoading(true);
      await AuthService.login(payload);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="flex flex-col space-y-4" onSubmit={onSubmit} >
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
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
