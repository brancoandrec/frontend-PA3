import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './styles.css'

function Cadastro() {

  return (
    <>
      <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />
    <div className="flex justify-center items-start min-h-screen w-full">
  <div className="grid grid-cols-3 grid-rows-2 gap-4 w-[700px] h-[500px] p-4">
    <Link to="/cadastroCompra" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
      <span className="material-icons text-blue-500 text-4xl">shopping_cart</span>
      <span className="text-lg font-semibold">Cadastrar Compra</span>
    </Link>

    <Link to="/cadastroItens" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
      <span className="material-icons text-green-500 text-4xl">inventory</span>
      <span className="text-lg font-semibold">Cadastrar Itens</span>
    </Link>

    <Link to="/cadastroFornecedor" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
      <span className="material-icons text-yellow-500 text-4xl">store</span>
      <span className="text-lg font-semibold">Cadastrar Fornecedor</span>
    </Link>

    <Link to="/cadastroProjeto" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
      <span className="material-icons text-purple-500 text-4xl">work</span>
      <span className="text-lg font-semibold">Cadastrar Projeto</span>
    </Link>

    <Link to="/cadastroLocal" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
      <span className="material-icons text-red-500 text-4xl">place</span>
      <span className="text-lg font-semibold">Cadastrar Local</span>
    </Link>

    <Link to="/cadastroConjuntoItens" className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-xl shadow-2xl hover:bg-gray-100 transition z-10">
      <span className="material-icons text-indigo-500 text-4xl">layers</span>
      <span className="text-lg font-semibold">Cadastrar Conjunto Itens</span>
    </Link>
  </div>
</div>




</div>
    </>
  )
}

export default Cadastro
