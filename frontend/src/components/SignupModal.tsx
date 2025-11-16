import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/signup', { name, email, password });
      console.log(res.data);
      navigate('/login'); // redirect to login after signup
    } catch (err: any) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <input 
          type="text" placeholder="Name" 
          className="border p-2 w-full mb-4" value={name} 
          onChange={e => setName(e.target.value)} 
          required
        />
        <input 
          type="email" placeholder="Email" 
          className="border p-2 w-full mb-4" value={email} 
          onChange={e => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" placeholder="Password" 
          className="border p-2 w-full mb-4" value={password} 
          onChange={e => setPassword(e.target.value)} 
          required
        />
        <button className="bg-blue-500 text-white p-2 w-full rounded">Signup</button>
        <p className="mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
