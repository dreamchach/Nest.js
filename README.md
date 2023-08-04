# Nest.js

## 1. Project Setup
>error
https://brtech.tistory.com/124

>참고사항
https://support.apple.com/ko-kr/guide/mac-help/mchlp1236/mac#:~:text=Mac%EC%9D%98%20Finder%20%EC%97%90%EC%84%9C%20%EC%9D%B4%EB%8F%99,%EC%9D%98%20%ED%99%88%20%ED%8F%B4%EB%8D%94%EA%B0%80%20%EC%97%B4%EB%A6%BD%EB%8B%88%EB%8B%A4.


## 2. Controllers
```javascript
// app.controller.ts

@Get('/hello')
sayHello() {
  return 'Hello everyone :)'
}
```

## 3. Services

## 4. Movies Controller
```bash
kimjiyeong@gimjiyeong-ui-Macmini Nest.js % nest
Usage: nest <command> [options]

Options:
  -v, --version                                   Output the current version.
  -h, --help                                      Output usage information.

Commands:
  new|n [options] [name]                          Generate Nest application.
  build [options] [app]                           Build Nest application.
  start [options] [app]                           Run Nest application.
  info|i                                          Display Nest project details.
  add [options] <library>                         Adds support for an external library to your project.
  generate|g [options] <schematic> [name] [path]  Generate a Nest element.
    Schematics available on @nestjs/schematics collection:
      ┌───────────────┬─────────────┬──────────────────────────────────────────────┐
      │ name          │ alias       │ description                                  │
      │ application   │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ itc         │ Generate an interceptor declaration          │
      │ interface     │ itf         │ Generate an interface                        │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ resource      │ res         │ Generate a new CRUD resource                 │
      │ service       │ s           │ Generate a service declaration               │
      │ sub-app       │ app         │ Generate a new application within a monorepo │
      └───────────────┴─────────────┴──────────────────────────────────────────────┘
kimjiyeong@gimjiyeong-ui-Macmini Nest.js % nest g co
? What name would you like to use for the controller? movies
CREATE src/movies/movies.controller.spec.ts (492 bytes)
CREATE src/movies/movies.controller.ts (101 bytes)
UPDATE src/app.module.ts (211 bytes)
```

```javascript
import { Controller, Get } from '@nestjs/common';

@Controller('movies')
...
```

`@Controller()`의 괄호 안의 단어가 라우터로 사용된다.
따라서 위와 같이 `@Controller('movies')`로 시작된 경우에는 값을 받기 위해서 URL을
`http://localhost:3000/movies`로 지정해 주어야 한다.

```javascript
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return 'This will return all movies'
    }

    @Get('/:id')
    getOne(@Param('id') item) {
        return `This will return one movie with the id : ${item}`
    }

    @Post()
    create() {
        return `This will create a movie`
    }

    @Delete('/:id')
    remove(@Param('id') movieId) {
        return `This will delete a movie with the id : ${movieId}` 
    }

    @Patch('/:id')
    patch(@Param('id') movieId) {
        return `This will patch a movie with the id : ${movieId}` 
    }
}
```

## 5. More Routes
`express.js`나 `Nest.js`에서 `router`의 순서를 주의해야한다.

```javascript
    @Get('/:id')
    getOne(@Param('id') item) {
        return `This will return one movie with the id : ${item}`
    }

    @Get('/search')
    search() {
        return `We are searching for a movie with a title : `
    }

    // http://localhost:3000/movies/search
    // This will return one movie with the id : search
```

```javascript

    @Get('/search')
    search() {
        return `We are searching for a movie with a title : `
    }

    @Get('/:id')
    getOne(@Param('id') item) {
        return `This will return one movie with the id : ${item}`
    }

    // http://localhost:3000/movies/search
    // We are searching for a movie with a title :
```

```javascript
    @Get('/search')
    search(@Query('title') title) {
        return `We are searching for a movie with a title : ${title}`
    }
    
    @Post()
    create(@Body() movieData) {
        return movieData
    }

    @Patch('/:id')
    patch(@Param('id') movieId, @Body() updateData) {
        return {
            updatedMovie : movieId,
            ...updateData
        }
    }
```