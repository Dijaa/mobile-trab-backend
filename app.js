// app.js (ou outro arquivo principal do servidor)
import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import barrilRoutes from "./src/routes/barrilRoutes.js";
import clienteRoutes from "./src/routes/clienteRoutes.js";
import reservaRoutes from "./src/routes/reservaRoutes.js";

const app = express();


app.use(express.json());
app.use("/users", userRoutes);
app.use("/barris", barrilRoutes);
app.use("/clientes", clienteRoutes);
app.use("/reservas", reservaRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
