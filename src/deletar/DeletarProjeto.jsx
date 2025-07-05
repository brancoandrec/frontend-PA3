import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

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
      .then((res) => res.text())
      .then(() => {
        setProjetoId('');
        setTimeout(carregarProjetos, 500);
      })
      .catch((err) => console.error('Erro ao deletar projeto:', err));
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />

      <div className="container mx-auto w-[90%] max-w-6xl mt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Deletar Projeto</h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">Descrição</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {projetos.map((projeto) => (
                <tr key={projeto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-t">{projeto.id}</td>
                  <td className="px-6 py-4 border-t">{projeto.nome}</td>
                  <td className="px-6 py-4 border-t">{projeto.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <form
            id="deleteForm"
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-xl mx-auto mt-8"
          >
            <div>
              <label
                htmlFor="projetoId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
    </div>
  );
}

export default DeletarProjeto;
