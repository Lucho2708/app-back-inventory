export class UpdateUserDto {
    name?: string
    email?: string
    password?: string
    updated_at: Date = new Date();
}