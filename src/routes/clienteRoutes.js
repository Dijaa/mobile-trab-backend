import express from "express";
import clienteController from "../controllers/clienteController.js";

const clienteRoutes = express.Router();

clienteRoutes.post("/", clienteController.createCliente);
clienteRoutes.get("/", clienteController.getCliente);

export default clienteRoutes;