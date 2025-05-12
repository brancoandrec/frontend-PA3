import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import './styles.css'

function Alterar() {

  return (
    <>

  <div className="div-container gradient-background">
    <Sidebar />
      <div className="container">
      <div className="main-content grid-container">
        <Link to="/alterarCompra" className="item alterar">Alterar Compra</Link>
        <Link to="/alterarItens" className="item alterar">Alterar Itens</Link>
        <Link to="/alterarFornecedor" className="item alterar">Alterar Fornecedor</Link>
        <Link to="/alterarProjeto" className="item alterar">Alterar Projeto</Link>
        <Link to="/alterarLocal" className="item alterar">Alterar Local</Link>
        <Link to="/alterarConjuntoItens" className="item alterar">Alterar Conjunto Itens</Link>
    </div>
      </div>
      
      </div>
      </>
      )
}
export default Alterar