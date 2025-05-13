import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

export default function DeletarCompra() {
  const [compras, setCompras] = useState([]);
  const [compraId, setCompraId] = useState('');

  useEffect(() => {
    carregarCompras();
  }, []);

  const carregarCompras = () => {
    fetch('http://localhost:8080/compra/buscar')
      .then((response) => response.json())
      .then((data) => setCompras(data))
      .catch((error) => console.error('Erro ao carregar as compras:', error));
  };

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/compra/excluir/${compraId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCompraId('');
        setTimeout(carregarCompras, 500);
      })
      .catch((error) => console.error('Erro ao deletar a compra:', error));
  };

  return (
    <div className="div-container gradient-background tudo">
      <Sidebar />
      <div className="container">
        <br /><br />
        <table id="tabelaCompras" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Projeto</th>
              <th>Data compra</th>
              <th>Fornecedor</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.id}</td>
                <td>{compra.projeto?.nome}</td>
                <td>{compra.dataCompra}</td>
                <td>{compra.fornecedor?.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1>Deletar Compra</h1>
        <br /><br />
        <form onSubmit={handleDelete}>
          <label htmlFor="compraId">ID da compra:</label>
          <input
            type="number"
            id="compraId"
            name="compraId"
            required
            value={compraId}
            onChange={(e) => setCompraId(e.target.value)}
          />
          <button type="submit">Deletar</button>
        </form>
      </div>
    </div>
  );
}
