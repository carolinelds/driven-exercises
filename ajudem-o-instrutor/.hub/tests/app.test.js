import request from "../utils/request";
import { _setup, end } from "../utils/serverRunner";

jest.setTimeout(15000);

afterAll(() => {
  end();
});

describe("POST /receitas", () => {
  it("should respond with status 409 when recipe already exists", async () => {
    await _setup();

    await request.post("/receitas", {
      titulo: "Um título muito grande não deixe isso na lista inicial se não não passa nos testes por favorzinho :)",
      ingredientes: "Muitas palavras",
      preparo: "Escreva uma frase, aumente a frase, aumente a frase..."
    });

    const response = await request.post("/receitas", {
      titulo: "Um título muito grande não deixe isso na lista inicial se não não passa nos testes por favorzinho :)",
      ingredientes: "Muitas palavras",
      preparo: "Escreva uma frase, aumente a frase, aumente a frase..."
    });

    expect(response.status).toEqual(409);
  });

  it("should respond with status 422 and message when recipe has no \"titulo\"", async () => {
    await _setup();

    const response = await request.post("/receitas", {
      ingredientes: "...",
      preparo: "..."
    });

    expect(response.status).toEqual(422);
    expect(response.data).toEqual("Todos os campos são obrigatórios");
  });

  it("should respond with status 422 and message when recipe has no \"ingredientes\"", async () => {
    await _setup();

    const response = await request.post("/receitas", {
      titulo: "...",
      preparo: "..."
    });

    expect(response.status).toEqual(422);
    expect(response.data).toEqual("Todos os campos são obrigatórios");
  });

  it("should respond with status 422 and message when recipe has no \"preparo\"", async () => {
    await _setup();

    const response = await request.post("/receitas", {
      titulo: "...",
      ingredientes: "..."
    });

    expect(response.status).toEqual(422);
    expect(response.data).toEqual("Todos os campos são obrigatórios");
  });

  it("should respond with status 422 and message when recipe has no \"titulo\" and no \"ingredientes\"", async () => {
    await _setup();

    const response = await request.post("/receitas", {
      preparo: "..."
    });

    expect(response.status).toEqual(422);
    expect(response.data).toEqual("Todos os campos são obrigatórios");
  });

  it("should respond with status 422 and message when recipe has no \"titulo\" and no \"preparo\"", async () => {
    await _setup();

    const response = await request.post("/receitas", {
      ingredientes: "..."
    });

    expect(response.status).toEqual(422);
    expect(response.data).toEqual("Todos os campos são obrigatórios");
  });

  it("should respond with status 422 and message when recipe has no \"ingredientes\" and no \"preparo\"", async () => {
    await _setup();

    const response = await request.post("/receitas", {
      titulo: "..............................................................."
    });

    expect(response.status).toEqual(422);
    expect(response.data).toEqual("Todos os campos são obrigatórios");
  });

  it("should respond with status 422 and message when recipe has nothing", async () => {
    await _setup();

    const response = await request.post("/receitas", {});

    expect(response.status).toEqual(422);
    expect(response.data).toEqual("Todos os campos são obrigatórios");
  });
});

describe("GET /receitas/:id", () => {
  it("should respond with status 404 when recipe doesn't exist", async () => {
    await _setup();

    const nonExistingId = (await request.get("/receitas")).data.map(recipe => recipe.id).sort((a, b) => a - b).slice(-1)[0] + 1;
    const response = await request.get(`/receitas/${nonExistingId}`);

    expect(response.status).toEqual(404);
  });

  it("should respond with status 200 when recipe exists", async () => {
    await _setup();

    const existingId = (await request.get("/receitas")).data[0].id;
    const response = await request.get(`/receitas/${existingId}`);

    expect(response.status).toEqual(200);
  });
});
