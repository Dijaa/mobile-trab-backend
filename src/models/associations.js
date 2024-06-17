import Cliente from './Cliente.js';
import Reserva from './Reserva.js';
import Barril from './Barril.js';

Reserva.belongsTo(Cliente, { as: 'cliente', foreignKey: 'clienteId' });
Reserva.belongsTo(Barril, { as: 'barril', foreignKey: 'barrilId' });
Cliente.hasMany(Reserva, { as: 'reservas', foreignKey: 'clienteId' });