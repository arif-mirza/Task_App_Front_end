import { useNavigate } from 'react-router-dom';
import { LogOut, Layout, User } from 'lucide-react'; 

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const user = localStorage.getItem('userEmail');
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 mb-8 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-brand-600 p-2 rounded-lg text-white">
          <Layout size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Task<span className="text-brand-600">Pro</span></h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-semibold text-gray-700">Hello {name || 'User'}</span>
          <span className="text-sm font-semibold text-gray-700">{user || 'User'}</span>
          <span className="text-xs uppercase bg-brand-100 text-brand-600 px-2 py-0.5 rounded-full font-bold tracking-wider">
            {role}
          </span>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;






