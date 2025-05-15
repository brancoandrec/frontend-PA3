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

       <h1 className="text-2xl font-bold mb-6 text-center text-black">Deletar Projeto</h1>

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

        <form
  id="deleteForm"
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md mx-auto mt-8">
  <div>
    <label
      htmlFor="projetoId"
      className="block text-sm font-medium text-gray-700 mb-1">
      ID do Projeto:
    </label>
    <input
      type="number"
      id="projetoId"
      name="projetoId"
      value={projetoId}
      onChange={(e) => setProjetoId(e.target.value)}
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

export default DeletarProjeto;
