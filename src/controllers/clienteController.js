import Cliente from "../models/Cliente.js";
import enviaMesangem from "../utils/enviaMensagem.js";

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
      let mensagem = `Olá ${cliente.nome}, seja bem vindo!\n\nVocê foi cadastrado com sucesso!\n\nSeu endereço é: ${cliente.endereco}\n\nSeu número é: ${cliente.numero}\n\nObrigado pela preferência!`;
       enviaMesangem(cliente.numero, mensagem);
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


export default { createCliente, getCliente };
