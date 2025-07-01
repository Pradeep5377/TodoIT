import { useState, useRef, useEffect } from 'react';
import ShareModal from './ShareModal.jsx';
import '../styles/taskItem.css';

const TaskItem = ({ task, onDelete, onUpdate, onShare }) => {
  const [editing, setEditing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [edited, setEdited] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ''
  });

  const toggleEdit = () => setEditing(prev => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(task._id, edited);
    setEditing(false);
  };

  const handleMarkFinished = () => {
    onUpdate(task._id, { status: 'finished' });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  const handleShareConfirm = (email) => {
    onShare(task._id, email);
    setIsShareOpen(false);
  };

  const handleDropdownToggle = () => setDropdownOpen(prev => !prev);

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnClickOutside);
    return () => document.removeEventListener('mousedown', closeOnClickOutside);
  }, []);

  return (
    <div className={`task-card ${task.status === 'finished' ? 'finished' : ''}`}>
      {editing ? (
        <>
          <input name="title" value={edited.title} onChange={handleChange} />
          <textarea name="description" value={edited.description} onChange={handleChange} />
          <select name="priority" value={edited.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input type="date" name="dueDate" value={edited.dueDate} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          <div className="task-header">
            <h3>{task.title}</h3>
            <div className="dropdown-wrapper" ref={dropdownRef}>
              <button className="dots-btn" onClick={handleDropdownToggle}>⋮</button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={toggleEdit}>Edit</button>
                  {task.status !== 'finished' && (
                    <button onClick={handleMarkFinished}>Mark as Finished</button>
                  )}
                  <button onClick={handleDelete} className="btn-delete">Delete</button>
                  <button onClick={() => {
                    setIsShareOpen(true);
                    setDropdownOpen(false);
                  }}>
                    Share
                  </button>
                </div>
              )}
            </div>
          </div>

          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>
            Due: {new Date(task.dueDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
          <p>Status: {task.status}</p>

          <ShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            onConfirm={handleShareConfirm}
          />

          {task.sharedWith && task.sharedWith.length > 0 && (
            <p className="shared-with">
              Shared with:{' '}
              {task.sharedWith.map((user, idx) => (
                <span key={user._id || idx}>
                  {user.email || user}
                  {idx < task.sharedWith.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;
