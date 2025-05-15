import { useEffect, useState } from 'react';
import './styles.css';
import Sidebar from './Sidebar';

const ConsultaFornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/fornecedor/buscar')
      .then(response => response.json())
      .then(data => setFornecedores(data))
      .catch(error => console.error('Erro ao carregar os itens:', error));
  }, []);

  return (
    <div className="div-container gradient-background">
      <Sidebar />

      <div className="container">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Consulta de Fornecedor</h1>
        <table id="tabelaFornecedor" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Contato</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor, index) => (
              <tr key={index}>
                <td>{fornecedor.id}</td>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.contato}</td>
                <td>{fornecedor.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultaFornecedor;
