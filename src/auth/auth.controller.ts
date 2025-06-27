// auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Step 1: Redirect to Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport redirects automatically
    console.log('Redirecting to Google for authentication...');
  }

  // Step 2: Google callback URL
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // req.user is set by the strategy
    const token = this.authService.generateToken(req.user);
    // res.cookie('access_token', token, {
    //   httpOnly: true,
    //   secure: false, // true in production with HTTPS
    //   sameSite: 'lax',
    // });

    //   res.send(`
    //   <html>
    //     <body>
    //       <script>
    //         window.opener.postMessage(${JSON.stringify({
    //           token,
    //         })}, "http://localhost:3000");
    //         window.close();
    //       </script>
    //       <p>Logging in...</p>
    //     </body>
    //   </html>
    // `);

    // return res.redirect('http://localhost:3000');
    return { token };
  }
}
