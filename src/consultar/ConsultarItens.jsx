import { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

const ConsultarItens = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/item/buscar')
      .then(response => response.json())
      .then(data => setItens(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  }, []);

  return (
    <div className="div-container gradient-background">
     <Sidebar />
{/* Tabela de Itens */} 
      <div className="container">
       <h1 className="text-2xl font-bold mb-6 text-center text-black">Consulta de Itens</h1>
        <table id="tabelaItens" className="table w-full">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Nome</th>
               <th className="text-left">Descrição</th>
               <th className="text-left">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.descricao}</td>
                <td>{item.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultarItens;
