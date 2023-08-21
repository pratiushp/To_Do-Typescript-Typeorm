import express, { Request, Response } from "express";
import {router} from "./routes/index"
import bodyParser from "body-parser";
import { AppDataSource } from "./dataSource";


const app = express();
const PORT = 3000;


app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

   
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

    //handle 404 not found error
app.use((req: Request, res: Response) => {
  res.status(404).json("404 Not Found Endpoint");
    })

    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`);
    });