import { AuthService } from './auth.service';
import { CreateloginDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateloginDto): Promise<{
        accessToken: string;
        expiresIn: string;
    }>;
}
