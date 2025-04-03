import React, { useState, useEffect } from 'react'; 
import { FaRegEdit, FaRegTrashAlt, FaCheck } from 'react-icons/fa'; 

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('normal');
  const [dueDate, setDueDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const saveLogToLocalStorage = (log) => {
    const savedLogs = JSON.parse(localStorage.getItem('logs')) || [];
    savedLogs.push(log);
    localStorage.setItem('logs', JSON.stringify(savedLogs));
  };

  const handleAddTask = () => {
    if (!newTask || !dueDate) return;
  
    const newTaskObject = {
      id: Date.now(),
      name: newTask,
      priority,
      dueDate: new Date(dueDate).toISOString(),  
      status: 'pending',
      notes: '',
    };
  
    const updatedTasks = [...tasks, newTaskObject];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setIsModalOpen(false);
    setNewTask('');
    setPriority('normal');
    setDueDate('');
  
    const log = {
      action: `You added a task`,
      taskId: newTaskObject.id,
      taskName: newTaskObject.name,
      timestamp: new Date().toLocaleString(),
    };
    saveLogToLocalStorage(log);
  };
  
  const handleEditTask = (id, newName, newPriority, newDueDate) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, name: newName, priority: newPriority, dueDate: new Date(newDueDate).toISOString() }
        : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setIsEditModalOpen(false);
  
    const editedTask = tasks.find(task => task.id === id);
    const log = {
      action: `You edited a task`,
      taskId: editedTask.id,
      taskName: editedTask.name,
      timestamp: new Date().toLocaleString(),
    };
    saveLogToLocalStorage(log);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: 'deleted', deletedAt: Date.now() } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);

    const deletedTask = tasks.find(task => task.id === id);
    const log = {
      action: `You deleted a task`,
      taskId: deletedTask.id,
      taskName: deletedTask.name,
      timestamp: new Date().toLocaleString(),
    };
    saveLogToLocalStorage(log);
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: 'completed' } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);

    const completedTask = tasks.find(task => task.id === id);
    const log = {
      action: `You completed a task`,
      taskId: completedTask.id,
      taskName: completedTask.name,
      timestamp: new Date().toLocaleString(),
    };
    saveLogToLocalStorage(log);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const openEditModal = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) && task.status !== 'deleted'
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Separate tasks by their status
  const inProgressTasks = filteredTasks.filter(task => task.status !== 'completed');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  return (
    <div>
      <h2>To do List</h2>
      <button onClick={() => setIsModalOpen(true)}>Add New Task</button>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create New Task</h3>
            <label>Task Name</label>
            <input
              type="text"
              placeholder="Task Name"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
           
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
            
            <button onClick={handleAddTask}><FaCheck /> Add Task</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isEditModalOpen && editTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <label>Task Name</label>
            <input
              type="text"
              value={editTask.name}
              onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
            />
            <label>Due Date</label>
            <input
              type="date"
              value={editTask.dueDate}
              onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
            />
            <label>Priority</label>
            <select
              value={editTask.priority}
              onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={() =>
                handleEditTask(
                  editTask.id,
                  editTask.name,
                  editTask.priority,
                  editTask.dueDate
                )
              }
            >
              <FaRegEdit /> Save Changes
            </button>
            <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <h3>In Progress Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inProgressTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)).map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.priority}</td>
              <td>{formatDate(task.dueDate)}</td>
              <td>{task.status === 'completed' ? 'Completed' : 'In Progress'}</td>
              <td>
                <button onClick={() => handleCompleteTask(task.id)}><FaCheck /></button>
                <button onClick={() => openEditModal(task)}><FaRegEdit /></button>
                <button onClick={() => handleDeleteTask(task.id)}><FaRegTrashAlt /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastTask >= filteredTasks.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
