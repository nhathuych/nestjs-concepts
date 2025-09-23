import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { RolesGuard } from './guards/roles-guard';
import { LoginThrottlerGuard } from './guards/login-throttler.guard';

@Controller({ path: 'auth', version: '1' }) // /api/v1/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(LoginThrottlerGuard) // Lock login for 1 minute after 5 failed attempts
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@CurrentUser() user: any) {
    return user;
  }

  @Post('create-admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createAdmin(@Body() registerDto: RegisterDto) {
    return this.authService.createAdminUser(registerDto);
  }
}
