import { Link } from 'react-router-dom';  
import '../styles.css'; 

function Sidebar() {
  return (
    <div className="flex  h-screen">
      <div className="w-50  border-r border-gray-200 shadow-lg p-6">
        <ul>
          <li className="mb-6">
            <Link to="/upload" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="material-icons mr-4">arrow_upward</span>
              Upload
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/cadastrar" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="material-icons mr-4">subdirectory_arrow_right</span>
              Cadastrar
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/consultar" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="material-icons mr-4">search</span>
              Consultar
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/alterar" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="material-icons mr-4">refresh</span>
              Alterar
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/deletar" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="material-icons mr-4">close</span>
              Deletar
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/logs" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="material-icons mr-4">sort</span>
              Logs
            </Link>
          </li>
        </ul>

        
      </div>
    </div>
  );
};

export default Sidebar;
