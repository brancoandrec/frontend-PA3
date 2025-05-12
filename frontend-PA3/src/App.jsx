import { Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './Cadastro';
import Consulta from './Consulta';
import Deletar from './Deletar';
import Alterar from './Alterar';
import CadastroCompra from './CadastroCompra';
import CadastroItens from './CadastroItens';
import CadastroFornecedor from './CadastroFornecedor';
import CadastroLocal from './CadastroLocal';
import CadastroProjeto from './CadastroProjeto';
import CadastroConjuntoItens from './CadastroConjuntoItens';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cadastro" replace />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/consulta" element={<Consulta />} />
      <Route path="/deletar" element={<Deletar/>} />
      <Route path="/alterar" element={<Alterar/>} />
      <Route path="/cadastroCompra" element={<CadastroCompra/>} />
      <Route path="/cadastroItens" element={<CadastroItens/>} />
      <Route path="/cadastroFornecedor" element={<CadastroFornecedor/>} />
      <Route path="/cadastroLocal" element={<CadastroLocal/>} />
      <Route path="/cadastroProjeto" element={<CadastroProjeto/>} />
      <Route path="/cadastroConjuntoItens" element={<CadastroConjuntoItens/>} />
    </Routes>
  );
}

export default App;