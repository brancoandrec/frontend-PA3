import { Routes, Route, Navigate } from 'react-router-dom';
import Cadastrar from './cadastrar/Cadastrar';
import Consultar from './consultar/Consultar';
import Deletar from './deletar/Deletar';
import Alterar from './alterar/Alterar';
import CadastrarCompra from './cadastrar/CadastrarCompra';
import CadastrarItens from './cadastrar/CadastrarItens';
import CadastrarFornecedor from './cadastrar/CadastrarFornecedor';
import CadastrarLocal from './cadastrar/CadastrarLocal';
import CadastrarProjeto from './cadastrar/CadastrarProjeto';
import CadastrarConjuntoItens from './cadastrar/CadastrarConjuntoItens';
import ConsultarCompra from './consultar/ConsultarCompra';
import ConsultarConjuntoItens from './consultar/ConsultarConjuntoItens';
import ConsultarFornecedor from './consultar/ConsultarFornecedor';
import ConsultarItens from './consultar/ConsultarItens';
import ConsultarLocal from './consultar/ConsultarLocal';
import ConsultarProjeto from './consultar/ConsultarProjeto';
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
import Upload from './upload/Upload';
import Logs from './Logs';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cadastro" replace />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/consultar" element={<Consultar />} />
      <Route path="/deletar" element={<Deletar/>} />
      <Route path="/alterar" element={<Alterar/>} />
      <Route path="/cadastrarCompra" element={<CadastrarCompra/>} />
      <Route path="/cadastrarItens" element={<CadastrarItens/>} />
      <Route path="/cadastrarFornecedor" element={<CadastrarFornecedor/>} />
      <Route path="/cadastrarLocal" element={<CadastrarLocal/>} />
      <Route path="/cadastrarProjeto" element={<CadastrarProjeto/>} />
      <Route path="/cadastrarConjuntoItens" element={<CadastrarConjuntoItens/>} />
      <Route path="/consultarCompra" element={<ConsultarCompra/>} />
      <Route path="/consultarConjuntoItens" element={<ConsultarConjuntoItens/>} />
      <Route path="/consultarFornecedor" element={<ConsultarFornecedor/>} />
      <Route path="/consultarItens" element={<ConsultarItens/>} />
      <Route path="/consultarLocal" element={<ConsultarLocal/>} />
      <Route path="/consultarProjeto" element={<ConsultarProjeto/>} />
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
      <Route path="/upload" element={<Upload/>} />
      <Route path="/logs" element={<Logs/>} />
    </Routes>
  );
}

export default App;