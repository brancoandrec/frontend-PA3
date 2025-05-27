// import React, { useState } from 'react';
// import '../styles.css';
// import Sidebar from '../sidebar/Sidebar';

// const CadastrarConjuntoItens = () => {
//   const [quantidade, setQuantidade] = useState('');
//   const [itemId, setItemId] = useState('');
//   const [localId, setLocalId] = useState('');
//   const [projetoId, setProjetoId] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const fornecedor = {
//       quantidade,
//       item: { id: itemId },
//       localArmazen: { id: localId },
//       projeto: { id: projetoId },
//     };

//     fetch('http://localhost:8080/conjuntoitens/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(fornecedor),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Sucesso:', data);
//         setQuantidade('');
//         setItemId('');
//         setLocalId('');
//         setProjetoId('');
//       })
//       .catch((error) => {
//         console.error('Erro:', error);
//       });
//   };

//   return (
//     <div className="div-container gradient-background min-h-screen flex">
//   <Sidebar />
//   <div className="flex-1 flex justify-center items-start mt-20">
//     <div className="w-full max-w-xl">
//       <h1 className="text-2xl font-bold mb-6 text-center text-black">Cadastro Conjunto Itens</h1>
//       {/* Campos do formulário */}
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl max-w-xl shadow-lg space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="quantidade">Quantidade:</label>
//           <input
//             type="text"
//             id="quantidade"
//             value={quantidade}
//             onChange={(e) => setQuantidade(e.target.value)}
//             required
//             className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="item">ID do Item:</label>
//           <input
//             type="text"
//             id="item"
//             value={itemId}
//             onChange={(e) => setItemId(e.target.value)}
//             required
//             className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="local">ID do Local:</label>
//           <input
//             type="text"
//             id="local"
//             value={localId}
//             onChange={(e) => setLocalId(e.target.value)}
//             required
//             className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="projeto">ID do Projeto:</label>
//           <input
//             type="text"
//             id="projeto"
//             value={projetoId}
//             onChange={(e) => setProjetoId(e.target.value)}
//             required
//             className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Enviar
//         </button>
//       </form>
//     </div>
//   </div>
// </div>

//   );
// };

// export default CadastrarConjuntoItens;










import React, { useState, useEffect } from 'react';
import '../styles.css';
import Sidebar from '../sidebar/Sidebar';

const CadastrarConjuntoItens = () => {
  const [quantidade, setQuantidade] = useState('');
  const [itemId, setItemId] = useState('');
  const [localId, setLocalId] = useState('');
  const [projetoId, setProjetoId] = useState('');

  const [itens, setItens] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/item/buscar')
      .then(res => res.json())
      .then(data => setItens(data))
      .catch(err => console.error('Erro ao buscar itens:', err));

    fetch('http://localhost:8080/projeto/buscar')
      .then(res => res.json())
      .then(data => setProjetos(data))
      .catch(err => console.error('Erro ao buscar projetos:', err));

    fetch('http://localhost:8080/localarmazen/buscar')
      .then(res => res.json())
      .then(data => setLocais(data))
      .catch(err => console.error('Erro ao buscar locais:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fornecedor = {
      quantidade,
      item: { id: itemId },
      localArmazen: { id: localId },
      projeto: { id: projetoId },
    };

    fetch('http://localhost:8080/conjuntoitens/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fornecedor),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Sucesso:', data);
        setQuantidade('');
        setItemId('');
        setLocalId('');
        setProjetoId('');
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex justify-center items-start mt-20">
        <div className="w-full max-w-xl">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Cadastro Conjunto Itens</h1>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="quantidade">Quantidade:</label>
              <input
                type="text"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="item">Item:</label>
              <select
                id="item"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                required
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um item</option>
                {itens.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="local">Local de Armazenamento:</label>
              <select
                id="local"
                value={localId}
                onChange={(e) => setLocalId(e.target.value)}
                required
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um local</option>
                {locais.map((local) => (
                  <option key={local.id} value={local.id}>
                    Sala {local.sala} - Armário {local.armario}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="projeto">Projeto:</label>
              <select
                id="projeto"
                value={projetoId}
                onChange={(e) => setProjetoId(e.target.value)}
                required
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um projeto</option>
                {projetos.map((projeto) => (
                  <option key={projeto.id} value={projeto.id}>
                    {projeto.nome}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastrarConjuntoItens;





