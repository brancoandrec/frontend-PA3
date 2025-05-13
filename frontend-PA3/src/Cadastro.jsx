import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './styles.css'

function Cadastro() {

  return (
    <>
      <div className="div-container gradient-background">
      <Sidebar />
      <div className="container">
      <div className="main-content grid-container">
        <Link to="/cadastroCompra" className="item cadastro">Cadastrar Compra</Link>
        <Link to="/cadastroItens" className="item cadastro">Cadastrar Itens</Link>
        <Link to="/cadastroFornecedor" className="item cadastro">Cadastrar Fornecedor</Link>
        <Link to="/cadastroProjeto" className="item cadastro">Cadastrar Projeto</Link>
        <Link to="/cadastroLocal" className="item cadastro">Cadastrar Local</Link>
        <Link to="/cadastroConjuntoItens" className="item cadastro">Cadastrar Conjunto Itens</Link>
      </div>
      </div>
    </div>
    </>
  )
}

export default Cadastro
