import sequelize from "../Db/db";
import { DataTypes } from "sequelize";

const Menu  = sequelize.define('Menu',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    description:{
        type:DataTypes.TEXT
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING
    },
    img_url:{
        type:DataTypes.STRING
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }

})

export default Menu;