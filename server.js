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
  inquirer.prompt({
      name: "mainMenu",
      type: "list",
      message: "How would you like to proceed?",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Exit the Application",
      ],
    })
    .then(function (result) {
      switch (result.option) {
        case "View Employees":
          accessEmployees();
          break;
        case "View Departments":
          accessDepartments();
          break;
        case "View Roles":
          accessRoles();
          break;
        default:
          exitPrompt();
      }
    });
};

const accessDepartments = () => {
  connectDB.query(`SELECT * FROM departments;`, (err, data) =>{
    if (err) throw err;
    console.log(data);
    console.table(data);
    startPrompt();
  });
};

const accessRoles = () => {
  connectDB.query(`SELECT roles.role_id, roles.title, departments.name AS department, roles.salary 
  FROM roles 
  INNER JOIN departments 
  ON roles.dept_id = departments.dept_id;`, 
  (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  });
};

const accessEmployees = () => {
  connectDB.query( `SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager
  FROM roles
  INNER JOIN employees
  ON roles.role_id = employees.role_id
  INNER JOIN departments
  ON roles.dept_id = departments.dept_id
  LEFT JOIN employees managers
  ON managers.employee_id = employees.manager_id
  ORDER BY employee_id;`,
  (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  }
  );
}


const exitPrompt = () => {
  connectDB.end;
  process.exit;
};
