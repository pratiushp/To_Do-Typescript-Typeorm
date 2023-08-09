import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    task_name!: string;

    @Column()
    assigned_by!: string;

    @Column()
    assigned_to!: string;
}
