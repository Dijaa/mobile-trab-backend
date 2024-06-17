import express from "express";
import clienteController from "../controllers/clienteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const clienteRoutes = express.Router();

// clienteRoutes.use(authMiddleware);

clienteRoutes.post("/", clienteController.createCliente);
clienteRoutes.get("/", clienteController.getCliente);

export default clienteRoutes;