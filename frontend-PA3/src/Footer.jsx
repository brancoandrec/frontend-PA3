import logosesi from './assets/logo-sesi.webp';
import logosenai from './assets/logo-senai.webp';
import './styles.css';

function Footer() {
  return (
   <footer className="footer bg-gray-900 text-white py-6">
  <div className="footer-content flex flex-col items-center space-y-4">

    {/* Logos lado a lado */}
    <div className="flex space-x-4">
      <img className="h-10" src={logosesi} alt="Logo Sesi" />
      <img className="h-10" src={logosenai} alt="Logo Senai" />
    </div>

    {/* Texto central */}
    <p className="text-sm text-center">
      Copyright ©2025 SENAI - Todos os direitos reservados
    </p>

    {/* Links abaixo */}
    <div className="flex space-x-4 text-sm">
      <a href="#" className="hover:underline">Política de Privacidade</a>
      <a href="#" className="hover:underline">Termos de Uso</a>
    </div>

  </div>
</footer>


  );
}

export default Footer;
