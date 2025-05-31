import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('profile')
@ApiTags('Profile Controller')
export class ProfileController {}