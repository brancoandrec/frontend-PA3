import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar'; 
import '../styles.css'; 

function CadastroFornecedor() {
  const [formData, setFormData] = useState({
    name: '',
    endereco: '',
    telefone: ''
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

    const fornecedor = {
      nome: formData.name,
      endereco: formData.endereco,
      contato: formData.telefone
    };

    try {
      const response = await fetch('http://localhost:8080/fornecedor/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fornecedor)
      });

      const data = await response.json();
      console.log('Sucesso:', data);
      setFormData({ name: '', endereco: '', telefone: '' });
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
  <Sidebar />
  <div className="flex-1 flex justify-center items-start mt-20">
    <div className="w-1/2">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Cadastro de Fornecedor</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            required
            value={formData.endereco}
            onChange={handleChange}
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            required
            value={formData.telefone}
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

  );
}

export default CadastroFornecedor;
