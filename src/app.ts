
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Role } from "./Entities/Role"
import { User } from "./Entities/User"
import {router} from "./routes/authRoute"
import bodyParser from "body-parser";
import { Task } from "./Entities/Task";
import { EmailMessage } from "./Entities/Email";


const app = express();
const PORT = 3000;

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Kathmandu1#",
  database: "Application",
  synchronize: false,
 
  entities: [Role, User, Task, EmailMessage],
  
  // logging: false,
  
  }
)
  .then(async () => {
    console.log("Database Connected");
    })
   .catch((error) => {
      console.error("Error in Connecting Database:", error);
   });
   
   app.use(bodyParser.json())
    
   app.use("/", router)

    app.get("/", async (_req: Request, res: Response) => {
    
      res.json("Application Get")
    });

    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`);
    });
 
