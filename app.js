import sequelize from "./src/database/connection.js";
import express from "express";
import userController from "./src/controllers/userController.js";

const app = express();
app.use(express.json());

app.use("/users", userController);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

try {
  await sequelize.createDatabaseIfNotExists();  // Adicione esta linha
  await sequelize.sync({ alter: true });
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}