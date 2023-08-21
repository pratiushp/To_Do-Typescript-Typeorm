import { DataSource } from "typeorm";
import { Role } from "./Entities/Role";
import { User } from "./Entities/User";
import { Task } from "./Entities/Task";
import { EmailMessage } from "./Entities/Email";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Kathmandu1#",
    database: "application",
    synchronize: true,
   
    entities: [Role, User, Task, EmailMessage],
    
    // logging: false,
})
