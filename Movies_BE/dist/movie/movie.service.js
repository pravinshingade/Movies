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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../abstract/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const path = require("path");
const movie_entity_1 = require("./enity/movie.entity");
const core_1 = require("@nestjs/core");
const DATA_FILE_PATH = path.resolve(process.cwd(), 'public', 'movies.json');
let MovieService = class MovieService extends base_service_1.BaseService {
    constructor(request, movieRepository) {
        super();
        this.request = request;
        this.movieRepository = movieRepository;
    }
    async create(createMovieDto, poster) {
        try {
            let token = this.request.headers.authorization;
            let request = this._decodeUserToken(token);
            console.log("🚀 ~ file: movie.service.ts:44 ~ MovieService ~ create ~ request:", request);
            const created = this.movieRepository.create({ ...createMovieDto, poster: poster.buffer, users: request.id });
            const save = await this.movieRepository.save(created);
            return save;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async findAll(page, itemsPerPage) {
        let token = this.request.headers.authorization;
        let request = this._decodeUserToken(token);
        const users = request.id;
        const queryBuilder = this.movieRepository.createQueryBuilder('movie');
        queryBuilder.leftJoinAndSelect('movie.users', 'users');
        queryBuilder.andWhere('movie.users = :users', { users });
        const offset = (page - 1) * itemsPerPage;
        queryBuilder.skip(offset).take(itemsPerPage);
        try {
            const [movies, total] = await queryBuilder.getManyAndCount();
            return {
                page: page,
                totalSize: total,
                data: movies
            };
        }
        catch (error) {
            throw new common_1.NotFoundException('Movies not found');
        }
    }
    async findOne(id) {
        try {
            const queryBuilder = this.movieRepository.createQueryBuilder('movie');
            queryBuilder.andWhere('movie.id = :id', { id });
            let movie = await queryBuilder.getOne();
            return movie;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async update(id, updateMovieDto) {
        try {
            const existingMovie = await this.findOne(id);
            if (!existingMovie) {
                throw new common_1.NotFoundException(`Movie with ID ${id} not found`);
            }
            const updatedMovie = await this.movieRepository.save({
                ...existingMovie,
                ...updateMovieDto,
            });
            let update = await this.findOne(id);
            return update;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async remove(id) {
        try {
            const found = await this.findOne(id);
            await this.movieRepository.delete(id);
            return found;
        }
        catch (error) {
        }
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __param(1, (0, typeorm_2.InjectRepository)(movie_entity_1.MovieRecord)),
    __metadata("design:paramtypes", [Object, typeorm_1.Repository])
], MovieService);
//# sourceMappingURL=movie.service.js.map