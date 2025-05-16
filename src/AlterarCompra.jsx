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
      <div className="flex-1 flex justify-center items-start mt-20">
    <div className="w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Alterar Compra</h1>
        <table id="tabelaCompras" className="w-full">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Itens</th>
              <th className="text-left">Data Compra</th>
              <th className="text-left">Data Invoice</th>
              <th className="text-left">Data Recebimento</th>
              <th className="text-left">Preço</th>
              <th className="text-left">Fornecedor ID</th>
              <th className="text-left">Fornecedor</th>
              <th className="text-left">Projeto ID</th>
              <th className="text-left">Projeto</th>
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
        <div className="flex justify-center mt-10">
        <form
  id="formCompra"
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full space-y-4"
>
  <h3 className="text-xl font-semibold mb-4">Compra</h3>

  <div>
    <label htmlFor="compraId" className="block text-sm font-medium text-gray-700 mb-1">
      ID Compra:
    </label>
    <input
      type="number"
      id="compraId"
      name="compraId"
      value={formData.compraId}
      onChange={handleChange}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="item_id" className="block text-sm font-medium text-gray-700 mb-1">
      IDs dos Itens (separados por vírgulas):
    </label>
    <input
      type="text"
      id="item_id"
      name="item_id"
      value={formData.item_id}
      onChange={handleChange}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="fornecedor_id" className="block text-sm font-medium text-gray-700 mb-1">
      ID Fornecedor:
    </label>
    <input
      type="number"
      id="fornecedor_id"
      name="fornecedor_id"
      value={formData.fornecedor_id}
      onChange={handleChange}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="projeto_id" className="block text-sm font-medium text-gray-700 mb-1">
      ID Projeto:
    </label>
    <input
      type="number"
      id="projeto_id"
      name="projeto_id"
      value={formData.projeto_id}
      onChange={handleChange}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
      Preço:
    </label>
    <input
      type="number"
      id="preco"
      name="preco"
      value={formData.preco}
      onChange={handleChange}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="dataCompra" className="block text-sm font-medium text-gray-700 mb-1">
      Data da compra:
    </label>
    <input
      type="date"
      id="dataCompra"
      name="dataCompra"
      value={formData.dataCompra}
      onChange={handleChange}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="dataInvoice" className="block text-sm font-medium text-gray-700 mb-1">
      Data Invoice:
    </label>
    <input
      type="date"
      id="dataInvoice"
      name="dataInvoice"
      value={formData.dataInvoice}
      onChange={handleChange}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="dataRecebimento" className="block text-sm font-medium text-gray-700 mb-1">
      Data de recebimento:
    </label>
    <input
      type="date"
      id="dataRecebimento"
      name="dataRecebimento"
      value={formData.dataRecebimento}
      onChange={handleChange}
      required
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
  >
    Enviar
  </button>
</form>
</div>
      </div>
    </div>
    </div>
  );
};

export default AlterarCompra;
