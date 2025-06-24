import { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

const ConsultarConjuntoItens = () => {
  const [conjuntoItens, setConjuntoItens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/conjuntoitens/buscar')
      .then(response => response.json())
      .then(data => setConjuntoItens(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  }, []);

  const formataData = (dataParaConverter) => {
    const date = new Date(dataParaConverter);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />

      {/* Tabela de Conjunto de Itens */}
      <div className="container mx-auto w-[90%] max-w-7xl mt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">
          Consulta de Conjunto de Itens
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Quantidade</th>
                <th className="px-6 py-4 text-left">Item</th>
                <th className="px-6 py-4 text-left">Tipo do item</th>
                <th className="px-6 py-4 text-left">Descrição do item</th>
                <th className="px-6 py-4 text-left">Sala</th>
                <th className="px-6 py-4 text-left">Armário</th>
                <th className="px-6 py-4 text-left">Nome do projeto</th>
                <th className="px-6 py-4 text-left">Descrição do projeto</th>
                <th className="px-6 py-4 text-left">Data início</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {conjuntoItens.map((conjunto) => (
                <tr key={conjunto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-t">{conjunto.id}</td>
                  <td className="px-6 py-4 border-t">{conjunto.quantidade}</td>
                  <td className="px-6 py-4 border-t">{conjunto.item?.nome}</td>
                  <td className="px-6 py-4 border-t">{conjunto.item?.tipo}</td>
                  <td className="px-6 py-4 border-t">{conjunto.item?.descricao}</td>
                  <td className="px-6 py-4 border-t">{conjunto.localArmazen?.sala}</td>
                  <td className="px-6 py-4 border-t">{conjunto.localArmazen?.armario}</td>
                  <td className="px-6 py-4 border-t">{conjunto.projeto?.nome}</td>
                  <td className="px-6 py-4 border-t">{conjunto.projeto?.descricao}</td>
                  <td className="px-6 py-4 border-t">{formataData(conjunto.projeto?.dataInicio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultarConjuntoItens;