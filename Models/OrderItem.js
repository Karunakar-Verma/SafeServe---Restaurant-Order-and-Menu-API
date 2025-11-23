import sequelize from "../Db/db.js";
import { DataTypes } from "sequelize";
import Menu from "./MenuModel.js";

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  menu_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Menu,
      key: "id",
    },
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default OrderItem;
