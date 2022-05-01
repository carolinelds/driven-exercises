import request from "../utils/request";
import { _setup, end } from "../utils/serverRunner";

jest.setTimeout(15000);

afterAll(() => {
  end();
});

describe("GET /extrato", () => {
  it("should respond with status 401 when User header is not specified", async () => {
    await _setup();

    const response = await request.get("/extrato");

    expect(response.status).toEqual(401);
  });

  it("should respond with only the extract from days 03 and user Ciclana", async () => {
    await _setup();

    const response = await request.get("/extrato?dia=03", { headers: { User: 'Ciclana' } });

    expect(response.data).toEqual([
      { cliente: 'Ciclana', movimentacao: 41.00, data: "03/03/2022", tipo: "saida" }
    ]);
  });

  it("should respond with only the extract from month 01 for user Fulano", async () => {
    await _setup();

    const response = await request.get("/extrato?mes=01", { headers: { User: 'Fulano' } });

    expect(response.data).toEqual([
      { cliente: 'Fulano', movimentacao: 300.00, data: "13/01/2022", tipo: "entrada" },
      { cliente: 'Fulano', movimentacao: 704.30, data: "20/01/2022", tipo: "entrada" }
    ]);
  });

  it("should respond with all withdraw events for user Ciclana", async () => {
    await _setup();

    const response = await request.get("/extrato?tipo=saida", { headers: { User: 'Ciclana' } });

    expect(response.data).toEqual([
      { cliente: 'Ciclana', movimentacao: 500.00, data: "14/01/2022", tipo: "saida" },
      { cliente: 'Ciclana', movimentacao: 41.00, data: "03/03/2022", tipo: "saida" },
      { cliente: 'Ciclana', movimentacao: 23.00, data: "08/03/2022", tipo: "saida" }
    ]);
  });

  it("should respond with all income events for user Fulano in the month 01", async () => {
    await _setup();

    const response = await request.get("/extrato?tipo=entrada&mes=01", { headers: { User: 'Fulano' } });

    expect(response.data).toEqual([
      { cliente: 'Fulano', movimentacao: 300.00, data: "13/01/2022", tipo: "entrada" },
      { cliente: 'Fulano', movimentacao: 704.30, data: "20/01/2022", tipo: "entrada" }
    ]);
  });

  it("should respond with all income events for user Fulano in the month 01 and day 13", async () => {
    await _setup();

    const response = await request.get("/extrato?tipo=entrada&mes=01&dia=13", { headers: { User: 'Fulano' } });

    expect(response.data).toEqual([
      { cliente: 'Fulano', movimentacao: 300.00, data: "13/01/2022", tipo: "entrada" }
    ]);
  });
});
