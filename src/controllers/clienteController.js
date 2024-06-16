import Cliente from "../models/Cliente.js";

(async () => {
  try {
    await Cliente.sync({ alter: true });
    console.log('Tabela "clientes" sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro durante a sincronização da tabela "clientes":', error);
  }
})();

const createCliente = async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing");
  const body = req.body;
  if (!body.nome) return res.status(400).send("Nome is required");
  if (!body.numero) return res.status(400).send("Numero is required");
  if (!body.endereco) return res.status(400).send("Endereco is required");

  Cliente.create({
    nome: body.nome,
    numero: body.numero,
    endereco: body.endereco,
  })
    .then((cliente) => {
       enviaMesangem(cliente.numero, cliente.nome);
      res.status(201).send(cliente);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro ao criar cliente");
    });
};

const getCliente = async (req, res) => {
  Cliente.findAll()
    .then((cliente) => {
      res.status(200).send(cliente);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro ao buscar cliente");
    });
};

const enviaMesangem = async (numero, nome) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("apikey", "mude-me");
  const raw = JSON.stringify({
    number: "55" + numero,
    options: {
      delay: 10,
      presence: "composing",
      linkPreview: false,
    },
    textMessage: {
      text: `Olá ${nome}, seu cadastro foi realizado com sucesso!`, 
     },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://192.168.0.155:8080/message/sendText/mobile", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};

export default { createCliente, getCliente };
