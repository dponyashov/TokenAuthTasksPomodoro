import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { UserEntity } from "./index.js";
// import { UserEntity } from "./user.entity.js";
// import { UserEntity } from "./index.js";

@Entity('t_profile')
export class UserProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;
      
    @Column({unique: true })
    email: string;

    @Column({name: 'first_name'})
    firstName: string;
    
    @Column({name: 'last_name'})
    lastName: string;

    // @OneToOne(()=>UserProfileEntity, (profile) => profile.user)
    @OneToOne('UserEntity', 'user', {cascade: true})
    @JoinColumn() // Обязательно только на владеющей стороне!
    user: any; // UserEntity;
}