import express from "express"
const router = express.Router();
import { getEmployees, addEmployee, getEmployeeById, getRandomEmployee } from "#db/employees";
export default router;

router.get("/", (req, res) => {
    const employees = getEmployees();
    res.send(employees)
});

router.post("/", (req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body.")
    
    const { name } = req.body;
    if (!name) return res.status(400).send("New employee must have a name.")

    const employee = addEmployee(name);
    res.status(201).send(employee);
});

router.get("/random", (req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    const employee = getEmployeeById(+id);

    if (!employee) return res.status(404).send("Employee not found.")
        res.send(employee)
})