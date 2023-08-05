import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MoviesService {
    private movies = []

    getAll() {
        return this.movies
    }

    getOne(id) {
        const movie = this.movies.find((movie) => String(movie.id) === String(id))
        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`)
        }else return movie
    }

    remove(id) {
        this.getOne(id)
        this.movies = this.movies.filter((movie) => String(movie.id) !== String(id))
        return true
    }

    create(movieData) {
        this.movies.push({
            id : this.movies.length + 1,
            ...movieData
        })
    }

    patch(movieId, updateData) {
        const movie = this.getOne(movieId)
        this.remove(movieId)
        this.movies.push({
            ...movie,
            ...updateData
        })
    }
}
