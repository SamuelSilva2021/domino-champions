const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 7002;

// Configuração do middleware CORS
app.use(cors());

// Configuração do middleware para servir arquivos estáticos
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
  console.log(`Servidor rodando em https://localhost:${PORT}`);
});
