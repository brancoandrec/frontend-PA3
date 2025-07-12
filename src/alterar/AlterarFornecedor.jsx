import React, { useEffect, useState } from "react";
import "../styles.css";
import Sidebar from "../sidebar/Sidebar";

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
  <div className="div-container gradient-background min-h-screen flex">
    <Sidebar />

    <div className="container mx-auto w-[90%] max-w-6xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">
        Alterar Fornecedor
      </h1>

      {/* Tabela de Fornecedores */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Nome</th>
              <th className="px-6 py-4 text-left">Contato</th>
              <th className="px-6 py-4 text-left">Endereço</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-t">{fornecedor.id}</td>
                <td className="px-6 py-4 border-t">{fornecedor.nome}</td>
                <td className="px-6 py-4 border-t">{fornecedor.contato}</td>
                <td className="px-6 py-4 border-t">{fornecedor.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulário de busca */}
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-4 text-center text-black">
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
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

      {/* Formulário principal */}
      <form
        id="formFornecedor"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl w-full mx-auto mt-10 mb-16"
      >
        <h3 className="text-xl font-semibold mb-4 text-center text-black">
          Fornecedor
        </h3>

        {[
          { label: 'Nome', name: 'nome' },
          { label: 'Contato', name: 'contato' },
          { label: 'Endereço', name: 'endereco' },
        ].map(({ label, name }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}:
            </label>
            <input
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

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
);
};