import request from "../utils/request";
import { _setup, end, setEnv } from "../utils/serverRunner";
import sleep from "../utils/sleep";

jest.setTimeout(15000);

beforeAll(async () => {
  setEnv("MONGO_URI", "mongodb://mongo_db:27017");
  await sleep(4000);
})

afterAll(() => {
  end();
});

describe("GET /contatos", () => {
  it("should respond with an empty array", async () => {
    await _setup();

    const response = await request.get("/contatos");

    expect(response.data).toEqual([]);
  });

  it("should create a new contact", async () => {
    await _setup();

    const response = await request.post("/contatos", {
      nome: "Fulano",
      telefone: "1212341234"
    });

    expect(response.status).toEqual(201);
  });

  it("should respond with the complete list of contacts", async () => {
    await _setup();

    const response = await request.get("/contatos");

    expect(response.data).toEqual([{
      _id: expect.any(String),
      nome: "Fulano",
      telefone: "1212341234"
    }]);
  });
});
