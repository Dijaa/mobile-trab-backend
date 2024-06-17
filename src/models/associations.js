import Cliente from './Cliente.js';
import Reserva from './Reserva.js';
import Barril from './Barril.js';

// Definindo as associações
Reserva.belongsTo(Cliente, { as: 'cliente', foreignKey: 'clienteId' });
Reserva.belongsTo(Barril, { as: 'barril', foreignKey: 'barrilId' });
Cliente.hasMany(Reserva, { as: 'reservas', foreignKey: 'clienteId' });
Barril.hasMany(Reserva, { as: 'reservas', foreignKey: 'barrilId' });
