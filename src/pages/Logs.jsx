import React, { useState, useEffect } from 'react';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('logs')) || [];

    setLogs(savedLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }, []);

  const handleDeleteLogs = () => {
    if (window.confirm('Are you sure you want to delete all logs?')) {
      localStorage.removeItem('logs');
      setLogs([]);
    }
  };


  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>To do List Logs</h2>
      <button onClick={handleDeleteLogs} style={{ marginBottom: '10px' }}>
        Delete All Logs
      </button>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
            <th>Task Name</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="3">No logs available</td>
            </tr>
          ) : (
            currentLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.timestamp}</td>
                <td>{log.action}</td>
                <td>{log.taskName ? log.taskName : '-'}</td>
              </tr>
            ))
          )}
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
          disabled={indexOfLastLog >= logs.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Logs;
