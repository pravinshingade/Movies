/// <reference types="multer" />
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    create(createMovieDto: CreateMovieDto, poster: Express.Multer.File): Promise<import("./enity/movie.entity").MovieRecord>;
    findAll(page: any, itemsPerPage: any): Promise<{
        page: number;
        totalSize: number;
        data: import("./enity/movie.entity").MovieRecord[];
    }>;
    update(id: string, updateMovieDto: UpdateMovieDto, poster: Express.Multer.File): Promise<import("./enity/movie.entity").MovieRecord>;
    remove(id: string): Promise<import("./enity/movie.entity").MovieRecord>;
}
