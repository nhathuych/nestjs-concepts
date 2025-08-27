import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../users/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async register(registerDto: RegisterDto) {
    return this.createUser(registerDto, UserRole.USER);
  }

  async createAdminUser(registerDto: RegisterDto) {
    return this.createUser(registerDto, UserRole.ADMIN);
  }

  private async createUser(registerDto: RegisterDto, role: UserRole) {
    const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
    if (existingUser) throw new ConflictException('Email already in use. Please use a different email.');

    const hashedPassword = await this.hashPassword(registerDto.password);
    const newUser = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      fullName: registerDto.fullName,
      role,
    });

    const savedUser = await this.userRepository.save(newUser);
    const { password, ...userWithoutPassword } = savedUser;

    return { user: userWithoutPassword, message: `User with role [${role}] created successfully.` };
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
