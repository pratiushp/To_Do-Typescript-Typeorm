import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm";
import { Role } from "./Role";
import { Task } from "./Task";
import { base } from "./BaseEntity";
import { Upload } from "./Upload"; // Import the Upload entity
import { TaskFile } from "./taskFile";

@Entity()
export class User extends base {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;
    
    @Column()
    password!: string;
    
    @Column({ nullable: true })
    resetToken!: string;

    @OneToMany(() => Task, (task) => task.userAssignedBy)
    task!: Task[];

    @OneToMany(() => Task, (task) => task.userAssignedTo)
    taskAssignedBy!: Task[];

    @ManyToMany(() => Role, { eager: true })
    @JoinTable()
    role!: Role[];
    
    @Column({ default: true })
    status!: boolean;
}
