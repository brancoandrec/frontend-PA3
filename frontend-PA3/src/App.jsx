import { Routes, Route } from 'react-router-dom';
import Cadastro from './Cadastro';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
    </Routes>
  );
}

export default App;