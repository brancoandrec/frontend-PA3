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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Selecione um arquivo primeiro.");
      return;
    }

    const formDataFile = new FormData();
    formDataFile.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formDataFile
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Arquivo enviado com sucesso:", result);
        alert("Arquivo enviado com sucesso!");
      } else {
        alert("Erro ao enviar arquivo.");
      }
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
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
          <div className="flex justify-center w-full mb-6">
  <div className="bg-white p-4 rounded-xl shadow text-center">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Selecionar arquivo:
    </label>
    <input
      type="file"
      onChange={handleFileChange}
      className="mb-4 mx-auto block"
    />
    <button
      onClick={handleFileUpload}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
    >
      Enviar Arquivo
    </button>
  </div>
</div>
          <form
            id="formCompra"
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-4">Compra</h3>

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

export default CadastroCompra;
