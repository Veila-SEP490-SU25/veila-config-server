import { AuthService } from "@/app/auth/auth.service";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Auth Controller')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}