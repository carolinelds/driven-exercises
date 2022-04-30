import request from "../utils/request";
import { _setup, end } from "../utils/serverRunner";

jest.setTimeout(15000);

afterAll(() => {
  end();
});

describe("GET /tasks", () => {
  it("should give an empty array when there are no tasks", async () => {
    await _setup();

    const res = await request.get("/tasks");
    expect(res.data).toEqual([]);
  });
});

describe("POST /tasks", () => {
  it("should receive a new task and return it on GET", async () => {
    await _setup();

    const task = {
      description: "Banana",
      isChecked: false
    };

    await request.post("/tasks", task);
    const res = await request.get("/tasks");

    expect(res.data).toEqual([task]);
  });
})
