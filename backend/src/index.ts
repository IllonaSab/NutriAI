import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend OK");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.create({
    data: { email, password },
  });

  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
