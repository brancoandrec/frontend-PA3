import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import './styles.css'

function Alterar() {

  return (
   <>
  <div className="div-container gradient-background min-h-screen flex">
    <div className="w-64">
      <Sidebar />
    </div>
    <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2">
      <div className="grid grid-cols-3 grid-rows-2 gap-4 w-[700px] h-[500px]">
        <Link to="/alterarCompra" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
          <span className="material-icons text-[#052561] text-4xl">shopping_cart</span>
          <span className="font-semibold">Alterar Compra</span>
        </Link>

        <Link to="/alterarItens" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
          <span className="material-icons text-[#052561] text-4xl">inventory</span>
          <span className="font-semibold">Alterar Itens</span>
        </Link>

        <Link to="/alterarFornecedor" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
          <span className="material-icons text-[#052561] text-4xl">store</span>
          <span className="font-semibold">Alterar Fornecedor</span>
        </Link>

        <Link to="/alterarProjeto" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
          <span className="material-icons text-[#052561] text-4xl">work</span>
          <span className="font-semibold">Alterar Projeto</span>
        </Link>

        <Link to="/alterarLocal" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
          <span className="material-icons text-[#052561] text-4xl">place</span>
          <span className="font-semibold">Alterar Local</span>
        </Link>

        <Link to="/alterarConjuntoItens" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
          <span className="material-icons text-[#052561] text-4xl">view_compact_alt</span>
          <span className="font-semibold text-center">Alterar <br />Conjunto Itens</span>
        </Link>
      </div>
    </div>
  </div>
</>

  )
}

export default Alterar