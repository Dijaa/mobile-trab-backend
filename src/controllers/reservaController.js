import Reserva from "../models/Reserva.js";
import Cliente from "../models/Cliente.js";
import Barril from "../models/Barril.js";
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
  // {
  //   dataFinal: '2024-06-20T01:58:44.000Z',
  //   dataIncial: '2024-06-17T01:58:53.837Z',
  //   clienteId: '2',
  //   barrilId: '3',
  //   latitude: -28.29294279559148,
  //   longitude: -53.499800026362124
  // }
  const body = req.body;
  if (!body.dataFinal) return res.status(400).send("Data final is required");
  if (!body.clienteId) return res.status(400).send("ClienteId is required");
  if (!body.barrilId) return res.status(400).send("BarrilId is required");
  if (!body.latitude) return res.status(400).send("Latitude is required");
  if (!body.longitude) return res.status(400).send("Longitude is required");

  let dataFinal = new Date(body.dataFinal);
  let dataIncial = new Date(body.dataIncial);

  Reserva.create({
    dataFinal: dataFinal,
    dataInicial: dataIncial,
    clienteId: body.clienteId,
    barrilId: body.barrilId,
    latitude: body.latitude,
    longitude: body.longitude,
  })
    .then(async (reserva) => {
      const cliente = await Cliente.findByPk(reserva.clienteId);
      const barril = await Barril.findByPk(reserva.barrilId);

      // Criar um objeto de opções de formatação de data
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        weekday: "long",
      };
      // Criar um objeto Intl.DateTimeFormat para português brasileiro
      const formatter = new Intl.DateTimeFormat("pt-BR", options);

      // Formatar as datas
      const dataInicial = formatter.format(new Date(reserva.dataInicial));
      const dataFinal = formatter.format(new Date(reserva.dataFinal));

      console.log(cliente);
      enviaMesangem(
        cliente.numero,
        `Olá ${cliente.nome},\n\n Estou Passando aqui pra avisar que sua reserva foi feita com sucesso!\n\n O barril que você reservou é o de código ${barril.codigo}.\nCom ${barril.litragem} litros.\nTipo: ${barril.tipo}\n\nInicio: ${dataInicial}\nFinal: ${dataFinal}\n\nObrigado pela preferência!\n\n Atenciosamente, equipe da cervejaria!`
      );
      res.status(201).send(reserva);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro ao criar reserva");
    });
};

const getReserva = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        {
          model: Cliente,
          as: 'clienteId', // Certifique-se de que este alias está correto conforme a definição das associações.
          attributes: ['id', 'nome', 'numero', 'endereco'],
        },
        {
          model: Barril,
          as: 'barril', // Certifique-se de que este alias está correto conforme a definição das associações.
          attributes: ['id', 'codigo', 'litragem', 'tipo'],
        },
      ],
    });

    const reservasPopuladas = reservas.map(reserva => reserva.get({ plain: true }));

    res.status(200).send(reservasPopuladas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar reserva");
  }
};

export default { createReserva, getReserva };
