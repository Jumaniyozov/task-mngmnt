import { Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }


  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const username = await this.userRepository.validateAuthCredentials(authCredentialsDto);

    if(!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {username};
    const accessToken = await this.jwtService.sign(payload);

    return {accessToken};
  }
}
