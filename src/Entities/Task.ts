import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "../Entities/User";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    task_name!: string;

    // @ManyToOne(() => User, (user) => user.task)
    // // @JoinColumn()
    // userAdmin!: User;


    @ManyToOne(() => User, (user) => user.task)
    // @JoinColumn()
    user!: User;
    @ManyToOne(() => User, (user) => user.taskAssignedBy)
    // @JoinColumn()
    userAssignedBY!: User;
    // @OneToOne(() => User)
    // @JoinColumn()
    // assigned_to!: number; 
}
