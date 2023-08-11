import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, IntegerType } from "typeorm";
import {User} from "../Entities/User"

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    task_name!: string;

    @OneToOne(() => User)
    @JoinColumn()
    assigned_by!: User

    @OneToOne(() => User)
    @JoinColumn()
    assigned_to!:  User



}
