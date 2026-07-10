import { CreationAttributes, FindOptions, Model, ModelStatic, WhereOptions } from "sequelize";
import errorMessage from "../lang/error.message";
import { HttpError } from "../utils/error.response";

export class DataService<T extends Model> {
  private model: ModelStatic<T>;
  private include: FindOptions["include"];

  constructor(model: ModelStatic<T>, include: FindOptions["include"] = []) {
    this.model = model;
    this.include = include;
  }

  async list(
    where: WhereOptions = {},
    page: number = 1,
    limit: number | "inf" = 10,
    order: FindOptions["order"] = [["id", "asc"]]
  ): Promise<{ data: T[]; count: number }> {
    try {
      if (limit != "inf") {
        limit = Number(limit);
      }
      const { rows, count } = await this.model.findAndCountAll({
        where,
        include: this.include,
        limit: limit !== "inf" ? limit : undefined,
        offset: limit !== "inf" ? (page - 1) * limit : undefined,
        order,
      });
      return { data: rows as T[], count };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async get(where: WhereOptions = {}, order: [string, string][] = [["id", "ASC"]]): Promise<T | null> {
    try {
      const result = await this.model.findOne({
        where,
        include: this.include,
        order,
      });
      return result as T | null;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(body: CreationAttributes<T>): Promise<T> {
    try {
      return (await this.model.create(body)) as T;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(where: WhereOptions, body: Partial<T>): Promise<T> {
    try {
      const result = await this.model.findOne({ where });
      if (result) {
        Object.assign(result, body);
        const res = await result.save();
        return res as T;
      } else {
        throw new HttpError(errorMessage.ID_FOUND, 404);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(where: WhereOptions) {
    try {
      const result = await this.model.findOne({ where });
      if (result) {
        return await this.model.destroy({ where });
      } else {
        throw new HttpError(errorMessage.ID_FOUND, 404);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
