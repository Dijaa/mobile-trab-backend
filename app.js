// app.js (ou outro arquivo principal do servidor)
import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
import barrilRoutes from './src/routes/barrilRoutes.js';

const app = express();

// (async () => {
//   try {
//     await User.sync({ alter: true });
//     await Barril.sync({ alter: true });
//     console.log('Tabela "users" sincronizada com sucesso.');
//   } catch (error) {
//     console.error('Erro durante a sincronização da tabela "users":', error);
//   }
// })();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/barril', barrilRoutes);
app.get('/', (req, res) => {
  res.send('Hello World');
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
