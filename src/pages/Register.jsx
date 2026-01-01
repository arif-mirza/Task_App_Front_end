import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'dev' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success('Account Created! Please Login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Create Account</h2>
        <p className="text-gray-500 text-center mb-8">Join the team today</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          
          {/* <div className="p-3 bg-gray-50 rounded-lg border">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Role (For Test)</label>
            <div className="flex gap-4">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="radio" name="role" value="dev" defaultChecked onChange={(e) => setFormData({...formData, role: e.target.value})} />
                 <span>Developer</span>
               </label>
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="radio" name="role" value="admin" onChange={(e) => setFormData({...formData, role: e.target.value})} />
                 <span>Admin</span>
               </label>
            </div>
          </div> */}

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95">
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-brand-600 font-bold hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};
export default Register;


