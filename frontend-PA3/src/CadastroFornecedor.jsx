import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import './styles.css'; 

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
    <div className="div-container gradient-background">
      <Sidebar />
      <div className="container mt-5">
        <br /><br />
        <h1>Cadastro de Fornecedor</h1>
        <br /><br />

        <form onSubmit={handleSubmit}>
          <h3>Fornecedor</h3>

          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <br /><br />

          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            required
            value={formData.endereco}
            onChange={handleChange}
          />
          <br /><br />

          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            required
            value={formData.telefone}
            onChange={handleChange}
          />
          <br /><br />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroFornecedor;
