import React, { useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

function CadastroLocal() {
  const [formData, setFormData] = useState({
    sala: '',
    armario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const localArmazen = {
      sala: formData.sala,
      armario: formData.armario
    };

    try {
      const response = await fetch('http://localhost:8080/localarmazen/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(localArmazen)
      });

      const data = await response.json();
      console.log('Sucesso:', data);
      setFormData({ sala: '', armario: '' });
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
   <div className="div-container gradient-background min-h-screen flex">
  <Sidebar />
  <div className="flex-1 flex justify-center items-start mt-20">
    <div className="w-1/2">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Cadastro de Local</h1>
      <form
  id="formCompra"
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-3xl mx-auto w-full"
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

  );
}

export default CadastroLocal;
