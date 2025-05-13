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
      <Route path="/ConsultaCompra" element={<ConsultaCompra/>} />
      <Route path="/ConsultaConjuntoItens" element={<ConsultaConjuntoItens/>} />
      <Route path="/ConsultaFornecedor" element={<ConsultaFornecedor/>} />
      <Route path="/ConsultaItens" element={<ConsultaItens/>} />
      <Route path="/ConsultaLocal" element={<ConsultaLocal/>} />
      <Route path="/ConsultaProjeto" element={<ConsultaProjeto/>} />
      <Route path="/AlterarCompra" element={<AlterarCompra/>} />
      <Route path="/AlterarConjuntoItens" element={<AlterarConjuntoItens/>} />
      <Route path="/AlterarFornecedor" element={<AlterarFornecedor/>} />
      <Route path="/AlterarItens" element={<AlterarItens/>} />
      <Route path="/AlterarLocal" element={<AlterarLocal/>} />
      <Route path="/AlterarProjeto" element={<AlterarProjeto/>} />
      <Route path="/DeletarCompra" element={<DeletarCompra/>} />
      <Route path="/DeletarConjuntoItens" element={<DeletarConjuntoItens/>} />
      <Route path="/DeletarFornecedor" element={<DeletarFornecedor/>} />
      <Route path="/DeletarItens" element={<DeletarItens/>} />
      <Route path="/DeletarLocal" element={<DeletarLocal/>} />
      <Route path="/DeletarProjeto" element={<DeletarProjeto/>} />
    </Routes>
  );
}

export default App;