const express = require('express');
const connectDB = require('./config/db');
const  cors = require('cors');

const app = express();

connectDB();

// enable cors
app.use(cors());

app.use(express.json({ extented: true }));

const PORT = process.env.PORT || 4000;

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

app.listen(PORT, () => {
  console.log(`run server ${PORT}`);
});