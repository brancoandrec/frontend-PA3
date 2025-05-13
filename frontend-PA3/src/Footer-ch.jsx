import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1b2635] text-white px-4 py-8 text-sm">
      <div className="flex flex-col md:flex-row justify-center gap-16 mb-6">
        {/* SESI */}
        <div className="text-center">
          <img
          src="https://ava.sesisenai.org.br/pix/social-medias/sesi-branca.webp"
          alt="SESI"
         className="h-10 mx-auto mb-2"
        />
          <div className="flex justify-center gap-4 text-xl">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-x-twitter"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>

        {/* SENAI */}
        <div className="text-center">
          <img src="https://ava.sesisenai.org.br/pix/social-medias/senai-branca.webp" alt="Imagem do SENAI" />
          <div className="flex justify-center gap-4 text-xl">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-x-twitter"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>

      <hr className="border-t border-white/30 my-4" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <span>Copyright ©2025 SENAI - Todos os direitos reservados</span>
        <span>Redefinir a demonstração nessa página</span>
        <div className="flex items-center gap-3 font-semibold">
          <a href="#">Central de Ajuda</a>
          <span className="text-white/50">•</span>
          <a href="#">Contato</a>
          <span className="text-white/50">•</span>
          <a href="#">Política de privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
