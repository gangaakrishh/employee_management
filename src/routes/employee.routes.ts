import { Router } from "express";
import { 
  createEmployee, 
  getEmployeeById, 
  getEmployeeList, 
  updateEmployee, 
  deleteEmployee 
} from "../controllers/employee.controller";

const router = Router();

/**
 * @swagger
 * /api/employee:
 *   post:
 *     summary: Create an Employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - department
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               department:
 *                 type: string
 *                 enum: [HR, Engineering, Marketing, Sales, Finance, Other]
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", createEmployee);

/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Get Employee By ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       404:
 *         description: Employee not found
 */
router.get("/:id", getEmployeeById);

/**
 * @swagger
 * /api/employee:
 *   get:
 *     summary: Get Employee List
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 */
router.get("/", getEmployeeList);

/**
 * @swagger
 * /api/employee/{id}:
 *   put:
 *     summary: Update Employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               department:
 *                 type: string
 *                 enum: [HR, Engineering, Marketing, Sales, Finance, Other]
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 */
router.put("/:id", updateEmployee);

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Delete Employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", deleteEmployee);

export default router;
