import { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const ConsultaItens = () => {
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

      <div className="container">
        <br /><br />
        <h1>Consulta de Itens</h1>
        <br /><br />

        <table id="tabelaItens" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Tipo</th>
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

export default ConsultaItens;
