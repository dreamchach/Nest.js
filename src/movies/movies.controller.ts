import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

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
    getOne(@Param('id') item) {
        return this.moviesService.getOne(item)
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData)
    }

    @Delete('/:id')
    remove(@Param('id') movieId) {
        return this.moviesService.remove(movieId)
    }

    @Patch('/:id')
    patch(@Param('id') movieId, @Body() updateData) {
        return this.moviesService.patch(movieId, updateData)
    }
}
