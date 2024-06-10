// database/connection.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('', process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql'
});

const initializeDatabase = async () => {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.BASE}\`;`);
    console.log('Base de dados criada com sucesso.');

    sequelize.close();

    const db = new Sequelize(process.env.BASE, process.env.USER, process.env.PASSWORD, {
      host: process.env.HOST,
      dialect: 'mysql'
    });

    await db.authenticate();
    console.log('Conexão com a base de dados estabelecida com sucesso.');
    
    return db;
  } catch (error) {
    console.error('Erro durante a inicialização do banco de dados:', error);
  }
};

const db = await initializeDatabase();

export default db;
