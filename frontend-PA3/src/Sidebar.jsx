import { Link } from 'react-router-dom';  
import logo from './assets/logo.png'; 
import './styles.css'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <img className="logo-isi-menu" src={logo} alt="Logo Instituto Senai de Inovação" />
        </li>
        <li><Link to="/cadastro">Cadastrar</Link></li>
        <li><Link to="/consulta">Consultar</Link></li>
        <li><Link to="/alterar">Alterar</Link></li>
        <li><Link to="/deletar">Deletar</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
