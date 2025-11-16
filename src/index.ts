import express from "express";
import generateRoutes from "./routes/generateRoutes";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

// swagger
setupSwagger(app);

app.use("/api", generateRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
