import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

function DeletarLocal() {
  const [locais, setLocais] = useState([]);
  const [localId, setLocalId] = useState('');

  const carregarLocais = () => {
    fetch('http://localhost:8080/localarmazen/buscar')
      .then((response) => response.json())
      .then((data) => setLocais(data))
      .catch((error) => console.error('Erro ao carregar os locais:', error));
  };

  useEffect(() => {
    carregarLocais();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/localarmazen/excluir/${localId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setLocalId('');
        setTimeout(carregarLocais, 500);
      })
      .catch((error) => console.error('Erro ao deletar o local:', error));
  };

  return (
    <div className="tudo div-container gradient-background">
      <Sidebar />
      <div className="container  mx-auto w-[90%] max-w-6xl mt-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Deletar Local</h1>
        <table className="table w-full" id="tabelaLocais">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Armário</th>
              <th className="text-left">Sala</th>
            </tr>
          </thead>
          <tbody>
            {locais.map((local) => (
              <tr key={local.id}>
                <td>{local.id}</td>
                <td>{local.armario}</td>
                <td>{local.sala}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
  id="deleteForm"
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-xl mx-auto mt-8">
  <div>
    <label
      htmlFor="localId"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      ID do local:
    </label>
    <input
      type="number"
      id="localId"
      name="localId"
      value={localId}
      onChange={(e) => setLocalId(e.target.value)}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
  >
    Deletar
  </button>
</form>
      </div>
    </div>
  );
}

export default DeletarLocal;
