# 🐾 PetCare+ API

API desenvolvida em **Node.js** com **MongoDB** para gerenciar e analisar dados de pets, tutores, atendimentos e agendamentos de uma clínica veterinária.

Este projeto foi desenvolvido como **atividade avaliativa final** da disciplina de **Banco de Dados**, com foco em modelagem **NoSQL**, uso de **MongoDB Aggregation** e construção de **relatórios via API REST**.

![Print da aplicação](https://github.com/AmandaSserena/PetCare/raw/main/Print.png)

---

## 🚀 Tecnologias Utilizadas

- Node.js  
- Express.js  
- MongoDB  
- MongoDB Atlas (opcional)  
- VS Code

---

## 📁 Estrutura do Projeto

```

PetCare-API/
├── node\_modules/
├── index.html
├── massadados.json
├── package.json
├── package-lock.json
├── README.md
└── server.js

````

---

## ⚙️ Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/AmandaSserena/PetCare.git
cd PetCare
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o MongoDB

Certifique-se de que o MongoDB está rodando localmente na porta 27017 ou altere a URI no `server.js`:

```js
const uri = 'mongodb://localhost:27017';
```

O banco de dados utilizado se chama **petcare**.

### 4. Inicie o servidor

```bash
node server.js
```

A API estará disponível em:
👉 `http://localhost:3000`

---

## 📊 Relatórios Implementados (10)

Abaixo estão as **rotas REST** que retornam dados analíticos usando **MongoDB Aggregation Pipeline**.

| Nº | Rota                                       | Relatório                         | Descrição                                            |
| -- | ------------------------------------------ | --------------------------------- | ---------------------------------------------------- |
| 1  | `/relatorio/pets-por-especie`              | Pets por espécie                  | Conta o total de pets agrupado por espécie           |
| 2  | `/relatorio/agendamentos-por-veterinario`  | Agendamentos por veterinário      | Total de agendamentos feitos por cada veterinário    |
| 3  | `/relatorio/atendimentos-por-dia`          | Atendimentos por dia              | Total de atendimentos por data                       |
| 4  | `/relatorio/veterinario-mais-atendimentos` | Veterinário com mais atendimentos | Ranking com o profissional mais ativo                |
| 5  | `/relatorio/clientes-mais-pets`            | Clientes com mais pets            | Identifica os tutores com mais animais               |
| 6  | `/relatorio/atendimentos-por-mes`          | Atendimentos por mês              | Total de atendimentos realizados mensalmente         |
| 7  | `/relatorio/agendamentos-por-dia`          | Agendamentos por dia              | Planejamento diário da clínica                       |
| 8  | `/relatorio/faturamento-por-veterinario`   | Faturamento por veterinário       | Soma do faturamento por vet (R\$100 por atendimento) |
| 9  | `/relatorio/pets-mais-atendimentos`        | Pets mais atendidos               | Animais com mais passagens pela clínica              |
| 10 | `/relatorio/media-idade-por-especie`       | Média de idade por espécie        | Perfil demográfico dos animais atendidos             |

---

## 🧾 Exemplo de Retorno JSON

### `GET /relatorio/pets-por-especie`

```json
[
  { "_id": "Cachorro", "total": 5 },
  { "_id": "Gato", "total": 3 }
]
```

### `GET /relatorio/media-idade-por-especie`

```json
[
  { "_id": "Gato", "mediaIdade": 6.3 },
  { "_id": "Cachorro", "mediaIdade": 4.5 }
]
```

---

## 💡 Aprendizados aplicados

* Operadores MongoDB: `$group`, `$sum`, `$avg`, `$sort`, `$limit`, `$substr`
* Criação de rotas REST com Express
* Integração entre back-end e banco NoSQL
* Organização de projeto real com relatórios automatizados

---

## 📄 Licença

Projeto acadêmico desenvolvido por [Amanda Serena](https://github.com/AmandaSserena) e [Alfredo Mello](https://github.com/AlfredoMelloDev) 💜
Uso livre para fins educacionais e aprendizado.

---




