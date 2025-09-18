import express from "express";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = process.env.PORT;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

app.use(express.json());

async function initDb() {
  try {
   
    console.log("Tabela 'users' verificada/criada com sucesso!");
  } catch (err) {
    console.error("Erro ao criar/verificar tabela:", err);
  }
}


app.get("/", (req, res) => {
  res.send("Aplicação Dockerizada - Jhefferson Marques de Brito")
});


app.get("/users", async (req, res) => {
  initDb();
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuários"});
  }
});


app.post("/users", async (req, res) => {
  initDb();
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir usuário", stack: err});
  }
});


app.put("/users/:id", async (req, res) => {
  initDb();
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar usuário", stack: err });
  }
});

app.delete("/users/:id", async (req, res) => {
  initDb();
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário removido com sucesso", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover usuário", stack: err });
  }
});

app.listen(port, async () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
