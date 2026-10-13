import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { TaskEntity } from '../../tasks/task.entity.js';
import { UserProfileEntity } from './index.js';

@Entity('t_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  email: string;

  @Column({name: 'passw'})
  passwordHash: string;

  @Column({name: 'refresh', nullable: true })
  hashedRefreshToken: string;

  
  @OneToOne(() => UserEntity, (user) => user.profile)
  profile: UserProfileEntity;

  @OneToMany(()=>UserEntity, user=>user.tasks)
  tasks: TaskEntity[];
}