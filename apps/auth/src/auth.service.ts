import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/user.enity';
import { Repository } from 'typeorm';
import { CreateSignupInput, LoginInput } from './user/user.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { TokenType, UserType } from './user/user.type';
enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async signup(createUser: CreateSignupInput): Promise<TokenType> {
    const existingStudent = await this.userRepository.findOne({
      where: {
        email: createUser.email,
      },
    });
    if (existingStudent) throw new ConflictException('User already exists');
    const password = await this.hashPassword(createUser.password);
    const user = this.userRepository.create({
      name: createUser.name,
      email: createUser.email,
      password,
    });
    await this.userRepository.save(user);
    const token = await this.createToken(user.id, user.role);
    return {
      access_token: token,
    };
  }
  async login(loginInput: LoginInput): Promise<TokenType> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginInput.email,
      },
    });
    if (!user) throw new ConflictException('User does not exist');
    const isPasswordValid = await this.comparePasswords(
      loginInput.password,
      user.password,
    );
    if (!isPasswordValid) throw new ConflictException('Invalid credentials');
    const token = await this.createToken(user.id, user.role);
    return {
      access_token: token,
    };
  }
  async user(id: string): Promise<UserType> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  private async comparePasswords(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
  private async createToken(userId: string, userRole: Role): Promise<string> {
    const expiresIn = 60 * 60; // an hour
    const secret = 'mysupersecret';
    const dataStoredInToken = {
      id: userId,
      role: userRole,
    };
    return jwt.sign(dataStoredInToken, secret, { expiresIn });
  }
  async getAllUsers(): Promise<UserType[]> {
    return await this.userRepository.find();
  }
}
