const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// const PORT = 5000;
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (replace with real DB in production)
let employees = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '555-1234', department: 'IT', position: 'Developer', salary: '75000' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', department: 'HR', position: 'Manager', salary: '85000' }
];
app.get('/', (req, res) => {
  res.json({
    message: "Employee Management API",
    endpoints: {
      getEmployees: "GET /api/employees",
      addEmployee: "POST /api/employees",
      updateEmployee: "PUT /api/employees/:id",
      deleteEmployee: "DELETE /api/employees/:id"
    }
  });
});
// Routes
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.post('/api/employees', (req, res) => {
  const newEmployee = { id: Date.now().toString(), ...req.body };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex(emp => emp.id === id);
  
  if (index >= 0) {
    employees[index] = { ...employees[index], ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter(emp => emp.id !== id);
  res.json({ message: 'Employee deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});