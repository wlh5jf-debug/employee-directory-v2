import express from "express";
const app = express();
import employeesRouter from "./api/employees.js"; 

import employees from "#db/employees";

export default app;

app.use(express.json())

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello employees!");
});





app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.use("/employees", employeesRouter);



app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});

