import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('¡Bienvenido al sistema!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-gray-800 mb-8"
        >
          Sistema de Colmado
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700 font-semibold block mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold block mb-2">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Iniciar Sesión
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;