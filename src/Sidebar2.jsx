import { Link } from 'react-router-dom';  
import './styles.css'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/cadastro">Cadastrar</Link></li>
        <li><Link to="/consulta">Consultar</Link></li>
        <li><Link to="/alterar">Alterar</Link></li>
        <li><Link to="/deletar">Deletar</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
