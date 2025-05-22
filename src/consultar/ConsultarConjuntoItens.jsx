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
    <div className="div-container gradient-background">
     <Sidebar />

      <div className="container container-conjitens">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Consulta de Conjunto de Itens</h1>
        <table id="tabelaConjuntoItens" className="!w-auto">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Quantidade</th>
              <th className="text-left">Item</th>
              <th className="text-left">Tipo do item</th>
              <th className="text-left">Descrição do item</th>
              <th className="text-left">Sala</th>
              <th className="text-left">Armario</th>
              <th className="text-left">Nome do projeto</th>
              <th className="text-left">Descrição do projeto</th>
              <th className="text-left">Data de ínicio do projeto</th>
            </tr>
          </thead>
          <tbody>
            {conjuntoItens.map((conjunto) => (
              <tr key={conjunto.id}>
                <td>{conjunto.id}</td>
                <td>{conjunto.quantidade}</td>
                <td>{conjunto.item.nome}</td>
                <td>{conjunto.item.tipo}</td>
                <td>{conjunto.item.descricao}</td>
                <td>{conjunto.localArmazen.sala}</td>
                <td>{conjunto.localArmazen.armario}</td>
                <td>{conjunto.projeto.nome}</td>
                <td>{conjunto.projeto.descricao}</td>
                <td>{formataData(conjunto.projeto.dataInicio)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultarConjuntoItens;
