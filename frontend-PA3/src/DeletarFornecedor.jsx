import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const DeletarFornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorId, setFornecedorId] = useState('');

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = () => {
    fetch('http://localhost:8080/fornecedor/buscar')
      .then(response => response.json())
      .then(data => setFornecedores(data))
      .catch(error => console.error('Erro ao carregar os fornecedores:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/fornecedor/excluir/${fornecedorId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setFornecedorId('');
        setTimeout(() => carregarFornecedores(), 500);
      });
  };

  return (
    <div className="tudo">
      <div className="div-container gradient-background">
        <Sidebar />
        <div className="container">
          <br /><br />
          <h1>Deletar Fornecedor</h1>
          <br /><br />

          <table className="table" id="tabelaFornecedores">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Contato</th>
                <th>Endereço</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.map(f => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.nome}</td>
                  <td>{f.contato}</td>
                  <td>{f.endereco}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <br /><br />
          <form id="deleteForm" onSubmit={handleSubmit}>
            <label htmlFor="fornecedorId">ID do fornecedor:</label>
            <input
              type="number"
              id="fornecedorId"
              name="fornecedorId"
              required
              value={fornecedorId}
              onChange={(e) => setFornecedorId(e.target.value)}
            />
            <button type="submit">Deletar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeletarFornecedor;
