import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";

export const loginComponent = async (req, res) => {
  try{
      const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required !" });
  }
  const user = await User.findOne({where:{email}})

  if(!user){
    return res.status(404).json({message:"User not found !"});
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
    return res.status(401).json({message:"Invalid credentials !"})
  }

  return res.status(200).json({message:"Loggin successfully!"})
  }
  catch(error){
    return res.status(500).json({message:"server error",err});
  }
};

export const RegisterComponent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required !" });
    }
    
    const hashedPassword =await bcrypt.hash(password,10);

    const newUser = await User.create({
      email,
      password:hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "User registered successfully", newUser });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Server error", error });
  }
};
