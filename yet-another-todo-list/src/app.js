import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const tasks = [];

app.post("/tasks", (request,response) => {
    const newTask = request.body;
    tasks.push(newTask);
    response.send(newTask);
});

app.get("/tasks", (request,response) => {
    response.send(tasks);
})

app.listen(5000, () => console.log("Server is running."));