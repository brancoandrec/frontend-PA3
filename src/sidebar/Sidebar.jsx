import { Link, useLocation } from 'react-router-dom';
import '../styles.css';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/upload', label: 'Upload', icon: 'arrow_upward'},
    { path: '/cadastrar', label: 'Cadastrar', icon: 'subdirectory_arrow_right' },
    { path: '/consultar', label: 'Consultar', icon: 'search' },
    { path: '/alterar', label: 'Alterar', icon: 'refresh' },
    { path: '/deletar', label: 'Deletar', icon: 'close' },
    { path: '/logs', label: 'Logs', icon: 'sort' },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-50 border-r border-gray-200 shadow-lg p-6">
        <ul>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-gray-300 text-blue-700 font-semibold' : 'text-gray-700'
                  } hover:text-blue-500 hover:bg-gray-200`}
                >
                  <span className={`material-icons mr-4 ${isActive ? 'text-blue-700' : ''}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}


export default Sidebar;