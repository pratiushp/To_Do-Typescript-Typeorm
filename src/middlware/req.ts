import { User } from '../Entities/User';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
