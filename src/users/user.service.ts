import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/users.entity';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<[Boolean, String?]> {
    // check new user
    // create user & hash password

    try {
      const exists = await this.users.findOne({ email });

      if (exists) {
        return [false, 'There is a user with that email already'];
      }

      await this.users.save(this.users.create({ email, password, role }));

      return [true];
    } catch (e) {
      return [false, "Couldn't create account"];
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: Boolean; error?: String; token?: String }> {
    try {
      const user = await this.users.findOne({ email });

      if (!user) {
        return { ok: false, error: 'User not found' };
      }

      const passwordCorrect = await user.checkPassword(password);

      if (!passwordCorrect) {
        return { ok: false, error: 'Wrong password' };
      }

      const token = this.jwtService.sign(user.id);

      return { ok: true, token };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById(id: number) {
    return this.users.findOne({ id });
  }
}
