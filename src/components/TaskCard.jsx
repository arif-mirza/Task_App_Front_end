import { motion } from 'framer-motion';
import { CheckCircle, Trash2, Clock, User } from 'lucide-react';

const TaskCard = ({ task, role, onComplete, onDelete }) => {
  const isCompleted = task.status === 'completed';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative p-6 rounded-xl shadow-sm border bg-white transition-all hover:shadow-md
        ${isCompleted ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-brand-500'}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-bold ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1
          ${isCompleted ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black'}`}>
          {isCompleted ? <CheckCircle size={12}/> : <Clock size={12}/>}
          {task.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 min-h-10">{task.description}</p>

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        {role === 'admin' ? (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User size={14} />
            Assigned to: <span className="font-semibold text-brand-600">{task.assignedTo?.name || 'Unknown'}</span>
          </div>
        ) : (
           // Spacer for Dev
           <div className="text-xs text-gray-400">Due: ASAP</div>
        )}

        <div className="flex gap-2">
          {role === 'dev' && !isCompleted && (
            <button 
              onClick={() => onComplete(task._id)}
              className="flex items-center gap-1 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all"
            >
              <CheckCircle size={16} /> Mark Done
            </button>
          )}

          {role === 'admin' && (
            <button 
              onClick={() => onDelete(task._id)}
              className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all"
            >
              <Trash2 size={16} /> Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;





