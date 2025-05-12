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
    <div className="div-container gradient-background">
      <Sidebar />
      <div className="container mt-5">
        <h1>Cadastro de Itens</h1>
        <form onSubmit={handleSubmit}>
          <h3>Item</h3>
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          />
          <br /><br />

          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br /><br />

          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
          <br /><br />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroItens;
