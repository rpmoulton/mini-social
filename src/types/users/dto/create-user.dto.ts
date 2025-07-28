export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly profile_picture_url?: string;
  readonly bio?: string;
}
