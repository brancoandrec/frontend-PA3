import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const DeletarItem = () => {
  const [itens, setItens] = useState([]);
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    carregarItens();
  }, []);

  const carregarItens = () => {
    fetch('http://localhost:8080/item/buscar')
      .then(response => response.json())
      .then(data => setItens(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  };

  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8080/item/excluir/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setItemId('');
        setTimeout(carregarItens, 500);
      });
  };

  return (
    <div className="tudo div-container gradient-background">
      <Sidebar />
      <div className="container">
        <br /><br />
        <h1>Deletar Itens</h1>
        <br /><br />
        <table className="table" id="tabelaItens">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.descricao}</td>
                <td>{item.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br /><br />
        <form onSubmit={handleDelete} id="deleteForm">
          <label htmlFor="itemId">ID do Item:</label>
          <input
            type="number"
            id="itemId"
            name="itemId"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
          />
          <button type="submit">Deletar</button>
        </form>
      </div>
    </div>
  );
};

export default DeletarItem;