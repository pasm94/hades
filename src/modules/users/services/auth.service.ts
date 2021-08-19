import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export interface UserData {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async authenticate(email: string, password: string): Promise<UserData> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        'Email or password incorrect!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException(
        'Email or password incorrect!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = sign({}, '36v90xkwbv7409wkvnbxle65gh5892nv60', {
      subject: String(user.id),
      expiresIn: '1d', // 1 day
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
