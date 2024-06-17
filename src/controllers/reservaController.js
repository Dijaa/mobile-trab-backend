import Reserva from "../models/Reserva.js";
import enviaMesangem from "../utils/enviaMensagem.js";

(async () => {
  try {
    await Reserva.sync({ alter: true });
    console.log('Tabela "reservas" sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro durante a sincronização da tabela "reservas":', error);
  }
})();

const createReserva = async (req, res) => {
    console.log(req.body);
  if (!req.body) return res.status(400).send("Request body is missing");
  const body = req.body;
  if (!body.dataFinal) return res.status(400).send("Data final is required");
  if (!body.clienteId) return res.status(400).send("ClienteId is required");
  if (!body.barrilId) return res.status(400).send("BarrilId is required");
  if (!body.latitudade) return res.status(400).send("Latitude is required");
  if (!body.longitude) return res.status(400).send("Longitude is required");

  Reserva.create({
    dataFinal: body.dataFinal,
    dataIncial: body.dataIncial,
    clienteId: body.clienteId,
    barrilId: body.barrilId,
    latitudade: body.latitudade,
    longitude: body.longitude,
  })
    .then((reserva) => {
      const cliente = Cliente.findByPk(reserva.clienteId);
      const barril = Barril.findByPk(reserva.barrilId);
      enviaMesangem(
        cliente.numero,
        `Olá ${cliente.nome},\n\n Estou Passando aqui pra avisar que sua reserva foi feita com sucesso!\n\n O barril que você reservou é o de código ${barril.codigo}.\nCom ${barril.litragem} litros.\nTipo: ${barril.tipo}\n\nInicio: ${reserva.dataIncial}\nFinal: ${reserva.dataFinal}\n\nObrigado pela preferência!\n\n Atenciosamente, equipe da cervejaria!`
      );
      res.status(201).send(reserva);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro ao criar reserva");
    });
};

const getReserva = async (req, res) => {
  Reserva.findAll()
    .then((reserva) => {
      res.status(200).send(reserva);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro ao buscar reserva");
    });
};

export default { createReserva, getReserva };
