import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Grabit API Running");
});

app.post("/register" , async  (req, res)=>{


  try {

     const {name , email , password} = req.body;
    const user  = new User({

        name, email, password
    });
    await user.save();
     return res.status(201).json({
      message: "Registration successful",
    });
    
  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Registration failed",
    });
    
  }

   
});




app.post("/login" , async  (req, res)=>{


  try {

     const { email, password } = req.body;

  const user = await User.findOne({ email });


    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

      if (user.password !== password) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

  return res.status(200).json({
    message:"Login successfull"
  })

    
  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Login failed",
    });
    
  }

   
});

export default app;



