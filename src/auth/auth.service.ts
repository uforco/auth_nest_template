// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: any) {
    const payload = { sub: user.email, name: user.firstName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
