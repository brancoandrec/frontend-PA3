import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

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
  <div className="div-container gradient-background min-h-screen flex">
    <Sidebar />

    <div className="container mx-auto w-[90%] max-w-6xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Alterar Compra</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Itens</th>
              <th className="px-6 py-4 text-left">Data Compra</th>
              <th className="px-6 py-4 text-left">Data Invoice</th>
              <th className="px-6 py-4 text-left">Data Recebimento</th>
              <th className="px-6 py-4 text-left">Preço</th>
              <th className="px-6 py-4 text-left">Fornecedor ID</th>
              <th className="px-6 py-4 text-left">Fornecedor</th>
              <th className="px-6 py-4 text-left">Projeto ID</th>
              <th className="px-6 py-4 text-left">Projeto</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {compras.map((compra) => (
              <tr key={compra.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-t">{compra.id}</td>
                <td className="px-6 py-4 border-t">
                  {Array.isArray(compra.item)
                    ? compra.item.map(i => i.nome).join(', ')
                    : compra.item?.nome}
                </td>
                <td className="px-6 py-4 border-t">{formataData(compra.dataCompra)}</td>
                <td className="px-6 py-4 border-t">{formataData(compra.dataInvoice)}</td>
                <td className="px-6 py-4 border-t">{formataData(compra.dataRecebimento)}</td>
                <td className="px-6 py-4 border-t">R$ {compra.preco?.toFixed(2)}</td>
                <td className="px-6 py-4 border-t">{compra.fornecedor?.id || ''}</td>
                <td className="px-6 py-4 border-t">{compra.fornecedor?.nome || ''}</td>
                <td className="px-6 py-4 border-t">{compra.projeto?.id || ''}</td>
                <td className="px-6 py-4 border-t">{compra.projeto?.nome || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        id="formCompra"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full space-y-4 mx-auto mt-16"
      >
        <h3 className="text-xl font-semibold mb-4 text-center text-black">Compra</h3>

        {[
          { label: 'ID Compra', name: 'compraId', type: 'number' },
          { label: 'IDs dos Itens (separados por vírgulas)', name: 'item_id', type: 'text' },
          { label: 'ID Fornecedor', name: 'fornecedor_id', type: 'number' },
          { label: 'ID Projeto', name: 'projeto_id', type: 'number' },
          { label: 'Preço', name: 'preco', type: 'number' },
          { label: 'Data da compra', name: 'dataCompra', type: 'date' },
          { label: 'Data Invoice', name: 'dataInvoice', type: 'date' },
          { label: 'Data de recebimento', name: 'dataRecebimento', type: 'date' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {label}:
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
);
};

export default AlterarCompra;
