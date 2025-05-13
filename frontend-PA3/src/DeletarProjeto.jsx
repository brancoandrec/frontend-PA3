import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

function DeletarProjeto() {
  const [projetos, setProjetos] = useState([]);
  const [projetoId, setProjetoId] = useState('');

  const carregarProjetos = () => {
    fetch('http://localhost:8080/projeto/buscar')
      .then((res) => res.json())
      .then((data) => setProjetos(data))
      .catch((err) => console.error('Erro ao carregar projetos:', err));
  };

  useEffect(() => {
    carregarProjetos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/projeto/excluir/${projetoId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setProjetoId('');
        setTimeout(carregarProjetos, 500);
      })
      .catch((err) => console.error('Erro ao deletar projeto:', err));
  };

  return (
    <div className="tudo div-container gradient-background">
      <Sidebar />
      <div className="container mt-4">
        <br /><br />

        <h1>Deletar Projeto</h1>
        <br />

        <table className="table" id="tabelaProjetos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((projeto) => (
              <tr key={projeto.id}>
                <td>{projeto.id}</td>
                <td>{projeto.nome}</td>
                <td>{projeto.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <form id="deleteForm" onSubmit={handleSubmit}>
          <label htmlFor="projetoId">ID do Projeto:</label>
          <input
            type="number"
            id="projetoId"
            name="projetoId"
            value={projetoId}
            onChange={(e) => setProjetoId(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-danger ms-2">Deletar</button>
        </form>
      </div>
    </div>
  );
}

export default DeletarProjeto;
