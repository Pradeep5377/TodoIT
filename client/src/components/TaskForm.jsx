import { useState } from 'react';

import '../styles/taskForm.css'; 
const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: '', description: '', priority: 'Low', dueDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
