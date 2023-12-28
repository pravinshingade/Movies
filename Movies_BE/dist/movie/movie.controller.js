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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const update_movie_dto_1 = require("./dto/update-movie.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async create(createMovieDto, poster) {
        return await this.movieService.create(createMovieDto, poster);
    }
    async findAll(page, itemsPerPage) {
        return await this.movieService.findAll(page, itemsPerPage);
    }
    async update(id, updateMovieDto, poster) {
        const updates = { ...updateMovieDto, poster: poster ? poster.buffer : undefined };
        return await this.movieService.update(id, updates);
    }
    async remove(id) {
        return await this.movieService.remove(id);
    }
};
exports.MovieController = MovieController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('poster')),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDto, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('itemsPerPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('poster')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_movie_dto_1.UpdateMovieDto, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "remove", null);
exports.MovieController = MovieController = __decorate([
    (0, common_1.Controller)('movie'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
//# sourceMappingURL=movie.controller.js.map