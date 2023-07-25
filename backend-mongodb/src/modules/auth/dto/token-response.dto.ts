export class UserResponseDto {
  _id: string;
  email: string;
  fullName: string;
}

export default class TokenResponseDto {
  jwtAccessToken: string;
  user: UserResponseDto;
}
