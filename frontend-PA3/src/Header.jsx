import React from 'react';
import logoisi from './assets/logo.png'; 
import iconuser from './assets/icon-user.png';
import iconexit from './assets/icon-exit.png';
import './styles.css';

const Header = () => {
  return (
    <header className="site-header flex justify-between items-center w-full px-6">
      <div className="logo-isi-menu">
        <img src={logoisi} alt="Logo Instituto Senai de Inovação" className='h-20'/>
      </div>
      <div className="header-right flex items-center space-x-3">
        <div className="text-sm">
          <p className="text-white font-medium">Bem-vindo, Usuário</p>
          <div className="flex items-center space-x-1 justify-end">
            <button className="text-blue-500 hover:underline">Sair</button>
            <img src={iconexit} alt="Sair" className="w-4 h-4" />
          </div>
        </div>
        <img src={iconuser} alt="Avatar" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  );
};

export default Header;

