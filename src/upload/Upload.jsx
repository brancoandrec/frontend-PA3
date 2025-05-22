import { useState } from "react";
import Sidebar from '../sidebar/Sidebar'; 
import '../styles.css';

function Upload() {
  const [formData, setFormData] = useState({
    quantidade: '',
    nome: '',
    preco: '',
    dataCompra: '',
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
      const response = await fetch("http://127.0.0.1:5000/upload", {
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
      quantidade: formData.quantidade,
      nome: formData.nome
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
       quantidade: '',
       nome: '',
       preco: '',
       dataCompra: '',
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
    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
      Nome:
    </label>
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
    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
      Descrição:
    </label>
    <input
      type="number"
      id="descricao"
      name="descricao"
      value={formData.descricao}
      onChange={handleChange}
      className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-1">
      Quantidade:
    </label>
    <input
      type="number"
      id="quantidade"
      name="quantidade"
      value={formData.quantidade}
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

export default Upload;