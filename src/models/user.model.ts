// import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { IsEmail, Length } from "class-validator"

// // user.model.ts
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;
  
//     @Column('text')
//     name: string;
  
//     @Column({
//       unique: true
//     })
//     @Length(5, 100)
//     @IsEmail()
//     email: string;
  
//     @Column()
//     hashedPassword: string;
  
//     @CreateDateColumn()
//     createdAt: Date;
  
//     @UpdateDateColumn()
//     updatedAt: Date;
  
//     /* eslint-disable */
//     @OneToMany(type => Book, book => book.user)
//     books: Book[];
//   }
  