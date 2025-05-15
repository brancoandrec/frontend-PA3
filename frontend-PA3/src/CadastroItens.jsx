import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import './styles.css'; 

function CadastroItens() {
  const [formData, setFormData] = useState({
    tipo: '',
    name: '',
    descricao: ''
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

    const item = {
      nome: formData.name,
      descricao: formData.descricao,
      tipo: formData.tipo
    };

    try {
      const res = await fetch('http://localhost:8080/item/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item) 
      });

      const data = await res.json();
      console.log('Sucesso:', data);
      setFormData({
        tipo: '',
        name: '',
        descricao: ''
      }); 
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  return (
    <>
  <div className="div-container gradient-background min-h-screen flex">
  <Sidebar />
  <div className="flex-1 flex justify-center items-start mt-20">
    <div className="w-1/2">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Cadastro de Itens</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
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
</>
);

}

export default CadastroItens;
