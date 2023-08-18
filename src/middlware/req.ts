// import { User } from '../Entities/User';

import { User } from "../Entities/User";
// import { Request } from "express";

declare module 'express' {
  interface Request {
    user?: User;
  }
}


// export interface ReqUser<p,q,r,s> extends Request<p,q,r,s>{
//   user?: User;
// }