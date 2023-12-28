"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./entity/users.entity");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.createUserRecord();
    }
    async createUserRecord() {
        let find = await this.userRepository.find();
        if (find.length == 0) {
            let users = [
                {
                    email: 'hectorbarbossa@pirates.com',
                    password: 'Pass@user7'
                },
                {
                    email: 'jacksparrow@pirates.com',
                    password: 'Pass@user8'
                },
                {
                    email: 'blackbeard@pirates.com',
                    password: 'Pass@user8'
                }
            ];
            for (let i = 0; i <= users.length - 1; i++) {
                const created = await this.userRepository.create(users[i]);
                const saved = await this.userRepository.save(created);
            }
        }
    }
    async create(createAuthDto) {
        try {
            const email = createAuthDto.email;
            const password = createAuthDto.password;
            let found = await this.userRepository.findOne({ where: { email, password } });
            if (!found) {
                throw new common_1.NotFoundException("User not found");
            }
            let payload = {
                id: found.id,
                email: found.email
            };
            let accessToken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SCRET, { expiresIn: '1h' });
            let token = {
                accessToken: accessToken,
                expiresIn: '1h'
            };
            return token;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map