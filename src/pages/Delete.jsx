import React, { useState, useEffect } from 'react';

const Delete = () => {
  const [deletedTasks, setDeletedTasks] = useState([]);


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const deletedTasks = savedTasks.filter(task => task.status === 'deleted');
    setDeletedTasks(deletedTasks);
  }, []);


  const handlePermanentDelete = (id) => {
    const updatedTasks = deletedTasks.filter(task => task.id !== id);
    setDeletedTasks(updatedTasks);
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const remainingTasks = allTasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(remainingTasks));


    const log = {
      action: `You permanently deleted a task`,
      taskId: id,
      timestamp: new Date().toLocaleString(),
    };
    saveLogToLocalStorage(log);
  };


  const handleRestoreTask = (id) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = allTasks.map(task =>
      task.id === id ? { ...task, status: 'pending' } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setDeletedTasks(deletedTasks.filter(task => task.id !== id));


    const restoredTask = deletedTasks.find(task => task.id === id);
    const log = {
      action: `You restored a task`,
      taskId: restoredTask.id,
      taskName: restoredTask.name,
      timestamp: new Date().toLocaleString(),
    };
    saveLogToLocalStorage(log);
  };


  const saveLogToLocalStorage = (log) => {
    const savedLogs = JSON.parse(localStorage.getItem('logs')) || [];
    savedLogs.push(log);
    localStorage.setItem('logs', JSON.stringify(savedLogs));
  };

  return (
    <div>
      <h2>Deleted Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deletedTasks.map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleRestoreTask(task.id)}>Restore</button>
                <button onClick={() => handlePermanentDelete(task.id)}>Delete Permanently</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Delete;
