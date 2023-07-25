import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import AuthCreadentialsDto from './dto/auth-credentials.dto';
import IJwtPayload from './payloads/jwt-payload';
import TokenResponseDto from './dto/token-response.dto';
import { validatePassword } from '../../common/helper/bcrypt';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { AuthMessage } from './auth.constants';
import { IUsers } from '../users/interface/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign in an user.
   * @param authCredentialsDto AuthCredentialsDto.
   */
  async signIn(
    authCredentialsDto: AuthCreadentialsDto,
  ): Promise<TokenResponseDto> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.getByEmail(email);

    // If user with email exist and the password is valid.
    if (user && (await validatePassword(password, user.password))) {
      const payload: IJwtPayload = { email, id: user.id };
      const jwtAccessToken = await this.jwtService.signAsync(payload);

      return {
        jwtAccessToken,
        user: {
          _id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      };
    }
    throw new BadRequestException(AuthMessage.INVALID_CREDENTIALS);
  }

  /**
   * Sign up an user.
   */
  async signUp(createUsersDto: CreateUsersDto) {
    return this.usersService.signUp(createUsersDto);
  }
}
