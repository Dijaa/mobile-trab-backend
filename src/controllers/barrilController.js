import Barril from "../models/Barril.js";

(async () => {
  try {
    await Barril.sync({ alter: true });
    console.log('Tabela "barril" sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro durante a sincronização da tabela "barril":', error);
  }
})();

const createBarril = async (req, res, next) => {
  if (!req.body) return res.status(400).send("Request body is missing");
  const body = req.body;
  if (!body.tipo) return res.status(400).send("Tipo is required");
  if (!body.codigo) return res.status(400).send("Codigo is required");
  if (!body.litragem) return res.status(400).send("Litragem is required");

  Barril.create({
    tipo: body.tipo,
    litragem: body.litragem,
    codigo: body.codigo,
  })
    .then((barril) => {
      res.status(201).send(barril);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro ao criar barril");
    });
};

const getBarril = async (req, res, next) => {
  Barril.findAll()
    .then((barril) => {
      res.status(200).send(barril);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro ao buscar barril");
    });
};

export default { createBarril, getBarril };
