import { CreateloginDto } from './dto/create-auth.dto';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<Users>);
    createUserRecord(): Promise<void>;
    create(createAuthDto: CreateloginDto): Promise<{
        accessToken: string;
        expiresIn: string;
    }>;
}
