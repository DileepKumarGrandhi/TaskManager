import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TaskCard from './components/TaskCard';
import Modal from './components/Modal';
import Button from './components/Button';
import { colors } from './theme';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
  });
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? { ...formData, id: task.id } : task
      ));
    } else {
      setTasks([...tasks, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
    });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.background.primary }}>
      <Navbar />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header Section */}
        <div
          style={{
            background: colors.background.secondary,
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', color: colors.text.primary, fontWeight: '700' }}>
                My Tasks
              </h2>
              <p style={{ margin: 0, color: colors.text.secondary, fontSize: '1rem' }}>
                {taskStats.total} total tasks • {taskStats.pending} pending • {taskStats.completed} completed
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} size="medium">
              + New Task
            </Button>
          </div>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {['all', 'pending', 'in-progress', 'completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: filter === status ? colors.primary[100] : colors.neutral[100],
                  color: filter === status ? colors.primary[700] : colors.text.secondary,
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s',
                }}
              >
                {status === 'all' ? 'All Tasks' : status.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: colors.background.secondary,
              borderRadius: '1rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ color: colors.text.primary, fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              No tasks found
            </h3>
            <p style={{ color: colors.text.secondary, marginBottom: '1.5rem' }}>
              {filter === 'all' ? 'Create your first task to get started!' : `No ${filter.replace('-', ' ')} tasks`}
            </p>
            {filter === 'all' && (
              <Button onClick={() => setIsModalOpen(true)}>
                Create Task
              </Button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: colors.text.primary,
              }}
            >
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: `2px solid ${colors.neutral[200]}`,
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = colors.primary[500]}
              onBlur={(e) => e.target.style.borderColor = colors.neutral[200]}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: colors.text.primary,
              }}
            >
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: `2px solid ${colors.neutral[200]}`,
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => e.target.style.borderColor = colors.primary[500]}
              onBlur={(e) => e.target.style.borderColor = colors.neutral[200]}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: colors.text.primary,
              }}
            >
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: `2px solid ${colors.neutral[200]}`,
                fontSize: '1rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {editingTask && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: colors.text.primary,
                }}
              >
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: `2px solid ${colors.neutral[200]}`,
                  fontSize: '1rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button type="submit" fullWidth>
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
            <Button type="button" variant="outline" onClick={handleCloseModal} fullWidth>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;
