import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../users/entities/user.entity.js";


@Entity('t_tasks')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'task_text'})
    text: string;

    @Column({name: 'task_completed'})
    completed: boolean;

    @ManyToOne(() => UserEntity, user => user.tasks)
    author: UserEntity;
}