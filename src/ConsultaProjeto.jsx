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
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Consulta de Projeto</h1>
        <table id="tabelaProjetos" className="table w-full">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Nome</th>
              <th className="text-left">Descrição</th>
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
        <form
  id="alterarForm"
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow-lg space-y-4 mt-8 w-full max-w-md mx-auto">
  <div>
    <label
      htmlFor="projetoId"
      className="block text-sm font-medium text-gray-700 mb-1">
      ID do Projeto para consultar:
    </label>
    <input
      type="text"
      id="projetoId"
      name="projetoId"
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <button
    type="submit"
    id="alterarBtn"
    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
      Selecionar
      </button>
      </form>
        <br /><br />
        <form id="formProjeto" method="POST" className="w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Itens do Projeto</h1>
          <table id="itensProjeto" className="table w-full">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Nome do item</th>
                <th className="text-left">Quantidade</th>
                <th className="text-left">Tipo</th>
                <th className="text-left">Descrição</th>
                <th className="text-left">Sala</th>
                <th className="text-left">Armario</th>
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
