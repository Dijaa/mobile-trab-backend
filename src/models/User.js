import connection from '../database/connection.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const sequelize = connection;

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

(async () => {
  try {
    // Cria o banco de dados se não existir
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.BASE}\`;`);
    console.log('Base de dados criada com sucesso.');

    // Autentica a conexão
    await sequelize.authenticate();
    console.log('Conexão com a base de dados estabelecida com sucesso.');

    // Sincroniza a tabela 'users'
    await User.sync({ alter: true });
    console.log('Tabela "users" sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro durante a inicialização do banco de dados:', error);
  }
})();

export default User;
