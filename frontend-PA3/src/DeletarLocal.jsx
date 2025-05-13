import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

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
      <div className="container mt-4">
        <br /><br />
        <h1>Deletar Local</h1>
        <br />

        <table className="table" id="tabelaLocais">
          <thead>
            <tr>
              <th>ID</th>
              <th>Armário</th>
              <th>Sala</th>
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

        <form id="deleteForm" onSubmit={handleSubmit}>
          <label htmlFor="localId">ID do local:</label>
          <input
            type="number"
            id="localId"
            name="localId"
            value={localId}
            onChange={(e) => setLocalId(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-danger ms-2">Deletar</button>
        </form>
      </div>
    </div>
  );
}

export default DeletarLocal;
