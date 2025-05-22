import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

export default function AlterarConjuntoItens() {
  const [conjuntos, setConjuntos] = useState([]);
  const [formData, setFormData] = useState({
    conjuntoItensId: '',
    quantidade: '',
    item: '',
    local: '',
    projeto: ''
  });

  useEffect(() => {
    carregarConjuntoItens();
  }, []);

  const carregarConjuntoItens = async () => {
    try {
      const response = await fetch('http://localhost:8080/conjuntoitens/buscar');
      const data = await response.json();
      setConjuntos(data);
    } catch (error) {
      console.error('Erro ao carregar os itens:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      id: formData.conjuntoItensId,
      quantidade: formData.quantidade,
      item: { id: formData.item },
      localArmazen: { id: formData.local },
      projeto: { id: formData.projeto }
    };

    try {
      const response = await fetch('http://localhost:8080/conjuntoitens/alterar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      const data = await response.json();
      console.log('Atualizado com sucesso:', data);
      carregarConjuntoItens();
    } catch (error) {
      console.error('Erro na atualização:', error);
    }
  };

  return (
    <div className="tudo flex min-h-screen">
  <Sidebar />
  {/* Tabela de Conjunto de Itens */} 
  <div className="flex justify-center items-start w-full mt-20">
    <div className="w-full max-w-4xl px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        Alterar Conjunto de Itens
      </h1>

      <table className="table w-full mb-10" id="tabelaConjuntoItens">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Quantidade</th>
            <th className="text-left">Item ID</th>
            <th className="text-left">Item</th>
            <th className="text-left">Local ID</th>
            <th className="text-left">Sala</th>
            <th className="text-left">Armário</th>
            <th className="text-left">Projeto ID</th>
            <th className="text-left">Projeto</th>
          </tr>
        </thead>
        <tbody>
          {conjuntos.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.quantidade}</td>
              <td>{c.item.id}</td>
              <td>{c.item.nome}</td>
              <td>{c.localArmazen.id}</td>
              <td>{c.localArmazen.sala}</td>
              <td>{c.localArmazen.armario}</td>
              <td>{c.projeto.id}</td>
              <td>{c.projeto.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white w-3/4 p-6 rounded-xl shadow-lg space-y-4 mb-8"
      >
        <label htmlFor="conjuntoItensId" className="block text-sm font-medium text-gray-700 mb-1">
          ID do Conjunto Itens para alterar:
        </label>
        <input
          type="number"
          id="conjuntoItensId"
          name="conjuntoItensId"
          value={formData.conjuntoItensId}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-500 rounded-md p-2"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Alterar
        </button>
      </form>
      </div>
      <div className="flex justify-center">
      <form
        id="formConjuntoItens"
        onSubmit={handleSubmit}
        className="bg-white p-6 w-3/4 rounded-xl shadow-lg space-y-4"
      >
        <h3 className="text-xl font-semibold mb-4">Conjunto Itens</h3>

        {/* Campos do formulário */}
        {["quantidade", "item", "local", "projeto"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
              {`ID ${field.charAt(0).toUpperCase() + field.slice(1)}:`}
            </label>
            <input
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-500 rounded-md p-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          Enviar
        </button>
      </form>
      </div>
    </div>
  </div>
</div>


  );
}
