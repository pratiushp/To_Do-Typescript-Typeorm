import express, { Request, Response } from "express";
import {router} from "./routes/index"
import bodyParser from "body-parser";
import { AppDataSource } from "./dataSource";
import ErrorHandler from "./utils/ErrorHandler";
// import fileUpload from "express-fileupload"
import { errorConverter, notFound } from "./utils/error";
import ApiError from "./utils/apiError";


const app = express();
const PORT = 3000;


app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload())

   
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
// app.use((req: Request, res: Response) => {
//   res.status(404).json("404 Not Found Endpoint");
// })
    

app.use(notFound)
// app.use(ErrorHandler);
app.use(errorConverter);


    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`);
    });