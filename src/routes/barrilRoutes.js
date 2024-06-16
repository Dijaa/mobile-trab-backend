import express from "express";

import barrilController from "../controllers/barrilController.js";

const barrilRoutes = express.Router();

barrilRoutes.post("/", barrilController.createBarril);
barrilRoutes.get("/", barrilController.getBarril);

export default barrilRoutes;