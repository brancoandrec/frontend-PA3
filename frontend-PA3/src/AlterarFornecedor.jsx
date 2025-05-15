import React, { useEffect, useState } from "react";
import "./styles.css";
import Sidebar from "./Sidebar";

export default function AlterarFornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorId, setFornecedorId] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    contato: "",
    endereco: "",
  });

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = () => {
    fetch("http://localhost:8080/fornecedor/buscar")
      .then((res) => res.json())
      .then(setFornecedores)
      .catch((err) => console.error("Erro ao carregar os fornecedores:", err));
  };

  const buscarFornecedorPorId = () => {
    fetch(`http://localhost:8080/fornecedor/buscarporid/${fornecedorId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          nome: data.nome,
          contato: data.contato,
          endereco: data.endereco,
        });
      })
      .catch((err) => console.error("Erro ao buscar fornecedor:", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dados = {
      id: fornecedorId,
      ...formData,
    };
    fetch(`http://localhost:8080/fornecedor/alterar/${fornecedorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })
      .then((res) => res.json())
      .then(() => {
        carregarFornecedores();
        console.log("Fornecedor atualizado com sucesso.");
      })
      .catch((err) => console.error("Erro na atualização:", err));
  };

  return (
    <div className="tudo div-container gradient-background">
  <Sidebar />
  <div className="flex-1 flex justify-center items-start mt-20">
    <div className="w-3/4">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        Alterar Fornecedor
      </h1>

      <table className="table" id="tabelaFornecedor">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.id}</td>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.contato}</td>
              <td>{fornecedor.endereco}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto my-10">
        <h3 className="text-xl font-semibold mb-4">
          Buscar Fornecedor para Alteração
        </h3>

        <div>
          <label
            htmlFor="fornecedorId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ID do fornecedor para alterar:
          </label>
          <input
            type="number"
            id="fornecedorId"
            value={fornecedorId}
            onChange={(e) => setFornecedorId(e.target.value)}
            required
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={buscarFornecedorPorId}
          id="alterarBtn"
          className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Alterar
        </button>
      </div>

      <form
        id="formFornecedor"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto mb-8"
      >
        <h3 className="text-xl font-semibold mb-4">Fornecedor</h3>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome:
          </label>
          <input
            id="name"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="contato"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contato:
          </label>
          <input
            id="contato"
            name="contato"
            value={formData.contato}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="endereco"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Endereço:
          </label>
          <input
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          id="enviarBtn"
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
