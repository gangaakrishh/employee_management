import { z } from "zod";

const DepartmentEnum = z.enum(["HR", "Engineering", "Marketing", "Sales", "Finance", "Other"]);
const StatusEnum = z.enum(["active", "inactive"]);

export const EmployeeCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is required and valid"),
  department: DepartmentEnum,
  status: StatusEnum,
});

export const EmployeeUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email("Invalid email format").optional(),
  department: DepartmentEnum.optional(),
  status: StatusEnum.optional(),
});

export type EmployeeCreateDTO = z.infer<typeof EmployeeCreateSchema>;
export type EmployeeUpdateDTO = z.infer<typeof EmployeeUpdateSchema>;
