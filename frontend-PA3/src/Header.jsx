import React from 'react';
import logoisi from './assets/logo.png'; 
import logosenai from './assets/logo-senai.webp';
import './styles.css';

const Header = () => {
  return (
    <header className="site-header">
        <div className='header-left'>
            <img className="logo-senai-menu" src={logosenai} alt="Logo Senai" />
        </div>
        <div className='header-center'>
            <img className="logo-isi-menu" src={logoisi} alt="Logo Instituto Senai de Inovação" />
        </div>
        <div className='header-right'>

        </div>
    </header>
  );
};

export default Header;
