const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;

// Connect to database
const connectDB = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "password",
    database: "employee_info_db",
  }
  //console.log(`Connected to the employee database.`)
);

connectDB.connect((err) => {
  if (err) {
    console.log(err);
    res.status(500);
    return res.send("Unable to connect to the DB.");
  }
  console.log("Connected to the Employee Database!");

  startPrompt();
});

startPrompt = () => {
  inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "How would you like to proceed?",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Create an Employee",
        "Create a Role",
        "Create a Department",
        "Exit the Application",

      ],
    })
    .then(function (result) {
      switch (result.mainMenu) {
        case "View Employees":
          accessEmployees();
          break;
        case "View Departments":
          accessDepartments();
          break;
        case "View Roles":
          accessRoles();
          break;
        // case "Create an Employee":
        //   createEmployee();
        //   break;
        // case "Create a Department":
        //   createDepartment();
        //   break;
        // case "Create a Role":
        //   createRole();
        //   break;
        default:
          exitPrompt();
      }
    });
};

const accessDepartments = () => {
  connectDB.query(`SELECT * FROM department;`, (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  });
};

const accessRoles = () => {
  connectDB.query(
  `SELECT role.id, role.title, department.name AS department, role.salary 
  FROM role 
  INNER JOIN department 
  ON role.department_id = department.id;`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      startPrompt();
    }
  );
};

const accessEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(managers.first_name, " ", managers.last_name) AS manager
  FROM employee
  INNER JOIN role
  ON role.id = employee.role_id
  INNER JOIN department
  ON role.department_id = department.id
  LEFT JOIN employee AS managers
  ON employee.manager_id = managers.id
  ;`;

  connectDB.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  });
};

const exitPrompt = () => {
  connectDB.end();
  process.exit();
};


// const createEmployee = () => {

  
// }
// const createDepartment = () => {

// }
// const createRole = () => {

// }