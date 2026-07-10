import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import successMessage from "../lang/success.message";
import errorMessage from "../lang/error.message";
dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
});

const seqelizeConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log(successMessage.CONNECTION_SUCCESS);
  } catch (error) {
    console.error(errorMessage.CONNECTION_ERROR, error);
  }
};

// seqelizeConnect();

export default sequelize;
