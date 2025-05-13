import React, { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

export default function AlterarConjuntoItens() {
  const [conjuntos, setConjuntos] = useState([]);
  const [formData, setFormData] = useState({
    conjuntoItensId: '',
    quantidade: '',
    item: '',
    local: '',
    projeto: ''
  });

  useEffect(() => {
    carregarConjuntoItens();
  }, []);

  const carregarConjuntoItens = async () => {
    try {
      const response = await fetch('http://localhost:8080/conjuntoitens/buscar');
      const data = await response.json();
      setConjuntos(data);
    } catch (error) {
      console.error('Erro ao carregar os itens:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      id: formData.conjuntoItensId,
      quantidade: formData.quantidade,
      item: { id: formData.item },
      localArmazen: { id: formData.local },
      projeto: { id: formData.projeto }
    };

    try {
      const response = await fetch('http://localhost:8080/conjuntoitens/alterar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      const data = await response.json();
      console.log('Atualizado com sucesso:', data);
      carregarConjuntoItens();
    } catch (error) {
      console.error('Erro na atualização:', error);
    }
  };

  return (
    <div className="tudo">
      <div className="div-container gradient-background">
        <Sidebar />
        <div className="container">
          <h1>Alterar Conjunto Itens</h1>

          <table className="table" id="tabelaConjuntoItens">
            <thead>
              <tr>
                <th>ID</th>
                <th>Quantidade</th>
                <th>Item ID</th>
                <th>Item</th>
                <th>Local ID</th>
                <th>Sala</th>
                <th>Armario</th>
                <th>Projeto ID</th>
                <th>Projeto</th>
              </tr>
            </thead>
            <tbody>
              {conjuntos.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.quantidade}</td>
                  <td>{c.item.id}</td>
                  <td>{c.item.nome}</td>
                  <td>{c.localArmazen.id}</td>
                  <td>{c.localArmazen.sala}</td>
                  <td>{c.localArmazen.sala}</td>
                  <td>{c.projeto.id}</td>
                  <td>{c.projeto.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <label htmlFor="conjuntoItensId">ID do Conjunto Itens para alterar:</label>
          <input
            type="number"
            id="conjuntoItensId"
            name="conjuntoItensId"
            value={formData.conjuntoItensId}
            onChange={handleInputChange}
            required
          />
          <button type="button" onClick={handleSubmit}>Alterar</button>

          <form id="formConjuntoItens" onSubmit={handleSubmit}>
            <h3>ConjuntoItens</h3>
            <label htmlFor="quantidade">Quantidade:</label>
            <input
              id="quantidade"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleInputChange}
              required
            /><br /><br />

            <label htmlFor="item">ID item:</label>
            <input
              id="item"
              name="item"
              value={formData.item}
              onChange={handleInputChange}
              required
            /><br /><br />

            <label htmlFor="local">ID local:</label>
            <input
              id="local"
              name="local"
              value={formData.local}
              onChange={handleInputChange}
              required
            /><br /><br />

            <label htmlFor="projeto">ID projeto:</label>
            <input
              id="projeto"
              name="projeto"
              value={formData.projeto}
              onChange={handleInputChange}
              required
            /><br /><br />

            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
