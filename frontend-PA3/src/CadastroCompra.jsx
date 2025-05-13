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
    <div className="div-container gradient-background">
      <Sidebar />
    <div className="container mt-5">
      <h1>Cadastro de Compra</h1>
      <form onSubmit={handleSubmit}>
        <label>ID Fornecedor:</label>
        <input name="fornecedor_id" value={formData.fornecedor_id} onChange={handleChange} type="number" required />
        <br /><br />

        <label>ID Projeto:</label>
        <input name="projeto_id" value={formData.projeto_id} onChange={handleChange} type="number" required />
        <br /><br />

        <label>IDs dos Itens (separados por vírgulas):</label>
        <input name="item_id" value={formData.item_id} onChange={handleChange} required />
        <br /><br />

        <label>Preço:</label>
        <input name="preco" value={formData.preco} onChange={handleChange} type="number" required />
        <br /><br />

        <label>Data da compra:</label>
        <input name="dataCompra" value={formData.dataCompra} onChange={handleChange} type="date" required />
        <br /><br />

        <label>Data Invoice:</label>
        <input name="dataInvoice" value={formData.dataInvoice} onChange={handleChange} type="date" required />
        <br /><br />

        <label>Data de recebimento:</label>
        <input name="dataRecebimento" value={formData.dataRecebimento} onChange={handleChange} type="date" required />
        <br /><br />

        <button type="submit">Enviar</button>
      </form>
    </div>
    </div>
  );
}

export default CadastroCompra;
