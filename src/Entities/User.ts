import { Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import { Role } from "./Role";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;


}
