import { DataTypes } from 'sequelize';
import connection from '../database/connection.js';
import Cliente from './Cliente.js';
import Barril from './Barril.js';

const sequelize = connection;

const Reserva = sequelize.define('reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dataInicial: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dataFinal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: 'id',
    },
  },
  barrilId: {
    type: DataTypes.INTEGER,
    references: {
      model: Barril,
      key: 'id',
    },
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


export default Reserva;
