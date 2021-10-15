import { Entity, BaseEntity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserE extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_user:number;
    
    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}