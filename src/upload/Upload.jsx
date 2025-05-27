import { useState, useEffect } from "react";
import Sidebar from '../sidebar/Sidebar';
import '../styles.css';

function Upload() {
  const [formItems, setFormItems] = useState([
    { nome: '', descricao: '', tipo: '', quantidade: '', localArmazenId: '' }
  ]);

  const [formFornecedor, setFormFornecedor] = useState({
    nome: '',
    contato: '',
    endereco: '',
  });

  const [formData, setFormData] = useState({
    preco: '',
    dataCompra: '',
    dataRecebimento: '',
    dataInvoice: ''
  });

  const [selectedProjeto, setSelectedProjeto] = useState('');
  const [projetos, setProjetos] = useState([]);

  const [locais, setLocais] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function fetchProjetos() {
      try {
        const response = await fetch('http://localhost:8080/projeto/buscar');
        const data = await response.json();
        setProjetos(data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    }

    async function fetchLocais() {
      try {
        const response = await fetch('http://localhost:8080/localarmazen/buscar');
        const data = await response.json();
        setLocais(data);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    }

    fetchProjetos();
    fetchLocais();
  }, []);

  // Atualiza o item específico dentro do array
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setFormItems(prev => {
      const newItems = [...prev];
      newItems[index][name] = value;
      return newItems;
    });
  };

  const addItem = () => {
    setFormItems(prev => [...prev, { nome: '', descricao: '', tipo: '', quantidade: '', localArmazenId: '' }]);
  };

  const removeItem = (index) => {
    setFormItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleFornecedorChange = (e) => {
    const { name, value } = e.target;
    setFormFornecedor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjetoChange = (e) => {
    setSelectedProjeto(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Selecione um arquivo primeiro.");
      return;
    }
    const formDataFile = new FormData();
    formDataFile.append("file", selectedFile);
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formDataFile
      });
      if (response.ok) {
        const result = await response.json();
        const nfe = result.nfeProc?.NFe?.infNFe;

        setFormFornecedor({
          nome: nfe?.emit?.xNome || '',
          contato: nfe?.emit?.enderEmit.fone || '',
          endereco: nfe?.emit?.enderEmit?.xLgr
            ? `${nfe.emit.enderEmit.xLgr}, ${nfe.emit.enderEmit.nro}, ${nfe.emit.enderEmit.xBairro}`
            : ''
        });

        setFormData({
          preco: nfe?.total?.ICMSTot?.vNF || '',
          dataCompra: nfe?.ide?.dhEmi?.slice(0, 10) || '',
          dataRecebimento: '',
          dataInvoice: ''
        });

        const itens = nfe?.det || [];
        const itensArray = Array.isArray(itens) ? itens : [itens];
        const novosItens = itensArray.map(item => ({
          nome: item.prod?.xProd || '',
          descricao: '',
          tipo: '',
          quantidade: '',
          localArmazenId: ''
        }));
        setFormItems(novosItens);

        alert("Dados do XML carregados no formulário!");
      } else {
        alert("Erro ao enviar arquivo.");
      }
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProjeto) {
      alert("Selecione um projeto.");
      return;
    }

    try {
      // Enviar fornecedor
      const resFornecedor = await fetch('http://localhost:8080/fornecedor/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formFornecedor)
      });
      const fornecedorData = await resFornecedor.json();

      // Primeiro envia os itens para /item/add e obtém seus ids
      const itemIds = [];
      for (const item of formItems) {
        if (item.nome.trim() === '') continue;

        const resItem = await fetch('http://localhost:8080/item/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: item.nome,
            descricao: item.descricao,
            tipo: item.tipo
          })
        });
        const itemData = await resItem.json();
        itemIds.push({ id: itemData.id, quantidade: item.quantidade, localArmazenId: item.localArmazenId });
      }

      // Enviar conjunto itens com quantidade, projeto e local armazen (usando os ids retornados)
      for (const itemInfo of itemIds) {
        if (!itemInfo.quantidade || !itemInfo.localArmazenId) continue;

        const conjuntoItem = {
          quantidade: parseInt(itemInfo.quantidade, 10),
          item: { id: itemInfo.id },
          projeto: { id: parseInt(selectedProjeto, 10) },
          localArmazen: { id: parseInt(itemInfo.localArmazenId, 10) }
        };

        await fetch('http://localhost:8080/conjuntoitens/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(conjuntoItem)
        });
      }

      // Enviar compra
      const precoStr = String(formData.preco);
      const precoInteiro = parseInt(precoStr.split(/[.,]/)[0], 10);

      const compra = {
        itemNomes: formItems.map(item => item.nome), // array só com nomes dos itens
        fornecedorNome: formFornecedor.nome,          // nome do fornecedor
        projetoNome: (() => {
          // Se selectedProjeto for ID, busca nome correspondente:
          const projetoSelecionado = projetos.find(p => p.id === parseInt(selectedProjeto, 10));
          return projetoSelecionado ? projetoSelecionado.nome : selectedProjeto;
        })(),
        preco: isNaN(precoInteiro) ? 0 : precoInteiro,
        dataCompra: formData.dataCompra,
        dataRecebimento: formData.dataRecebimento,
        dataInvoice: formData.dataInvoice
      };
      await fetch('http://localhost:8080/compra/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compra)
      });

      // Resetar estados após sucesso
      setFormItems([{ nome: '', descricao: '', tipo: '', quantidade: '', localArmazenId: '' }]);
      setFormFornecedor({ nome: '', contato: '', endereco: '' });
      setFormData({ preco: '', dataCompra: '', dataRecebimento: '', dataInvoice: '' });
      setSelectedProjeto('');

      alert('Dados enviados com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar dados:', err);
      alert('Erro ao enviar dados. Veja o console.');
    }
  };

  return (
    <div className="div-container gradient-background min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex justify-center items-start mt-20">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Cadastro de Compra</h1>

          {/* Upload de Arquivo */}
          <div className="flex justify-center w-full mb-6">
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecionar arquivo:
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 mx-auto block"
              />
              <button
                onClick={handleFileUpload}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Enviar Arquivo
              </button>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-6">

            {/* Itens dinâmicos */}
            {formItems.map((item, index) => (
              <div key={index} className="border p-4 rounded-md space-y-2">
                <h2 className="font-semibold">Item {index + 1}</h2>

                <input
                  type="text"
                  name="nome"
                  placeholder="Nome do item"
                  value={item.nome}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="descricao"
                  placeholder="Descrição"
                  value={item.descricao}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="tipo"
                  placeholder="Tipo"
                  value={item.tipo}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="number"
                  name="quantidade"
                  placeholder="Quantidade"
                  min="1"
                  value={item.quantidade}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block font-medium mt-2 mb-1">Local de Armazenamento:</label>
                <select
                  name="localArmazenId"
                  value={item.localArmazenId}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um local</option>
                  {locais.map(local => (
                    <option key={local.id} value={local.id}>
                      Sala {local.sala} - Armário {local.armario}
                    </option>
                  ))}
                </select>

                {formItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:underline mt-2"
                  >
                    Remover Item
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Adicionar Item
            </button>

            {/* Dados do Fornecedor */}
            <div>
              <h2 className="font-semibold mb-2">Dados do Fornecedor</h2>
              <input
                type="text"
                name="nome"
                placeholder="Nome do fornecedor"
                value={formFornecedor.nome}
                onChange={handleFornecedorChange}
                required
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="contato"
                placeholder="Contato"
                value={formFornecedor.contato}
                onChange={handleFornecedorChange}
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
              <input
                type="text"
                name="endereco"
                placeholder="Endereço"
                value={formFornecedor.endereco}
                onChange={handleFornecedorChange}
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
            </div>
            {/* Projeto */}
            <div>
              <label className="block font-semibold mb-1">Projeto</label>
              <select
                value={selectedProjeto}
                onChange={handleProjetoChange}
                required
                className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um projeto</option>
                {projetos.map(proj => (
                  <option key={proj.id} value={proj.id}>
                    {proj.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Dados da Compra */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="preco"
                placeholder="Preço"
                value={formData.preco}
                onChange={handleChange}
                required
                className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dataCompra"
                value={formData.dataCompra}
                onChange={handleChange}
                required
                className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dataRecebimento"
                value={formData.dataRecebimento}
                onChange={handleChange}
                className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dataInvoice"
                value={formData.dataInvoice}
                onChange={handleChange}
                className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full mt-4"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
