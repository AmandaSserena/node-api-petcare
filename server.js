const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017';
; 
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

// 2. Agendamentos por veterinário
app.get('/relatorio/agendamentos-por-veterinario', async (req, res) => {
  try {
    const data = await db.collection('agendamentos').aggregate([
      { $group: { _id: "$id_veterinario", total: { $sum: 1 } } }
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

// 4. Veterinário com maior número de atendimentos
app.get('/relatorio/veterinario-mais-atendimentos', async (req, res) => {
  try {
    const data = await db.collection('atendimentos').aggregate([
      { $group: { _id: "$id_veterinario", total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 1 }
    ]).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
