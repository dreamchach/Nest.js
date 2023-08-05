import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './DTO/create-movie.dto';
import { UpdateMovieDto } from './DTO/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies = []

    getAll() {
        return this.movies
    }

    getOne(id : number) {
        const movie = this.movies.find((movie) => movie.id === id)
        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`)
        }else return movie
    }

    remove(id : number) {
        this.getOne(id)
        this.movies = this.movies.filter((movie) => movie.id !== id)
        return true
    }

    create(movieData : CreateMovieDto) {
        this.movies.push({
            id : this.movies.length + 1,
            ...movieData
        })
    }

    patch(movieId : number, updateData : UpdateMovieDto) {
        const movie = this.getOne(movieId)
        this.remove(movieId)
        this.movies.push({
            ...movie,
            ...updateData
        })
    }
}
