import { useState, useEffect } from "react";
import Sidebar from '../sidebar/Sidebar';
import '../styles.css';

function Upload() {
  const [formItems, setFormItems] = useState([
    { nome: '', descricao: '', tipo: '' }
  ]);

  const [formFornecedor, setFormFornecedor] = useState({
    nome: '',
    contato: '',
    endereco: '',
  });

  const [formData, setFormData] = useState({
    quantidade: '',
    preco: '',
    dataCompra: '',
    dataRecebimento: '',
    dataInvoice: ''
  });

  const [selectedProjeto, setSelectedProjeto] = useState('');
  const [projetos, setProjetos] = useState([]);
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
    fetchProjetos();
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
    setFormItems(prev => [...prev, { nome: '', descricao: '', tipo: '' }]);
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

        // Aqui você pega os dados aninhados
        const nfe = result.nfeProc?.NFe?.infNFe;

        // Atualiza os estados com dados do JSON
        setFormFornecedor({
          nome: nfe?.emit?.xNome || '',
          contato: nfe?.emit?.enderEmit.fone || '',
          endereco: nfe?.emit?.enderEmit?.xLgr
            ? `${nfe.emit.enderEmit.xLgr}, ${nfe.emit.enderEmit.nro}, ${nfe.emit.enderEmit.xBairro}`
            : ''
        });

        setFormData({
          preco: nfe?.total?.ICMSTot?.vNF || ''
        });


        // Pega os itens da nota (det)
        const itens = nfe?.det || [];

        // Garante que é array, pois se for 1 item, pode vir como objeto
        const itensArray = Array.isArray(itens) ? itens : [itens];

        // Mapeia para o formato esperado no estado
        const novosItens = itensArray.map(item => ({
          nome: item.prod?.xProd || '',
          descricao: '',  // ou alguma outra informação que queira preencher
          tipo: ''        // pode preencher com outra tag se quiser
        }));

        setFormItems(novosItens);


        // setFormItems({
        //   nome: nfe?.det?.xProd || '',
        //   descricao: nfe?.emit?.enderEmit.fone || '',
        //   tipo: nfe?.emit?.enderEmit?.xLgr 

        // });

        setFormData(prev => ({
          ...prev,
          dataCompra: nfe?.ide?.dhEmi?.slice(0, 10) || ''  // Pega só a data (YYYY-MM-DD)
        }));




        alert("Dados do XML carregados no formulário!");
      } else {
        alert("Erro ao enviar arquivo.");
      }
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
  };





  // versao antiga
  // const handleFileUpload = async () => {
  //   if (!selectedFile) {
  //     alert("Selecione um arquivo primeiro.");
  //     return;
  //   }
  //   const formDataFile = new FormData();
  //   formDataFile.append("file", selectedFile);
  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/upload", {
  //       method: "POST",
  //       body: formDataFile
  //     });
  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Arquivo enviado com sucesso:", result);
  //       alert("Arquivo enviado com sucesso!");
  //     } else {
  //       alert("Erro ao enviar arquivo.");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao enviar o arquivo:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar cada item individualmente
    try {
      for (const item of formItems) {
        const res = await fetch('http://localhost:8080/item/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        const data = await res.json();
        console.log("Item salvo:", data);
      }
      setFormItems([{ nome: '', descricao: '', tipo: '' }]);
    } catch (err) {
      console.error("Erro ao salvar item:", err);
      return;
    }

    // Enviar fornecedor
    try {
      const res = await fetch('http://localhost:8080/fornecedor/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formFornecedor)
      });
      const data = await res.json();
      console.log("Fornecedor salvo:", data);
      setFormFornecedor({ nome: '', contato: '', endereco: '' });
    } catch (err) {
      console.error("Erro ao salvar fornecedor:", err);
      return;
    }

    // Enviar compra com todos os nomes dos itens
    try {


      //   // transforma o preco em inteiro antes de mandar pro backend
      // const precoStr = String(formData.preco);
      // const precoInteiro = parseInt(precoStr.split(/[.,]/)[0], 10);

      // const compra = {
      //   itemNomes: formItems.map(item => item.nome),
      //   fornecedorNome: formFornecedor.nome,
      //   projetoNome: selectedProjeto,
      //   preco: isNaN(precoInteiro) ? 0 : precoInteiro,
      //   dataCompra: formData.dataCompra,
      //   dataRecebimento: formData.dataRecebimento,
      //   dataInvoice: formData.dataInvoice,
      // };


      const compra = {
        itemNomes: formItems.map(item => item.nome),
        fornecedorNome: formFornecedor.nome,
        projetoNome: selectedProjeto,
        preco: formData.preco,
        dataCompra: formData.dataCompra,
        dataRecebimento: formData.dataRecebimento,
        dataInvoice: formData.dataInvoice,
      }

    const res = await fetch('http://localhost:8080/compra/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(compra)
    });
    const data = await res.json();
    console.log("Compra salva:", data);
    setFormData({
      quantidade: '',
      preco: '',
      dataCompra: '',
      dataRecebimento: '',
      dataInvoice: ''
    });
    setSelectedProjeto('');
  } catch (err) {
    console.error("Erro ao salvar compra:", err);
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
        <form
          id="formCompra"
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4">Itens</h3>

          {formItems.map((item, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg relative">
              <input
                type="text"
                name="nome"
                value={item.nome}
                onChange={e => handleItemChange(index, e)}
                placeholder="Nome"
                required
                className="w-full border border-gray-500 rounded-md p-2 mb-2"
              />
              <input
                type="text"
                name="descricao"
                value={item.descricao}
                onChange={e => handleItemChange(index, e)}
                placeholder="Descrição"
                required
                className="w-full border border-gray-500 rounded-md p-2 mb-2"
              />
              <input
                type="text"
                name="tipo"
                value={item.tipo}
                onChange={e => handleItemChange(index, e)}
                placeholder="Tipo"
                required
                className="w-full border border-gray-500 rounded-md p-2 mb-2"
              />
              {formItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remover
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Adicionar Item
          </button>

          <h3 className="text-xl font-semibold mb-4">Fornecedor</h3>
          <input
            type="text"
            name="nome"
            value={formFornecedor.nome}
            onChange={handleFornecedorChange}
            placeholder="Nome do fornecedor"
            required
            className="w-full border border-gray-500 rounded-md p-2 mb-2"
          />
          <input
            type="text"
            name="contato"
            value={formFornecedor.contato}
            onChange={handleFornecedorChange}
            placeholder="Contato"
            required
            className="w-full border border-gray-500 rounded-md p-2 mb-2"
          />
          <input
            type="text"
            name="endereco"
            value={formFornecedor.endereco}
            onChange={handleFornecedorChange}
            placeholder="Endereço"
            required
            className="w-full border border-gray-500 rounded-md p-2 mb-6"
          />

          <h3 className="text-xl font-semibold mb-4">Compra</h3>

          <select
            id="projeto"
            value={selectedProjeto}
            onChange={handleProjetoChange}
            className="w-full border border-gray-500 rounded-md p-2 mb-4"
            required
          >
            <option value="">Selecione um projeto</option>
            {projetos.map((projeto) => (
              <option key={projeto.nome} value={projeto.nome}>
                {projeto.nome}
              </option>
            ))}
          </select>

          <input
            type="number"
            id="quantidade"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            placeholder="Quantidade"
            required
            className="w-full border border-gray-500 rounded-md p-2 mb-2"
          />

          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="Preço"
            required
            className="w-full border border-gray-500 rounded-md p-2 mb-2"
          />
          <h1>Data da Compra</h1>
          <input
            type="date"
            id="dataCompra"
            name="dataCompra"
            value={formData.dataCompra}
            onChange={handleChange}
            placeholder="Data da compra"
            required
            className="w-full border border-gray-500 rounded-md p-2 mb-2"
          />
          <h1>Data do Recebimento</h1>
          <input
            type="date"
            id="dataRecebimento"
            name="dataRecebimento"
            value={formData.dataRecebimento}
            onChange={handleChange}
            placeholder="Data de recebimento"
            required
            className="w-full border border-gray-500 rounded-md p-2 mb-2"
          />
          <h1>Data da Invoice</h1>
          <input
            type="date"
            id="dataInvoice"
            name="dataInvoice"
            value={formData.dataInvoice}
            onChange={handleChange}
            placeholder="Data da invoice"
            required
            className="w-full border border-gray-500 rounded-md p-2 mb-6"

          />

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
}

export default Upload;
