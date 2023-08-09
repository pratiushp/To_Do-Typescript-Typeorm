// import "reflect-metadata";
// import { createConnection, getConnection, Connection } from "typeorm";
// import { User } from "./User";
// import { Role } from "./Role";

// async function main() {
//     // Establish a database connection
//     createConnection({
//         type: "mysql",
//         host: "localhost",
//         port: 3306,
//         username: "root",
//         password: "Kathmandu1#",
//         database: "Application",
//         synchronize: true,
//         entities: ["./Entities/Role.ts"],
//         logging: false,
        
//         }
//       )
//         .then(async (connection) => {
//           console.log("Database Connected");
//         })
//         .catch((error) => {
//             console.error("Error in Connecting Database:", error);
//           });
      

//     // Repository instances for User and Role
//     // const user = connection.getRepository(User);
//     // const roleRepository = connection.getRepository(Role);

   
// }

// main();
