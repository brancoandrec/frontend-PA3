import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import './styles.css'

function Deletar() {

  return (
    <>

  <div className="div-container gradient-background">
    <Sidebar />
      <div className="container">
      <div className="main-content grid-container">
        <Link to="/deletarCompra" className="item deletar">Deletar Compra</Link>
        <Link to="/deletarItens" className="item deletar">Deletar Itens</Link>
        <Link to="/deletarFornecedor" className="item deletar">Deletar Fornecedor</Link>
        <Link to="/deletarProjeto" className="item deletar">Deletar Projeto</Link>
        <Link to="/deletarLocal" className="item deletar">Deletar Local</Link>
        <Link to="/deletarConjuntoItens" className="item deletar">Deletar Conjunto Itens</Link>
    </div>
      </div>
      
      </div>
      </>
      )
}
export default Deletar