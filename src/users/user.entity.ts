import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column({nullable: true})
    email_verified_at: Date

    @Column()
    password: string

    @Column({nullable: true})
    remember_token: string

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date
}
