import { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const ConsultaProjeto = () => {
  const [projetos, setProjetos] = useState([]);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/projeto/buscar')
      .then(response => response.json())
      .then(data => setProjetos(data))
      .catch(error => console.error('Erro ao carregar os projetos:', error));
  }, []);

  const carregarItens = (projetoId) => {
    fetch(`http://localhost:8080/conjuntoitens/projeto/${projetoId}`)
      .then(response => response.json())
      .then(data => setItens(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const projetoId = event.target.projetoId.value;
    carregarItens(projetoId);
  };

  return (
    <div className="div-container gradient-background">
      <Sidebar />
      <div className="container">
        <br /><br />
        <h1>Consulta de Projeto</h1>
        <br /><br />

        <table id="tabelaProjetos" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((projeto, index) => (
              <tr key={index}>
                <td>{projeto.id}</td>
                <td>{projeto.nome}</td>
                <td>{projeto.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br /><br />
        <form id="alterarForm" onSubmit={handleSubmit}>
          <label htmlFor="projetoId">Id do projeto para consultar: </label>
          <input type="text" id="projetoId" name="projetoId" required />
          <button type="submit" id="alterarBtn">Selecionar</button>
        </form>

        <br /><br />
        <form id="formProjeto" method="POST">
          <h1>Itens do Projeto</h1>
          <table id="itensProjeto" className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do item</th>
                <th>Quantidade</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Sala</th>
                <th>Armario</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((projetoItens, index) => (
                <tr key={index}>
                  <td>{projetoItens.item.id}</td>
                  <td>{projetoItens.item.nome}</td>
                  <td>{projetoItens.quantidade}</td>
                  <td>{projetoItens.item.tipo}</td>
                  <td>{projetoItens.item.descricao}</td>
                  <td>{projetoItens.localArmazen.sala}</td>
                  <td>{projetoItens.localArmazen.armario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ConsultaProjeto;
