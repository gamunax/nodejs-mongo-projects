const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extented: true }));

const PORT = process.env.PORT || 4000;

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`run server ${PORT}`);
});