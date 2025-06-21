# 🐾 PetCare API

API desenvolvida em **Node.js** com **MongoDB** para gerenciar informações de pets, donos e atendimentos veterinários. Este projeto foi realizado como atividade avaliativa da faculdade, aplicando os conceitos de modelagem **NoSQL**.
**Link do trabalho:** https://docs.google.com/document/d/1e7Ay4vngwEgfztN3AgGlgLXBUly4bo2mYmNqEPeuSf0/edit?tab=t.0
---

## 📚 Tecnologias Utilizadas

* Node.js
* Express.js
* MongoDB (NoSQL)

---

## 📁 Estrutura do Projeto

```
PetCare/
├── models/
│   ├── Pet.js
│   ├── Dono.js
│   └── Atendimento.js
├── routes/
│   ├── petRoutes.js
│   ├── donoRoutes.js
│   └── atendimentoRoutes.js
├── controllers/
│   ├── petController.js
│   ├── donoController.js
│   └── atendimentoController.js
├── config/
│   └── db.js
├── .env
├── package.json
├── app.js
└── README.md
```

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/AmandaSserena/PetCare.git
cd PetCare
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/petcare
```

> 💡 Você pode usar o MongoDB Atlas se quiser uma conexão na nuvem.

### 4. Inicie o servidor

```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`

---

## 📌 Rotas da API

### 🐶 Pets

| Método | Rota        | Descrição                 |
| ------ | ----------- | ------------------------- |
| GET    | `/pets`     | Lista todos os pets       |
| GET    | `/pets/:id` | Retorna um pet específico |
| POST   | `/pets`     | Cadastra um novo pet      |
| PUT    | `/pets/:id` | Atualiza um pet           |
| DELETE | `/pets/:id` | Remove um pet             |

### 👤 Donos

| Método | Rota     | Descrição             |
| ------ | -------- | --------------------- |
| GET    | `/donos` | Lista todos os donos  |
| POST   | `/donos` | Cadastra um novo dono |

### 🩺 Atendimentos

| Método | Rota            | Descrição                    |
| ------ | --------------- | ---------------------------- |
| GET    | `/atendimentos` | Lista todos os atendimentos  |
| POST   | `/atendimentos` | Registra um novo atendimento |

---

## 🧪 Exemplo de Requisição JSON

### POST `/pets`

```json
{
  "nome": "Rex",
  "especie": "Cachorro",
  "idade": 5,
  "donoId": "665cefc3bf82a2c5e23f19ab"
}
```

---

## 📄 Licença

Projeto desenvolvido por [Amanda Serena](https://github.com/AmandaSserena) como atividade acadêmica. Livre para fins educacionais. 💜

