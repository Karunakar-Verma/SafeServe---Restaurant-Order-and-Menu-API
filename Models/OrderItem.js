import sequelize from "../Db/db";
import { DataTypes } from "sequelize";
import Menu from "./MenuModel";

const OrderItem = sequelize.define('OrderItem',{
    id:{
        type:DataTypes.INTEGER
    },
    order_id:{
        type:DataTypes.INTEGER
    },
    menu_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Menu,
            key:id
        }
    },
    quantity:{
        type:DataTypes.INTEGER
    }
})

export default OrderItem;