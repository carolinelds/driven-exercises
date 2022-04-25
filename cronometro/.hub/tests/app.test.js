import request from "../utils/request";
import { _setup, end } from "../utils/serverRunner";

jest.setTimeout(15000);

afterAll(() => {
  end();
});

describe("Exercício Cronômetro", () => {

  it("deveria iniciar o servidor na porta 5000 ", async () => {
    await _setup();
    const response = await request.post('/parar');
    expect(response.status).toEqual(200);
  });

  it("deveria retornar 'Cronômetro iniciado'", async () => {
    const response = await request.post('/iniciar');
    expect(response.data).toEqual('Cronômetro iniciado');
  });

  it("deveria retornar o tempo do cronômetro", async () => {
    const response = await request.post('/parar');
    expect(JSON.stringify(response.data)).toEqual(JSON.stringify({ tempo: 0 }));
  });
});
