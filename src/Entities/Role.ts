import { Entity, Column, PrimaryGeneratedColumn,  ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { User } from "./User";

@Entity()
export class Role  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    role_name!: string;
    
    
    @ManyToMany(() => User)
    @JoinTable()
   users! : User[]
}
