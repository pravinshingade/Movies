import { CreateMovieDto } from './dto/create-movie.dto';
import { BaseService } from 'src/abstract/base.service';
import { Repository } from 'typeorm';
import { MovieRecord } from './enity/movie.entity';
import { Request } from 'express';
export declare class MovieService extends BaseService {
    private readonly request;
    private readonly movieRepository;
    constructor(request: Request, movieRepository: Repository<MovieRecord>);
    create(createMovieDto: CreateMovieDto, poster: any): Promise<MovieRecord>;
    findAll(page: number, itemsPerPage: number): Promise<{
        page: number;
        totalSize: number;
        data: MovieRecord[];
    }>;
    findOne(id: any): Promise<MovieRecord>;
    update(id: string, updateMovieDto: any): Promise<MovieRecord>;
    remove(id: string): Promise<MovieRecord>;
}
