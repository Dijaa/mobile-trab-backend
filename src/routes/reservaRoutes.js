import express from "express";
import reservaController from "../controllers/reservaController.js";

const reservaRoutes = express.Router();

reservaRoutes.post("/", reservaController.createReserva);
reservaRoutes.get("/", reservaController.getReserva);

export default reservaRoutes;