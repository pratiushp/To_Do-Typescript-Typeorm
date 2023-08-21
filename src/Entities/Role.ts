import { Entity, Column, PrimaryGeneratedColumn,  ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { User } from "./User";
import { base } from "./BaseEntity";
// import { base } from "./BaseEntity";


@Entity()
export class Role  extends base{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    role_name!: String;

    // @ManyToMany(() => User,{eager:true})
    // // @JoinTable()
    //  user! : User[]
    
}
