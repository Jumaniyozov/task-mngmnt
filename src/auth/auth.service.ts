import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository
  ) {
  }
}
