import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ name, email, password }: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.usersRepository.find({
      order: { id: 'DESC' },
    });

    return allUsers;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  async update(id: number, userUpdateDto: UpdateUserDto): Promise<void> {
    const { email, password } = userUpdateDto;

    const userAlreadyExists = await this.usersRepository.findOne({ email });

    if (userAlreadyExists && userAlreadyExists.id !== id) {
      throw new HttpException(
        'Another user already use this email!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (password) {
      const passwordHash = await hash(password, 8);
      userUpdateDto.password = passwordHash;
    }

    await this.usersRepository.update(id, userUpdateDto);
  }

  remove(id: number): void {
    this.usersRepository.delete(id);
  }
}
