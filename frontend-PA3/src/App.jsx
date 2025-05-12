import { Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './Cadastro';
import Consulta from './Consulta';
import Deletar from './Deletar';
import Alterar from './Alterar';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cadastro" replace />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/consulta" element={<Consulta />} />
      <Route path="/deletar" element={<Deletar/>} />
      <Route path="/alterar" element={<Alterar/>} />
    </Routes>
  );
}

export default App;