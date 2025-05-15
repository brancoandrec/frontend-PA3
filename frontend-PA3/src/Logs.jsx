import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import './styles.css';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/log/buscar')
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error('Erro ao carregar os logs:', err));
  }, []);

  const formataData = (dataString) => {
    const date = new Date(dataString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
    <div className="div-container gradient-background">
        <Sidebar />
      <div className="container">
        <br /><br />
        <h1>Consulta de Logs</h1>
        <br /><br />

        <table className="table" id="tabelaCompras">
          <thead>
            <tr>
              <th>ID</th>
              <th>Método</th>
              <th>Classe</th>
              <th>Nome Método</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.httpMetodo}</td>
                <td>{log.classe}</td>
                <td>{log.nomeMetodo}</td>
                <td>{formataData(log.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};


export default Logs;
