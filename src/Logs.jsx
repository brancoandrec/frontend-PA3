import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar'; 
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
      <div className="container mx-auto w-[80%]">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Consulta de Logs</h1>

        <table className="table" id="tabelaCompras">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Método</th>
              <th className="text-left">Classe</th>
              <th className="text-left">Nome Método</th>
              <th className="text-left">Timestamp</th>
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
