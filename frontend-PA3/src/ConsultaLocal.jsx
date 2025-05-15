import { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const ConsultaLocal = () => {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/localarmazen/buscar')
      .then(response => response.json())
      .then(data => setLocais(data))
      .catch(error => console.error('Erro ao carregar os locais:', error));
  }, []);

  return (
    <div className="div-container gradient-background">
      <Sidebar />

      <div className="container">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Consulta de Local</h1>
        <table id="tabelaLocais" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sala</th>
              <th>Armário</th>
            </tr>
          </thead>
          <tbody>
            {locais.map((local, index) => (
              <tr key={index}>
                <td>{local.id}</td>
                <td>{local.sala}</td>
                <td>{local.armario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultaLocal;
