const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db;

async function connectDB() {
  await client.connect();
  db = client.db('petcare');
  console.log('Conectado ao MongoDB');
}

connectDB().catch(console.error);

// 1. Pets por espécie
app.get('/relatorio/pets-por-especie', async (req, res) => {
  try {
    const data = await db.collection('pets').aggregate([
      { $group: { _id: "$especie", total: { $sum: 1 } } }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Agendamentos por veterinário (com nome)
app.get('/relatorio/agendamentos-por-veterinario', async (req, res) => {
  try {
    const data = await db.collection('agendamentos').aggregate([
      {
        $lookup: {
          from: "veterinarios",
          localField: "id_veterinario",
          foreignField: "_id",
          as: "veterinario"
        }
      },
      { $unwind: "$veterinario" },
      {
        $group: {
          _id: "$veterinario.nome",
          total: { $sum: 1 }
        }
      }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Atendimentos por dia
app.get('/relatorio/atendimentos-por-dia', async (req, res) => {
  try {
    const data = await db.collection('atendimentos').aggregate([
      { $group: { _id: "$data", total: { $sum: 1 } } }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Veterinário com mais atendimentos (com nome)
app.get('/relatorio/veterinario-mais-atendimentos', async (req, res) => {
  try {
    const data = await db.collection('atendimentos').aggregate([
      {
        $lookup: {
          from: "veterinarios",
          localField: "id_veterinario",
          foreignField: "_id",
          as: "veterinario"
        }
      },
      { $unwind: "$veterinario" },
      {
        $group: {
          _id: "$veterinario.nome",
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 1 }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Clientes com mais pets (com nome)
app.get('/relatorio/clientes-mais-pets', async (req, res) => {
  try {
    const data = await db.collection('pets').aggregate([
      {
        $lookup: {
          from: "clientes",
          localField: "id_cliente",
          foreignField: "_id",
          as: "cliente"
        }
      },
      { $unwind: "$cliente" },
      {
        $group: {
          _id: "$cliente.nome",
          totalPets: { $sum: 1 }
        }
      },
      { $sort: { totalPets: -1 } }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Atendimentos por mês
app.get('/relatorio/atendimentos-por-mes', async (req, res) => {
  try {
    const data = await db.collection('atendimentos').aggregate([
      {
        $group: {
          _id: { $substr: ["$data", 0, 7] }, // "YYYY-MM"
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Agendamentos por dia
app.get('/relatorio/agendamentos-por-dia', async (req, res) => {
  try {
    const data = await db.collection('agendamentos').aggregate([
      { $group: { _id: "$data", total: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Faturamento por veterinário (com nome)
app.get('/relatorio/faturamento-por-veterinario', async (req, res) => {
  try {
    const data = await db.collection('atendimentos').aggregate([
      {
        $lookup: {
          from: "veterinarios",
          localField: "id_veterinario",
          foreignField: "_id",
          as: "veterinario"
        }
      },
      { $unwind: "$veterinario" },
      {
        $group: {
          _id: "$veterinario.nome",
          totalFaturado: { $sum: 100 }
        }
      },
      { $sort: { totalFaturado: -1 } }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. Pets com mais atendimentos (mostrar espécie e raça)
app.get('/relatorio/pets-mais-atendimentos', async (req, res) => {
  try {
    const data = await db.collection('atendimentos').aggregate([
      {
        $lookup: {
          from: "pets",
          localField: "id_pet",
          foreignField: "_id",
          as: "pet"
        }
      },
      { $unwind: "$pet" },
      {
        $group: {
          _id: {
            especie: "$pet.especie",
            raca: "$pet.raca"
          },
          totalAtendimentos: { $sum: 1 }
        }
      },
      { $sort: { totalAtendimentos: -1 } }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. Média de idade por espécie
app.get('/relatorio/media-idade-por-especie', async (req, res) => {
  try {
    const data = await db.collection('pets').aggregate([
      {
        $group: {
          _id: "$especie",
          mediaIdade: { $avg: "$idade" }
        }
      },
      { $sort: { mediaIdade: -1 } }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const path = require('path');

// Servir o index.html quando acessar /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
