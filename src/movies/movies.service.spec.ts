import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.create({
      title: 'Test Movie',
      writer: 'Test',
      year: 2000,
      genres: ['test']
    })
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('k-dream', () => {
    expect(2 + 2).toEqual(4)
  })

  describe('getAll', () => {
    it('return array', () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe('create', () => {
    it('create a movie', () => {
      const beforeCreate = service.getAll().length
      service.create({
        title: 'Test Movie',
        writer: 'Test',
        year: 2000,
        genres: ['test']
      })
      console.log(service.getAll())
      const afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe('getOne', () => {
    it('return a movie', () => {
      service.create({
        title: 'Test Movie',
        writer: 'Test',
        year: 2000,
        genres: ['test']
      })
      const movie = service.getOne(1)
      expect(movie).toBeDefined()
      expect(movie.id).toEqual(1)
    })

    it('throw 404 error', () => {
      try {
        service.getOne(999)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toEqual('Movie with ID 999 not found.')
      }
    })
  })

  describe('remove', () => {
    it('success delete', () => {
      service.create({
        title: 'Test Movie',
        writer: 'Test',
        year: 2000,
        genres: ['test']
      })
      const beforeDel = service.getAll().length
      service.remove(1)
      const afterDel = service.getAll().length
      expect(afterDel).toBeLessThan(beforeDel)
    })

    it('return 404', () => {
      try {
        service.remove(0)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('update', () => {
    it('update a movie', () => {
      service.create({
        title: 'Test Movie',
        writer: 'Test',
        year: 2000,
        genres: ['test']
      })
      service.patch(1, {title : 'Updated Test'})
      const movie = service.getOne(1)
      expect(movie.title).toEqual('Updated Test')
    })

    it('throw 404 error', () => {
      try {
        service.patch(999, {})
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })
});
