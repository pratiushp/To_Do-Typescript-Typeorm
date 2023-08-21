import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { base } from "./BaseEntity";

@Entity()
export class EmailMessage extends base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  to!: string;

  @Column()
  subject!: string;

  @Column()
  message!: string;
}
