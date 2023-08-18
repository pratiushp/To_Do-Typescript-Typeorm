import express, { Request, Response } from "express";
import {router} from "./routes/index"
import bodyParser from "body-parser";
import { AppDataSource } from "./dataSource";


const app = express();
const PORT = 3000;


app.use(bodyParser.json())

   
AppDataSource.initialize()
.then(() => {
    console.log("Database Connected")
})
.catch((err) => {
    console.error("Error in connecting database ")
})
    
   app.use("/", router)

    app.get("/", async (req: Request, res: Response) => {
    
      res.json("Application Get")
    });

    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`);
    });

//handle 404 not found error

 
