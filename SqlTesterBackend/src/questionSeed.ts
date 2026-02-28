import mongoose from "mongoose";
import Assignment from "./models/assignmentSchema";
import dotenv from 'dotenv'

export const questions = [
  {
    title: "Select All Employees",
    description: "Retrieve all columns from the employees table.",
    difficulty: "Easy",
    question: "Write a query to fetch all records from employees table.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, department, salary) VALUES
('Alice', 'HR', 40000),
('Bob', 'IT', 60000),
('Charlie', 'Finance', 55000);`,
  },
  {
    title: "Employees with Salary Greater Than 50000",
    description: "Fetch employees earning more than 50000.",
    difficulty: "Easy",
    question: "Write a query to find employees with salary > 50000.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, department, salary) VALUES
('David', 'IT', 70000),
('Eve', 'HR', 45000),
('Frank', 'Finance', 80000);`,
  },
  {
    title: "Count Total Employees",
    description: "Count total number of employees.",
    difficulty: "Easy",
    question: "Write a query to count employees.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, department, salary) VALUES
('A', 'HR', 30000),
('B', 'IT', 50000);`,
  },
  {
    title: "Employees in IT Department",
    description: "Fetch employees who belong to IT department.",
    difficulty: "Easy",
    question: "Write a query to find employees where department = 'IT'.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, department, salary) VALUES
('John', 'IT', 60000),
('Jane', 'HR', 45000);`,
  },
  {
    title: "Highest Salary",
    description: "Find highest salary from employees table.",
    difficulty: "Easy",
    question: "Write a query to find maximum salary.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, salary) VALUES
('A', 30000),
('B', 90000),
('C', 50000);`,
  },
  {
    title: "Average Salary",
    description: "Calculate average salary of employees.",
    difficulty: "Easy",
    question: "Write a query to calculate average salary.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, salary) VALUES
('A', 20000),
('B', 40000);`,
  },
  {
    title: "Distinct Departments",
    description: "List unique departments from employees.",
    difficulty: "Easy",
    question: "Write a query to get distinct departments.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100)
);`,
    sampleData: `
INSERT INTO employees (name, department) VALUES
('A', 'IT'),
('B', 'IT'),
('C', 'HR');`,
  },
  {
    title: "Order Employees by Salary",
    description: "Sort employees by salary descending.",
    difficulty: "Easy",
    question: "Write a query to order employees by salary DESC.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, salary) VALUES
('A', 20000),
('B', 50000),
('C', 40000);`,
  },
  {
    title: "Limit Records",
    description: "Fetch first 2 employees.",
    difficulty: "Easy",
    question: "Write a query to get first 2 records.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);`,
    sampleData: `
INSERT INTO employees (name) VALUES
('A'), ('B'), ('C');`,
  },
  {
    title: "Employees with Salary Between",
    description: "Find employees with salary between 30000 and 70000.",
    difficulty: "Easy",
    question: "Write a query using BETWEEN.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, salary) VALUES
('A', 25000),
('B', 50000),
('C', 80000);`,
  },
  {
    title: "Employees with Salary Above Department Average",
    description:
      "Find employees whose salary is greater than the average salary of their department.",
    difficulty: "Medium",
    question:
      "Write a query using subquery to compare salary with department average.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, department, salary) VALUES
('Alice','IT',50000),
('Bob','IT',70000),
('Charlie','HR',40000),
('David','HR',60000);`,
  },
  {
    title: "Total Salary Per Department",
    description: "Calculate total salary paid in each department.",
    difficulty: "Medium",
    question: "Write a query using GROUP BY.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  department VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (department, salary) VALUES
('IT',50000),
('IT',60000),
('HR',40000);`,
  },
  {
    title: "Employees With No Department",
    description: "Find employees who are not assigned to any department.",
    difficulty: "Medium",
    question: "Write a query to find NULL department values.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100)
);`,
    sampleData: `
INSERT INTO employees (name, department) VALUES
('A','IT'),
('B',NULL);`,
  },
  {
    title: "Second Highest Salary Using Limit",
    description: "Find second highest salary using ORDER BY and LIMIT.",
    difficulty: "Medium",
    question: "Write query using OFFSET.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  salary INT
);`,
    sampleData: `
INSERT INTO employees (salary) VALUES
(10000),(20000),(30000),(40000);`,
  },
  {
    title: "Employees Hired After 2020",
    description: "Fetch employees hired after year 2020.",
    difficulty: "Medium",
    question: "Write query using DATE comparison.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  hire_date DATE
);`,
    sampleData: `
INSERT INTO employees (name, hire_date) VALUES
('A','2019-01-01'),
('B','2021-05-10');`,
  },
  {
    title: "Department Employee Count",
    description: "Count employees in each department.",
    difficulty: "Medium",
    question: "Write query using GROUP BY and COUNT.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  department VARCHAR(100)
);`,
    sampleData: `
