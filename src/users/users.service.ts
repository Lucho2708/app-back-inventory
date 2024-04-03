import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async createUser(user: CreateUserDto) {
    try {
      const userFound = await this.userRepository.findOneOrFail({
        where: {
          email: user.email
        }
      });
      return new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    } catch (error) {

      const newUser = this.userRepository.create(user);
      return this.userRepository.save(newUser);
    }
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    try {
      return await this.userRepository.findOneOrFail({
        where:{
          id,
        }
      });
    } catch (error) {
      
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async deleteUser(id: number) {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return result;
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async updateUser(id: number, user: UpdateUserDto) {
    try {
      const result = await this.userRepository.update(id, user);
      if (result.affected === 0) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return result;
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}