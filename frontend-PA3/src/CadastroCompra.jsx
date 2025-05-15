import { useState } from "react";
import Sidebar from './Sidebar'; 
import './styles.css';

function CadastroCompra() {
  const [formData, setFormData] = useState({
    fornecedor_id: '',
    projeto_id: '',
    item_id: '',
    preco: '',
    dataCompra: '',
    dataInvoice: '',
    dataRecebimento: ''
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

    const itemIds = formData.item_id
      .split(',')
      .map(id => ({ id: parseInt(id.trim()) }));

    const compra = {
      dataCompra: formData.dataCompra,
      dataInvoice: formData.dataInvoice,
      dataRecebimento: formData.dataRecebimento,
      preco: formData.preco,
      projeto: { id: parseInt(formData.projeto_id) },
      fornecedor: { id: parseInt(formData.fornecedor_id) },
      item: itemIds
    };

    try {
      const res = await fetch('http://localhost:8080/compra/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compra)
      });
      const data = await res.json();
      console.log("Sucesso:", data);
      setFormData({
        fornecedor_id: '',
        projeto_id: '',
        item_id: '',
        preco: '',
        dataCompra: '',
        dataInvoice: '',
        dataRecebimento: ''
      });
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  return (
  <div className="div-container gradient-background min-h-screen flex">
  <Sidebar />
  <div className="flex-1 flex justify-center items-start mt-20">
    <div className="w-1/2">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Cadastro de Compra</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Fornecedor:</label>
            <input
              name="fornecedor_id"
              value={formData.fornecedor_id}
              onChange={handleChange}
              type="number"
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Projeto:</label>
            <input
              name="projeto_id"
              value={formData.projeto_id}
              onChange={handleChange}
              type="number"
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IDs dos Itens (separados por vírgulas):</label>
            <input
              name="item_id"
              value={formData.item_id}
              onChange={handleChange}
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço:</label>
            <input
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              type="number"
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data da Compra:</label>
            <input
              name="dataCompra"
              value={formData.dataCompra}
              onChange={handleChange}
              type="date"
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Invoice:</label>
            <input
              name="dataInvoice"
              value={formData.dataInvoice}
              onChange={handleChange}
              type="date"
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Recebimento:</label>
            <input
              name="dataRecebimento"
              value={formData.dataRecebimento}
              onChange={handleChange}
              type="date"
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

export default CadastroCompra;
