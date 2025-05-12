import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import './styles.css'

function Consulta() {

  return (
    <>

  <div class="div-container gradient-background">
    <Sidebar />
      <div class="container">
      <div class="main-content grid-container">
        <Link to="/consultaCompra" class="item consulta">Consultar Compra</Link>
        <Link to="/consultaItens" class="item consulta">Consultar Itens</Link>
        <Link to="/consultaFornecedor" class="item consulta">Consultar Fornecedor</Link>
        <Link to="/consultaProjeto" class="item consulta">Consultar Projeto</Link>
        <Link to="/consultaLocal" class="item consulta">Consultar Local</Link>
        <Link to="/consultaConjuntoItens" class="item consulta">Consultar Conjunto Itens</Link>
    </div>
      </div>
      
      </div>
      </>
      )
}
export default Consulta