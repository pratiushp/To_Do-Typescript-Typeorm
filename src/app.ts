
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import "./Entities"


const app = express();
const PORT = 3000;

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Kathmandu1#",
  database: "Application",
  synchronize: true,
  entities: ["./Entities"],
  
  logging: false,
  
  }
)
  .then(async (connection) => {
    console.log("Database Connected");
    })
   .catch((error) => {
      console.error("Error in Connecting Database:", error);
    });

    app.get("/", async (_req: Request, res: Response) => {
    
      res.json("Application Get")
    });

    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`);
    });
 
