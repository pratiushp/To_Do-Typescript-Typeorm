import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class EmailMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  to!: string;

  @Column()
  subject!: string;

  @Column()
  message!: string;
}
