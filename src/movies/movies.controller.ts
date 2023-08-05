import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './DTO/create-movie.dto';
import { UpdateMovieDto } from './DTO/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService : MoviesService) {}

    @Get()
    getAll() {
        return this.moviesService.getAll()
    }

    @Get('/search')
    search(@Query('title') title) {
        return `We are searching for a movie with a title : ${title}`
    }

    @Get('/:id')
    getOne(@Param('id') item : number) {
        return this.moviesService.getOne(item)
    }

    @Post()
    create(@Body() movieData : CreateMovieDto) {
        return this.moviesService.create(movieData)
    }

    @Delete('/:id')
    remove(@Param('id') movieId : number) {
        return this.moviesService.remove(movieId)
    }

    @Patch('/:id')
    patch(@Param('id') movieId : number, @Body() updateData : UpdateMovieDto) {
        return this.moviesService.patch(movieId, updateData)
    }
}
