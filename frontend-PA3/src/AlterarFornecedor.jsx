import React, { useEffect, useState } from "react";
import "./styles.css";
import Sidebar from "./Sidebar";

export default function AlterarFornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorId, setFornecedorId] = useState("");
  const [formData, setFormData] = useState({ nome: "", contato: "", endereco: "" });

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
        setFormData({ nome: data.nome, contato: data.contato, endereco: data.endereco });
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
      <div className="container">
        <br /><br />
        <h1>Alterar Fornecedor</h1>
        <br /><br />

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

        <label htmlFor="fornecedorId">ID do fornecedor para alterar: </label>
        <input
          type="number"
          id="fornecedorId"
          value={fornecedorId}
          onChange={(e) => setFornecedorId(e.target.value)}
          required
        />
        <button onClick={buscarFornecedorPorId} id="alterarBtn">
          Alterar
        </button>

        <br /><br />

        <form id="formFornecedor" onSubmit={handleSubmit}>
          <h3>Fornecedor</h3>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <br /><br />

          <label htmlFor="contato">Contato:</label>
          <input
            id="contato"
            name="contato"
            value={formData.contato}
            onChange={handleChange}
            required
          />
          <br /><br />

          <label htmlFor="endereco">Endereço:</label>
          <input
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
          <br /><br />

          <button type="submit" id="enviarBtn">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
