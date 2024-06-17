import connection from '../database/connection.js';
import { DataTypes } from 'sequelize';

const sequelize = connection;

const Barril = sequelize.define('barril', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    litragem: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Barril;
