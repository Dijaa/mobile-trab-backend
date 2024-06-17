import express from "express";
import reservaController from "../controllers/reservaController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const reservaRoutes = express.Router();

// reservaRoutes.use(authMiddleware);

reservaRoutes.post("/", reservaController.createReserva);
reservaRoutes.get("/", reservaController.getReserva);
reservaRoutes.put("/:id", reservaController.markAsDone);
reservaRoutes.put("/notify/:id", reservaController.nofiticaRetirada);

export default reservaRoutes;