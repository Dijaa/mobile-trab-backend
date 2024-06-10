import { Sequelize } from "sequelize";

const createDatabaseIfNotExists = async () => {
  const tempSequelize = new Sequelize('', process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
  });

  try {
    await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.BASE}\`;`);
    console.log('Base de dados criada com sucesso.');
  } catch (error) {
    console.error('Erro ao criar a base de dados:', error);
    throw error;
  } finally {
    await tempSequelize.close();
  }
};

const connectToDatabase = async () => {
  const sequelize = new Sequelize(process.env.BASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
  });

  try {
    await sequelize.authenticate();
    console.log('Conexão com a base de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar-se à base de dados:', error);
    if (error.original && error.original.code === 'ER_BAD_DB_ERROR') {
      await createDatabaseIfNotExists();
      await connectToDatabase();
    } else {
      throw error;
    }
  }

  return sequelize;
};

const sequelize = await connectToDatabase();

export default sequelize;
