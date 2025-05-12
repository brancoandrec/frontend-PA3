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
    <div className="div-container gradient-background">
      <Sidebar />
      <div className="container mt-5">
        <br /><br />
        <h1>Cadastro de Local</h1>
        <br /><br />
        <form onSubmit={handleSubmit}>
          <h3>Local</h3>
          <label htmlFor="sala">Sala:</label>
          <input
            type="text"
            id="sala"
            name="sala"
            required
            value={formData.sala}
            onChange={handleChange}
          />
          <br /><br />
          <label htmlFor="armario">Armário:</label>
          <input
            type="text"
            id="armario"
            name="armario"
            required
            value={formData.armario}
            onChange={handleChange}
          />
          <br /><br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroLocal;
