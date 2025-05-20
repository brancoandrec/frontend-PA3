import { Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './cadastro/Cadastro';
import Consulta from './consulta/Consulta';
import Deletar from './deletar/Deletar';
import Alterar from './alterar/Alterar';
import CadastroCompra from './cadastro/CadastroCompra';
import CadastroItens from './cadastro/CadastroItens';
import CadastroFornecedor from './cadastro/CadastroFornecedor';
import CadastroLocal from './cadastro/CadastroLocal';
import CadastroProjeto from './cadastro/CadastroProjeto';
import CadastroConjuntoItens from './cadastro/CadastroConjuntoItens';
import ConsultaCompra from './consulta/ConsultaCompra';
import ConsultaConjuntoItens from './consulta/ConsultaConjuntoItens';
import ConsultaFornecedor from './consulta/ConsultaFornecedor';
import ConsultaItens from './consulta/ConsultaItens';
import ConsultaLocal from './consulta/ConsultaLocal';
import ConsultaProjeto from './consulta/ConsultaProjeto';
import AlterarCompra from './alterar/AlterarCompra';
import AlterarConjuntoItens from './alterar/AlterarConjuntoItens';
import AlterarFornecedor from './alterar/AlterarFornecedor';
import AlterarItens from './alterar/AlterarItens';
import AlterarLocal from './alterar/AlterarLocal';
import AlterarProjeto from './alterar/AlterarProjeto';
import DeletarCompra from './deletar/DeletarCompra';
import DeletarConjuntoItens from './deletar/DeletarConjuntoItens';
import DeletarFornecedor from './deletar/DeletarFornecedor';
import DeletarItens from './deletar/DeletarItens';
import DeletarLocal from './deletar/DeletarLocal';
import DeletarProjeto from './deletar/DeletarProjeto';
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