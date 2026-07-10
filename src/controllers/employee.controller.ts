import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";

import { successResponse } from "../utils/success.response";
import successMessage from "../lang/success.message";


export const getEmployeeList = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const employeeService = new EmployeeService();
    const { data, count } = await employeeService.getEmployeeList(req.query);

    successResponse(res, {
      message: successMessage.EMPLOYEE_LIST,
      data,
      count
    });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const getEmployeeById = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const employeeService = new EmployeeService();
    const employee = await employeeService.getEmployeeById(req.params.id);

    successResponse(res, {
      message: successMessage.EMPLOYEE_GET,
      data: employee,
    });
  } catch (error: any) {
    throw new Error(error);
  }

});

export const createEmployee = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const employeeService = new EmployeeService();
    const newEmployee = await employeeService.createEmployee(req.body);

    successResponse(res, {
      message: successMessage.EMPLOYEE_CREATE,
      data: newEmployee
    });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const updateEmployee = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const employeeService = new EmployeeService();
    const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);

    successResponse(res, {
      message: successMessage.EMPLOYEE_UPDATE,
      data: updatedEmployee,
    });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const deleteEmployee = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const employeeService = new EmployeeService();
    await employeeService.deleteEmployee(req.params.id);

    successResponse(res, {
      message: successMessage.EMPLOYEE_DELETE,

    });
  } catch (error: any) {
    throw new Error(error);
  }
});
