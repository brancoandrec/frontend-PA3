import React, { useState, useEffect } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

function CadastrarLocal() {
  const [formData, setFormData] = useState({
    sala: '',
    armario: ''
  });
  const [locais, setLocais] = useState([]);

  // Carregar locais existentes ao montar o componente
  useEffect(() => {
    fetch('http://127.0.0.1:8080/localarmazen/buscar')
      .then((res) => res.json())
      .then((data) => setLocais(data))
      .catch((err) => console.error('Erro ao buscar locais:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se já existe local com a mesma sala e armario
    const existeLocal = locais.some(
      local =>
        local.sala.toLowerCase() === formData.sala.trim().toLowerCase() &&
        local.armario.toLowerCase() === formData.armario.trim().toLowerCase()
    );

    if (existeLocal) {
      alert('Já existe um local com essa sala e armário cadastrados.');
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/localarmazen/add", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Dados enviados:', result);
        alert('Local cadastrado com sucesso');
        setFormData({ sala: '', armario: '' });

        // Atualiza a lista locais com o novo cadastro
        setLocais(prevLocais => [...prevLocais, result]);
      } else {
        alert('Erro ao cadastrar local.');
      }
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex justify-center items-start mt-20">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Cadastro de Local de Armazenamento</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg space-y-4"
          >
            <div>
              <label htmlFor="sala" className="block text-sm font-medium text-gray-700 mb-1">
                Sala:
              </label>
              <input
                type="text"
                id="sala"
                name="sala"
                value={formData.sala}
                onChange={handleChange}
                required
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="armario" className="block text-sm font-medium text-gray-700 mb-1">
                Armário:
              </label>
              <input
                type="text"
                id="armario"
                name="armario"
                value={formData.armario}
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

export default CadastrarLocal;
