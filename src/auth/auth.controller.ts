// auth/auth.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Step 1: Redirect to Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport redirects automatically
  }

  // Step 2: Google callback URL
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    // req.user is set by the strategy
    return this.authService.generateToken(req.user);
  }
}
