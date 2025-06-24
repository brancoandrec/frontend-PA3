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
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />

      {/* Tabela de Locais */}
      <div className="container mx-auto w-[90%] max-w-6xl mt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Consulta de Local</h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Sala</th>
                <th className="px-6 py-4 text-left">Armário</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {locais.map((local, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-t">{local.id}</td>
                  <td className="px-6 py-4 border-t">{local.sala}</td>
                  <td className="px-6 py-4 border-t">{local.armario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultarLocal;
