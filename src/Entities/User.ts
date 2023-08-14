import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import { Role } from "./Role";
import { Task } from "./Task";

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
    
    // @Column()
    // resetToken!: string;

    @OneToMany(() => Task, (task) => task.user)
    task!: Task[];

    @OneToMany(() => Task, (task) => task.userAssignedBY)
    taskAssignedBy!: Task[];


    @ManyToMany(() => Role,{eager:true})
    @JoinTable()
     role! : Role[]

  
}
