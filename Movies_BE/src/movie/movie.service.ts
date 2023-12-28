import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { BaseService } from 'src/abstract/base.service';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as fs from 'fs';
import * as path from 'path';
import { MovieRecord } from './enity/movie.entity';
import { FILE } from 'dns';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

const DATA_FILE_PATH = path.resolve(process.cwd(), 'public', 'movies.json');

@Injectable()
export class MovieService extends BaseService {
  // private movies: MovieRecord[];
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(MovieRecord)
    private readonly movieRepository: Repository<MovieRecord>) { super() }

  //  constructor() { this.movies = this.loadMovies() }

  //   private loadMovies(): MovieRecord[] {
  //     try {
  //       const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
  //       return JSON.parse(data);
  //     } catch (error) {
  //       console.error('Error reading file:', error.message);

  //       return [];
  //     }
  //   } 

  async create(createMovieDto: CreateMovieDto, poster: any) {
    try {

      let token = this.request.headers.authorization
      let request: any = this._decodeUserToken(token);
      console.log("🚀 ~ file: movie.service.ts:44 ~ MovieService ~ create ~ request:", request)

      const created = this.movieRepository.create({ ...createMovieDto, poster: poster.buffer, users: request.id });
      const save = await this.movieRepository.save(created);
      return save;

      /* FOR JSON FILE
       const newMovie = { id: uuidv4(), ...createMovieDto };
       this.movies.push(newMovie);
       fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(this.movies, null, 2), 'utf8');
       return newMovie;*/

    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll(page: number, itemsPerPage: number) {

    // let pageNumber = page ? page - 1 : 0
    // const skip = (pageNumber) * itemsPerPage;
    // let total = await this.movieRepository.find();
    // let find = await this.movieRepository.find({
    //   skip,
    //   take: itemsPerPage,
    // });

    // return {
    //   page: page,
    //   totalSize: total.length,
    //   data: find
    // }

    let token = this.request.headers.authorization
    let request: any = this._decodeUserToken(token);

    const users = request.id

    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    queryBuilder.leftJoinAndSelect('movie.users', 'users')
    queryBuilder.andWhere('movie.users = :users', { users });
    const offset = (page - 1) * itemsPerPage;
    queryBuilder.skip(offset).take(itemsPerPage);

    try {
      const [movies, total] = await queryBuilder.getManyAndCount();
      return {
        page: page,
        totalSize: total,
        data: movies
      }

    } catch (error) {
      throw new NotFoundException('Movies not found');
    }

    /* For JSON FILE
const startIndex = (page - 1) * itemsPerPage;
const endIndex = Number(startIndex) + Number(itemsPerPage);
let find = this.movies.slice(startIndex, endIndex);

return {
page: page,
totalSize: this.movies.length,
data: find
}*/


  }

  async findOne(id: any) {
    try {

      const queryBuilder = this.movieRepository.createQueryBuilder('movie');
      queryBuilder.andWhere('movie.id = :id', { id })
      let movie = await queryBuilder.getOne()
      return movie;

      /*FOR JSON FILE
      let find = this.movies.find((movie) => movie.id == id);
      console.log("🚀 ~ file: movie.service.ts:90 ~ MovieService ~ findOne ~ find:", find)
      return find; */

    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }
  }

  async update(id: string, updateMovieDto: any) {
    try {

      const existingMovie:any = await this.findOne(id)

      if (!existingMovie) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }
      const updatedMovie = await this.movieRepository.save({
        ...existingMovie,
        ...updateMovieDto,
      });
  
      let update = await this.findOne(id)
      return update;

      /* FOR JSON FILE
       const index = this.movies.findIndex((movie) => movie.id == id);
       if (index !== -1) {
         this.movies[index] = { ...this.movies[index], ...updateMovieDto };
         fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(this.movies, null, 2), 'utf8');
         let find = await this.findOne(id);
         return find;
       } else {
         return new NotFoundException('movie not found')
       }*/

    } catch (error) {
      throw new InternalServerErrorException(error.message)

    }

  }

  async remove(id: string) {

    try {

      const found = await this.findOne(id);
      await this.movieRepository.delete(id);
      return found;

      /*FOR JSON FILE
      const index = this.movies.findIndex((movie) => movie.id === id);
      if (index !== -1) {

        let find = await this.findOne(id);
        const deletedMovie = this.movies.splice(index, 1)[0];
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(this.movies, null, 2), 'utf8');
        return find;
      }
      else {
        return new NotFoundException('movie not found')
      }*/


    } catch (error) {

    }

  }

}

