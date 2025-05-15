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
import ConsultaCompra from './ConsultaCompra';
import ConsultaConjuntoItens from './ConsultaConjuntoItens';
import ConsultaFornecedor from './ConsultaFornecedor';
import ConsultaItens from './ConsultaItens';
import ConsultaLocal from './ConsultaLocal';
import ConsultaProjeto from './ConsultaProjeto';
import AlterarCompra from './AlterarCompra';
import AlterarConjuntoItens from './AlterarConjuntoItens';
import AlterarFornecedor from './AlterarFornecedor';
import AlterarItens from './AlterarItens';
import AlterarLocal from './AlterarLocal';
import AlterarProjeto from './AlterarProjeto';
import DeletarCompra from './DeletarCompra';
import DeletarConjuntoItens from './DeletarConjuntoItens';
import DeletarFornecedor from './DeletarFornecedor';
import DeletarItens from './DeletarItens';
import DeletarLocal from './DeletarLocal';
import DeletarProjeto from './DeletarProjeto';
import Logs from './Logs';

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
      <Route path="/consultaCompra" element={<ConsultaCompra/>} />
      <Route path="/consultaConjuntoItens" element={<ConsultaConjuntoItens/>} />
      <Route path="/consultaFornecedor" element={<ConsultaFornecedor/>} />
      <Route path="/consultaItens" element={<ConsultaItens/>} />
      <Route path="/consultaLocal" element={<ConsultaLocal/>} />
      <Route path="/consultaProjeto" element={<ConsultaProjeto/>} />
      <Route path="/alterarCompra" element={<AlterarCompra/>} />
      <Route path="/alterarConjuntoItens" element={<AlterarConjuntoItens/>} />
      <Route path="/alterarFornecedor" element={<AlterarFornecedor/>} />
      <Route path="/alterarItens" element={<AlterarItens/>} />
      <Route path="/alterarLocal" element={<AlterarLocal/>} />
      <Route path="/alterarProjeto" element={<AlterarProjeto/>} />
      <Route path="/deletarCompra" element={<DeletarCompra/>} />
      <Route path="/deletarConjuntoItens" element={<DeletarConjuntoItens/>} />
      <Route path="/deletarFornecedor" element={<DeletarFornecedor/>} />
      <Route path="/deletarItens" element={<DeletarItens/>} />
      <Route path="/deletarLocal" element={<DeletarLocal/>} />
      <Route path="/deletarProjeto" element={<DeletarProjeto/>} />
      <Route path="/logs" element={<Logs/>} />
    </Routes>
  );
}

export default App;