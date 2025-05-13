import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const AlterarLocal = () => {
  const [locais, setLocais] = useState([]);
  const [localId, setLocalId] = useState('');
  const [sala, setSala] = useState('');
  const [armario, setArmario] = useState('');

  const carregarLocais = async () => {
    try {
      const response = await fetch('http://localhost:8080/localarmazen/buscar');
      const data = await response.json();
      setLocais(data);
    } catch (error) {
      console.error('Erro ao carregar os locais:', error);
    }
  };

  const buscarLocal = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/localarmazen/buscarporid/${localId}`);
      const data = await response.json();
      setSala(data.sala);
      setArmario(data.armario);
    } catch (error) {
      console.error('Erro ao buscar local:', error);
    }
  };

  const alterarLocal = async (event) => {
    event.preventDefault();
    try {
      const dados = { id: localId, sala, armario };
      const response = await fetch(`http://localhost:8080/localarmazen/alterar/${localId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      const result = await response.json();
      console.log('Resposta do servidor:', result);
      carregarLocais();
    } catch (error) {
      console.error('Erro ao alterar local:', error);
    }
  };

  useEffect(() => {
    carregarLocais();
  }, []);

  return (
    <div className="div-container gradient-background tudo">
      <Sidebar />
      <div className="container">
        <h1 className="mt-4">Alterar Local</h1>

        <table className="table mt-4" id="tabelaLocais">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sala</th>
              <th>Armário</th>
            </tr>
          </thead>
          <tbody>
            {locais.map(local => (
              <tr key={local.id}>
                <td>{local.id}</td>
                <td>{local.sala}</td>
                <td>{local.armario}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <form onSubmit={buscarLocal} className="mt-4">
          <label htmlFor="localId">ID do local para alterar: </label>
          <input
            type="number"
            id="localId"
            name="localId"
            value={localId}
            onChange={(e) => setLocalId(e.target.value)}
            required
          />
          <button type="submit" id="alterarBtn" className="btn btn-primary ms-2">Alterar</button>
        </form>

        <form onSubmit={alterarLocal} className="mt-4">
          <h3>Local</h3>
          <label htmlFor="sala">Sala:</label>
          <input
            type="text"
            id="sala"
            name="sala"
            value={sala}
            onChange={(e) => setSala(e.target.value)}
            required
          />
          <br /><br />
          <label htmlFor="armario">Armário:</label>
          <input
            type="text"
            id="armario"
            name="armario"
            value={armario}
            onChange={(e) => setArmario(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit" id="enviarBtn" className="btn btn-success">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default AlterarLocal;
