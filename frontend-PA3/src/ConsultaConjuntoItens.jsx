import { useEffect, useState } from 'react';
import './styles.css';

const ConsultaConjuntoItens = () => {
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
      <div className="sidebar">
        <ul>
          <li>
            <img
              className="logo-isi-menu"
              src="../images/image_53.png__486x175_q85_crop_subsampling-2_upscale.png"
              alt="logo instituto senai de inovação"
            />
          </li>
          <li><a href="invoice.html">Invoice</a></li>
          <li><a href="cadastro.html">Cadastro</a></li>
          <li><a href="consulta.html">Consulta</a></li>
          <li><a href="alterar.html">Alterar</a></li>
          <li><a href="deletar.html">Deletar</a></li>
        </ul>
      </div>

      <div className="container">
        <br /><br />
        <h1>Consulta de Conjunto Itens</h1>
        <br /><br />

        <table id="tabelaConjuntoItens" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Quantidade</th>
              <th>Item</th>
              <th>Tipo do item</th>
              <th>Descrição do item</th>
              <th>Sala</th>
              <th>Armario</th>
              <th>Nome do projeto</th>
              <th>Descrição do projeto</th>
              <th>Data de ínicio do projeto</th>
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

export default ConsultaConjuntoItens;
