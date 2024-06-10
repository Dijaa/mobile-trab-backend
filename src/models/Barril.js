import connection from "../database/connection.js";
import { DataTypes } from "sequelize";

const sequelize = connection;

const Barril = sequelize.define("barril", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  litragem: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Barril.sync({ alter: true });
