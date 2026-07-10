import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../configs/db.config";

interface EmployeeAttributes {
  id: bigint;
  name: string;
  email: string;
  department: 'HR' | 'Engineering' | 'Marketing' | 'Sales' | 'Finance' | 'Other';
  status: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
}

interface EmployeeCreationAttributes
  extends Optional<
    EmployeeAttributes,
    | "id"
    | "email"
    | "department"
    | "status"
    | "created_at"
    | "updated_at"
  > { }

export class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  public id!: bigint;
  public name!: string;
  public email!: string;
  public department!: 'HR' | 'Engineering' | 'Marketing' | 'Sales' | 'Finance' | 'Other';
  public status!: 'active' | 'inactive';
  public created_at!: Date;
  public updated_at!: Date;
}

Employee.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM('HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Other'),
      allowNull: false,
      defaultValue: 'Other',
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "employees",
    timestamps: false,
  }
);

export default Employee;
