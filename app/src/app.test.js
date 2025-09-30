const request = require("supertest");

describe("API de Usuários", () => {

  it("deve criar um novo usuário", async () => {
    const res = await request("http://localhost:3000")
      .post("/users")
      .send({ name: "Teste", email: "teste@example.com" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Teste");
    expect(res.body.email).toBe("teste@example.com");
  });

  it("deve listar usuários", async () => {
    const res = await request("http://localhost:3000").get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
