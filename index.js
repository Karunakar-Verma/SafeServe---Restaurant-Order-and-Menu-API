import express from "express";
import sequelize from "./Db/db.js";
import { loginComponent } from "./Controllers/UserController.js";
import { RegisterComponent } from "./Controllers/UserController.js";
import { getMenu, createMenu,updateMenu,deleteMenu} from "./Controllers/MenuController.js";
const app = express();
app.use(express.json());



// // testing database connection

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

await sequelize.sync(); // ye table auto create krega

//User Login
app.post('/api/auth/login',loginComponent);
app.post('/api/auth/register',RegisterComponent);

//MenuController
app.get('/api/menu',getMenu);
app.post('/api/menu',createMenu);
app.get('/api/menu/:id', getMenu);
app.put('/api/menu/:id',updateMenu);
app.delete('/api/menu/:id',deleteMenu)


const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})