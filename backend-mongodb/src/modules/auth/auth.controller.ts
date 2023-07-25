import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import AuthCreadentialsDto from './dto/auth-credentials.dto';

import { AuthSummary } from './auth.constants';
import TokenResponseDto from './dto/token-response.dto';
import { ResponseUsersDto } from '../users/dto/response-users.dto';
import { CreateUsersDto } from '../users/dto/create-users.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: AuthSummary.SIGN_IN_SUMMARY })
  async signIn(
    @Body() authCredentialsDto: AuthCreadentialsDto,
  ): Promise<TokenResponseDto> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/signUp')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ResponseUsersDto })
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.authService.signUp(createUsersDto);
  }
}
