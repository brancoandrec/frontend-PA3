import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const ConsultaCompra = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/compra/buscar')
      .then(response => response.json())
      .then(data => setCompras(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  }, []);

  const formataData = (data) => {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="div-container gradient-background">
      <Sidebar />
      <div className="container">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Consulta de Compra</h1>
        <table id="tabelaCompras">
          <thead>
            <tr>
              <th>ID</th>
              <th>Itens</th>
              <th>Data Compra</th>
              <th>Data Invoice</th>
              <th>Data Recebimento</th>
              <th>Preço</th>
              <th>Fornecedor</th>
              <th>Projeto</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra, index) => (
              <tr key={index}>
                <td>{compra.id}</td>
                <td>
                  {Array.isArray(compra.item)
                    ? compra.item.map(i => i.nome).join(', ')
                    : compra.item?.nome || 'Nenhum item'}
                </td>
                <td>{formataData(compra.dataRecebimento)}</td>
                <td>{formataData(compra.dataRecebimento)}</td>
                <td>{formataData(compra.dataRecebimento)}</td>
                <td>{compra.preco}</td>
                <td>{compra.fornecedor?.id ? compra.fornecedor.nome : ''}</td>
                <td>{compra.projeto?.id ? compra.projeto.nome : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultaCompra;
