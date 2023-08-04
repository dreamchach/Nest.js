import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return 'This will return all movies'
    }

    @Get('/search')
    search(@Query('title') title) {
        return `We are searching for a movie with a title : ${title}`
    }

    @Get('/:id')
    getOne(@Param('id') item) {
        return `This will return one movie with the id : ${item}`
    }

    @Post()
    create(@Body() movieData) {
        return movieData
    }

    @Delete('/:id')
    remove(@Param('id') movieId) {
        return `This will delete a movie with the id : ${movieId}` 
    }

    @Patch('/:id')
    patch(@Param('id') movieId, @Body() updateData) {
        return {
            updatedMovie : movieId,
            ...updateData
        }
    }
}
