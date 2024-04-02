import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { Role } from "../../../../shared/models/roles";
import { CreateUser } from "../../../../shared/models/user";
import { AuthService } from "../../services/AuthService";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const payload: CreateUser = {
        name,
        email,
        password,
        role: Role.Admin,
      };

      await AuthService.signup(payload);
      navigate("/login");
      // Redirect to login page
    } catch (error) {
      setError("Something went wrong");
      console.error(error);
    }
    // Call the signup API
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <Input
          type="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
        <Link
          to="/login"
          className="text-blue-300 hover:text-blue-400 font-bold"
        >
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