INSERT INTO employees (department) VALUES
('IT'),('IT'),('HR');`,
  },
  {
    title: "Employees with Salary Above 60000",
    description: "List employees earning above 60000 sorted descending.",
    difficulty: "Medium",
    question: "Write query using WHERE and ORDER BY.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, salary) VALUES
('A',70000),
('B',50000);`,
  },
  {
    title: "Departments Having More Than 1 Employee",
    description: "Find departments with more than one employee.",
    difficulty: "Medium",
    question: "Write query using HAVING.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  department VARCHAR(100)
);`,
    sampleData: `
INSERT INTO employees (department) VALUES
('IT'),('IT'),('HR');`,
  },
  {
    title: "Employees With Same Salary",
    description: "Find employees sharing the same salary.",
    difficulty: "Medium",
    question: "Write query using GROUP BY salary HAVING COUNT > 1.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (name, salary) VALUES
('A',50000),
('B',50000),
('C',60000);`,
  },
  {
    title: "Employees Joined in Last 30 Days",
    description: "Find employees hired in last 30 days.",
    difficulty: "Medium",
    question: "Write query using CURRENT_DATE.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  hire_date DATE
);`,
    sampleData: `
INSERT INTO employees (name, hire_date) VALUES
('A',CURRENT_DATE - INTERVAL '10 days'),
('B',CURRENT_DATE - INTERVAL '40 days');`,
  },

  {
    title: "Third Highest Salary Using Dense Rank",
    description: "Find third highest salary using window function.",
    difficulty: "Hard",
    question: "Write query using DENSE_RANK().",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  salary INT
);`,
    sampleData: `
INSERT INTO employees (salary) VALUES
(10000),(20000),(30000),(40000);`,
  },
  {
    title: "Running Total of Salaries",
    description: "Calculate cumulative salary ordered by id.",
    difficulty: "Hard",
    question: "Write query using SUM() OVER().",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  salary INT
);`,
    sampleData: `
INSERT INTO employees (salary) VALUES
(10000),(20000),(30000);`,
  },
  {
    title: "Employees Who Earn More Than Their Manager",
    description: "Find employees whose salary is greater than their manager.",
    difficulty: "Hard",
    question: "Write query using self join.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  manager_id INT,
  salary INT
);`,
    sampleData: `
INSERT INTO employees (id,name,manager_id,salary) VALUES
(1,'Manager',NULL,50000),
(2,'Emp1',1,60000);`,
  },
  {
    title: "Detect Duplicate Emails",
    description: "Find duplicate emails in users table.",
    difficulty: "Hard",
    question: "Write query to detect duplicates.",
    postgreSchema: `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100)
);`,
    sampleData: `
INSERT INTO users (email) VALUES
('a@test.com'),
('a@test.com'),
('b@test.com');`,
  },
  {
    title: "Pivot Department Salary",
    description: "Show total salary of IT and HR in separate columns.",
    difficulty: "Hard",
    question: "Write query using CASE WHEN.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  department VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (department, salary) VALUES
('IT',50000),
('HR',40000);`,
  },
  {
    title: "Employees With Consecutive IDs",
    description: "Find employees with consecutive IDs.",
    difficulty: "Hard",
    question: "Write query using LAG function.",
    postgreSchema: `
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);`,
    sampleData: `
INSERT INTO employees VALUES
(1,'A'),(2,'B'),(4,'C');`,
  },
  {
    title: "Top 2 Salaries Per Department",
    description: "Find top 2 highest salaries in each department.",
    difficulty: "Hard",
    question: "Write query using PARTITION BY.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  department VARCHAR(100),
  salary INT
);`,
    sampleData: `
INSERT INTO employees (department,salary) VALUES
('IT',50000),('IT',60000),('IT',70000);`,
  },
  {
    title: "Median Salary",
    description: "Find median salary.",
    difficulty: "Hard",
    question: "Write query using percentile_cont.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  salary INT
);`,
    sampleData: `
INSERT INTO employees (salary) VALUES
(10000),(20000),(30000);`,
  },
  {
    title: "Employees Not in Department Table",
    description: "Find employees whose department does not exist.",
    difficulty: "Hard",
    question: "Write query using NOT EXISTS.",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  department_id INT
);
CREATE TABLE departments (
  id SERIAL PRIMARY KEY
);`,
    sampleData: `
INSERT INTO employees (department_id) VALUES
(1),(2);
INSERT INTO departments (id) VALUES
(1);`,
  },
  {
    title: "Rank Employees by Salary",
    description: "Assign rank to employees based on salary.",
    difficulty: "Hard",
    question: "Write query using RANK().",
    postgreSchema: `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  salary INT
);`,
    sampleData: `
INSERT INTO employees (salary) VALUES
(50000),(60000),(70000);`,
  },
];

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const existing = await Assignment.countDocuments();
    if (existing > 0) {
      console.log("Assignments already exist. Skipping seed.");
      process.exit();
    }

    await Assignment.insertMany(questions);
    console.log("Questions Seeded Successfully");
    process.exit();
  } catch (error: any) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
