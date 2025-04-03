import React, { useState, useEffect } from 'react';

const Complete = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks.filter(task => task.status === 'completed'));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH'); 
  };

  return (
    <div>
      <h2>Completed Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) 
            .map(task => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td>{formatDate(task.dueDate)}</td> {/* Apply formatDate */}
                <td>{task.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Complete;
