import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "../Entities/User";
import { base } from "./BaseEntity";

@Entity()
export class Task  extends base {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    task_name!: string;

    // @ManyToOne(() => User, (user) => user.task)
    // // @JoinColumn()
    // userAdmin!: User;


    @ManyToOne(() => User, (user) => user.task)
    // @JoinColumn()
    userAssignedBy!: User;
    @ManyToOne(() => User, (user) => user.taskAssignedBy)
    // @JoinColumn()
    userAssignedTo!: User;
    // @OneToOne(() => User)
    // @JoinColumn()
    // assigned_to!: number; 
}
