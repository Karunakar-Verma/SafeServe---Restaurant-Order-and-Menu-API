import sequelize from "../Db/db";
import { DataTypes } from "sequelize";
import User from "./UserModel";

const Order = sequelize.define('Order',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:id
        },
        allowNull:false
    },
    status:{
        type:DataTypes.STRING
    },
    total:{
        type:DataTypes.INTEGER
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }

})

export default Order;