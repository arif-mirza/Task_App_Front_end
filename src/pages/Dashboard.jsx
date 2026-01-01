import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const config = { headers: { 'x-auth-token': token } };

  useEffect(() => {
    if (!token) navigate('/login');
    fetchTasks();
    if (role === 'admin') fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('https://task-app-back-end.vercel.app/api/tasks', config);
      setTasks(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://task-app-back-end.vercel.app/api/auth/users', config);
      setUsers(res.data);
    } catch (err) { console.error(err); }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://task-app-back-end.vercel.app/api/tasks', newTask, config);
      toast.success('Task Assigned!');
      fetchTasks();
      setNewTask({ title: '', description: '', assignedTo: '' });
    } catch (err) { toast.error('Failed to create task'); }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`https://task-app-back-end.vercel.app/api/tasks/${id}`, {}, config);
      toast.success('Great Job! Task Completed.');
      fetchTasks();
    } catch (err) { toast.error('Error'); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(`https://task-app-back-end.vercel.app/api/tasks/${id}`, config);
      toast.info('Task Removed');
      fetchTasks();
    } catch (err) { toast.error('Error'); }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6">
        {/* ADMIN SECTION: Create Task Card */}
        {role === 'admin' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10"
          >
            <div className="flex items-center gap-2 mb-4 text-gray-800">
               <div className="bg-brand-100 p-2 rounded-full text-brand-600"><Plus size={20}/></div>
               <h2 className="text-xl font-bold">Assign New Task</h2>
            </div>

            <form onSubmit={handleCreateTask} className="flex flex-col md:flex-row gap-4">
              <input 
                placeholder="Task Title" 
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" 
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                required 
              />
               <input 
                placeholder="Short Description" 
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" 
                value={newTask.description}
                onChange={e => setNewTask({...newTask, description: e.target.value})}
              />
              <select 
                className="p-3 border rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                value={newTask.assignedTo}
                onChange={e => setNewTask({...newTask, assignedTo: e.target.value})}
                required
              >
                <option value="">Select Developer</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
              </select>
              <button type="submit" className="w-3xs bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95">
                Assign
              </button>
            </form>
          </motion.div>
        )}

        {/* TASKS GRID */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-brand-500 pl-4">
          {role === 'admin' ? 'All Team Tasks' : 'My Assigned Tasks'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {tasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                role={role} 
                onComplete={handleComplete} 
                onDelete={handleDelete} 
              />
            ))}
          </AnimatePresence>
        </div>
        
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No tasks found. Relax!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;





