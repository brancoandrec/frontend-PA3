import { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

const ConsultarLocal = () => {
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
{/* Tabela de Locais */} 
      <div className="container mx-auto w-[90%] max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Consulta de Local</h1>
        <table id="tabelaLocais" className="table w-full">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Sala</th>
              <th className="text-left">Armário</th>
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

export default ConsultarLocal;
