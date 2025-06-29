import { useEffect, useState } from 'react';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  shareTask
} from '../services/api';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/dashboard.css';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res.data);
    } catch {
      navigate('/');
    }
  };

  useEffect(() => {
    getTasks();
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true
    });

    socket.on('taskCreated', getTasks);
    socket.on('taskUpdated', getTasks);
    socket.on('taskDeleted', getTasks);
    socket.on('taskShared', getTasks);
  }, []);

  const handleAdd = async (task) => {
    await createTask(task);
    await getTasks();
    setShowModal(false);
  };

  const handleUpdate = async (id, updates) => {
    await updateTask(id, updates);
    await getTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await getTasks();
  };

  const handleShare = async (id, email) => {
    try {
      await shareTask(id, email);
      await getTasks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Share failed');
    }
  };

  const filteredAndSorted = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="dashboard">
      {/* Filter + Button Row */}
      <div className="dashboard-top">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button className="new-task-btn" onClick={() => setShowModal(true)}>+ New Task</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Task</h3>
            <TaskForm onSubmit={handleAdd} />
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="task-list">
        {filteredAndSorted.length > 0 ? (
          filteredAndSorted.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onShare={handleShare}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
