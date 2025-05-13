import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const AlterarCompra = () => {
  const [compras, setCompras] = useState([]);
  const [formData, setFormData] = useState({
    compraId: '',
    item_id: '',
    fornecedor_id: '',
    projeto_id: '',
    preco: '',
    dataCompra: '',
    dataInvoice: '',
    dataRecebimento: ''
  });

  useEffect(() => {
    carregarCompras();
  }, []);

  const carregarCompras = () => {
    fetch('http://localhost:8080/compra/buscar')
      .then((response) => response.json())
      .then((compras) => {
        setCompras(compras);
      })
      .catch((error) => {
        console.error('Erro ao carregar os itens:', error);
      });
  };

  const formataData = (dataParaConverter) => {
    const date = new Date(dataParaConverter);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemIds = formData.item_id
      .split(',')
      .map((id) => ({ id: parseInt(id.trim()) }));

    const compra = {
      id: formData.compraId,
      dataCompra: formData.dataCompra,
      dataInvoice: formData.dataInvoice,
      dataRecebimento: formData.dataRecebimento,
      preco: formData.preco,
      projeto: { id: parseInt(formData.projeto_id) },
      fornecedor: { id: parseInt(formData.fornecedor_id) },
      item: itemIds
    };

    fetch('http://localhost:8080/compra/alterar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(compra)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Sucesso:', data);
        setFormData({
          compraId: '',
          item_id: '',
          fornecedor_id: '',
          projeto_id: '',
          preco: '',
          dataCompra: '',
          dataInvoice: '',
          dataRecebimento: ''
        });
        carregarCompras();
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="div-container gradient-background">
      <Sidebar />

      <div className="container">
        <br />
        <br />
        <h1>Alterar Compra</h1>
        <br />
        <table id="tabelaCompras">
          <thead>
            <tr>
              <th>ID</th>
              <th>Itens</th>
              <th>Data Compra</th>
              <th>Data Invoice</th>
              <th>Data Recebimento</th>
              <th>Preço</th>
              <th>Fornecedor ID</th>
              <th>Fornecedor</th>
              <th>Projeto ID</th>
              <th>Projeto</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.id}</td>
                <td>{Array.isArray(compra.item) ? compra.item.map(i => i.nome).join(', ') : compra.item.nome}</td>
                <td>{formataData(compra.dataCompra)}</td>
                <td>{formataData(compra.dataInvoice)}</td>
                <td>{formataData(compra.dataRecebimento)}</td>
                <td>{compra.preco}</td>
                <td>{compra.fornecedor?.id || ''}</td>
                <td>{compra.fornecedor?.nome || ''}</td>
                <td>{compra.projeto?.id || ''}</td>
                <td>{compra.projeto?.nome || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <br />
        <form id="formCompra" onSubmit={handleSubmit}>
          <h3>Compra</h3>
          <label htmlFor="compraId">ID Compra:</label>
          <input
            type="number"
            id="compraId"
            name="compraId"
            value={formData.compraId}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="item_id">IDs dos Itens (separados por vírgulas):</label>
          <input
            type="text"
            id="item_id"
            name="item_id"
            value={formData.item_id}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="fornecedor_id">ID Fornecedor:</label>
          <input
            type="number"
            id="fornecedor_id"
            name="fornecedor_id"
            value={formData.fornecedor_id}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="projeto_id">ID Projeto:</label>
          <input
            type="number"
            id="projeto_id"
            name="projeto_id"
            value={formData.projeto_id}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="dataCompra">Data da compra:</label>
          <input
            type="date"
            id="dataCompra"
            name="dataCompra"
            value={formData.dataCompra}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="dataInvoice">Data Invoice:</label>
          <input
            type="date"
            id="dataInvoice"
            name="dataInvoice"
            value={formData.dataInvoice}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="dataRecebimento">Data de recebimento:</label>
          <input
            type="date"
            id="dataRecebimento"
            name="dataRecebimento"
            value={formData.dataRecebimento}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default AlterarCompra;
