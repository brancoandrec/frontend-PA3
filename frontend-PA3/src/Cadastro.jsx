import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import logo from './assets/logo.png';
import './styles.css'

function Cadastro() {

  return (
    <>
      <div className="div-container gradient-background">
      <Sidebar />
      <div className="container">
      <div className="main-content grid-container">
        <Link to="cadastroCompra.html" className="item cadastro">Cadastrar Compra</Link>
        <Link to="cadastroItens.html" className="item cadastro">Cadastrar Itens</Link>
        <Link to="cadastroFornecedor.html" className="item cadastro">Cadastrar Fornecedor</Link>
        <Link to="cadastroProjeto.html" className="item cadastro">Cadastrar Projeto</Link>
        <Link to="cadastroLocal.html" className="item cadastro">Cadastrar Local</Link>
        <Link to="cadastroConjuntoItens.html" className="item cadastro">Cadastrar Conjunto Itens</Link>
      </div>
      </div>
    </div>
    </>
  )
}

export default Cadastro
