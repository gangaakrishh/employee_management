import Employee from "../models/employee.model";
import { DataService } from "./service";
import { HttpError } from "../utils/error.response";
import errorMessage from "../lang/error.message";
import { EmployeeCreateSchema, EmployeeUpdateSchema } from "../dtos/employee.dto";

export class EmployeeService extends DataService<Employee> {
  constructor() {
    super(Employee);
  }

  async getEmployeeList(query: any) {
    let { page, order = "created_at,desc", limit, ...where }: { [key: string]: any } = { ...query };

    if (order.length) {
      order = [order?.split(",")];
    }
    return await this.list({ ...where }, Number(page), Number(limit), order);
  }

  async getEmployeeById(id: string) {
    const employee = await this.get({ id });
    if (!employee) {
      throw new HttpError(errorMessage.ID_FOUND, 404);
    }
    return employee;
  }

  async createEmployee(data: any) {
    const parsed = EmployeeCreateSchema.safeParse(data);
    if (!parsed.success) {
      throw new HttpError(parsed.error.message, 400);
    }
    const existingEmployee = await this.get({ email: data.email });
    if (existingEmployee) {
      throw new HttpError("Email already in use", 400);
    }
    const newEmployee = await this.create(data);
    return newEmployee;
  }

  async updateEmployee(id: string, data: any) {
    const parsed = EmployeeUpdateSchema.safeParse(data);
    if (!parsed.success) {
      throw new HttpError(parsed.error.message, 400);
    }
    const updatedEmployee = await this.update({ id }, data);
    if (!updatedEmployee) {
      throw new HttpError(errorMessage.ID_FOUND, 404);
    }
    return updatedEmployee;
  }

  async deleteEmployee(id: string) {
    return await this.delete({ id });
  }
}
