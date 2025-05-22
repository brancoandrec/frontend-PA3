# 🧾 Frontend - Gerenciamento de Estoque e Aquisição de Componentes Eletrônicos

Este é o repositório **frontend** de uma aplicação web para processamento de **notas fiscais**. O sistema permite que o usuário envie arquivos (imagem ou PDF), visualize os dados extraídos automaticamente por OCR, edite/corrija as informações e envie os dados corrigidos para o backend, onde são armazenados em um banco **PostgreSQL**.

---

## 🏗️ Visão Geral da Arquitetura

A aplicação é composta por:

- **Frontend (React + Tailwind)**: Interface de usuário responsiva para upload, visualização, edição e envio de dados.
- **Backend (Java)**:
  - **Microsserviço de OCR**: Recebe o arquivo da nota, consome uma API OCR, processa o conteúdo e envia os dados extraídos.
  - **Microsserviço de Armazenamento**: Recebe os dados revisados do frontend e os salva em um banco de dados PostgreSQL.

---

## ⚙️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- `fetch` (API nativa do JavaScript) para comunicação com a API
- [Vite](https://vitejs.dev/) para bundling e desenvolvimento local


