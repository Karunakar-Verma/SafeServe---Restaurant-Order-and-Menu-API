import { Sequelize } from "sequelize";

const sequelize = new Sequelize('safeservedb', 'root', 'root', {
  host: 'localhost',
  dialect: "mysql"
});

export default sequelize;