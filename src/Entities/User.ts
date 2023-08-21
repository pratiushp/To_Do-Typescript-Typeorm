import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import { Role } from "./Role";
import { Task } from "./Task";
import { base } from "./BaseEntity";

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
    
    @Column({nullable: true})
    resetToken!: string;

    @OneToMany(() => Task, (task) => task.userAssignedBy)
    task!: Task[];

    @OneToMany(() => Task, (task) => task.userAssignedTo)
    taskAssignedBy!: Task[];

    @ManyToMany(() => Role,{eager:true})
    @JoinTable()
    role!: Role[]
    
    @Column({default: true})
    status!: boolean
    
    
}
