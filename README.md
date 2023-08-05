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

## 6. Movies Service
```bash
nest g s
```

`service`의 이름을 `controller`와 동일하게 만들 수 있다. 그 경우에는 동일한 폴더에 `service` 파일들이 생성된다.

```javascript
// movies.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
    private movies = []

    getAll() {
        return this.movies
    }

    getOne(id) {
        return this.movies.find((movie) => String(movie.id) === String(id))
    }

    remove(id) {
        this.movies.filter((movie) => String(movie.id) !== String(id))
        return true
    }

    create(movieData) {
        this.movies.push({
            id : this.movies.length + 1,
            ...movieData
        })
    }
}

```

만약 `movies`에 타입을 넣고 싶다면 `(파일명).entities.ts`로 파일을 만든다.
```javascript
// movies.entities.ts

export class Moive {
    id: number;
    title: string;
    year: number;
    genres: string[]
}
```

다만, 타입스크립트는 대부분의 타입들을 스스로 지정할 수 있을 정도로 똑똑하므로 필수적이지는 않다.

```javascript
// movies.controller.ts

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService : MoviesService) {}

    @Get()
    getAll() {
        return this.moviesService.getAll()
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
        return {
            updatedMovie : movieId,
            ...updateData
        }
    }
}
```

```javascript
// movies.service.ts
...
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

    patch(movieId, updateData) {
        const movie = this.getOne(movieId)
        this.remove(movieId)
        this.movies.push({
            ...movie,
            ...updateData
        })
    }
...
```

```javascript
...
    @Patch('/:id')
    patch(@Param('id') movieId, @Body() updateData) {
        return this.moviesService.patch(movieId, updateData)
    }
...
```

`NotFoundException()` 함수로 예외상황을 찾지 못했을 경우, 에러메시지를 날릴 수 있고, `remove()`함수에서 `getOne()`함수를 사용한 것 처럼 다른 함수를 사용할 수도 있다.

## 7. DTOs and Validation
body값으로 자신이 원하는 항목 이외의 값이 들어오는 것을 막기 위해 DTO를 사용한다.
`DTO`는 `Data Transfer Object`의 약자이다.

1. 일단, 항목을 생성 시 들어올 body항목들을 생성해준다.
이때, 클래스를 이용해 항목들을 만든다.

```javascript
// movies/DTO/create-movie.dto.ts
export class CreateMovieDto {
    readonly title : string;
    readonly writer : string;
    readonly year : number;
    readonly genres : string[] 
}
```

2. 유효성 검증을 위해 사용하게 될 npm 패키지들을 설치한다.
```bash
npm i class-transformer 
npm i class-validator
```

3. `body`로 들어오는 값들을 전체적으로 유효성검증을 할 수 있도록 `main.ts`에 유효성 검증을 하기 위한 코드를 작성한다.
```javascript
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    forbidNonWhitelisted : true
  }))

  await app.listen(3000);
}
```

4. `create-movie.dto.ts`에서 항목들의 타입을 `class-validator`로 선언한다.
```javascript
// movies/DTO/create-movie/dto.ts
import { IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    readonly title : string;
    @IsNumber()
    readonly year : number;
    @IsString({each : true})
    readonly genres : string[] 
}
```

5. 생성 시 들어오는 `body`에 `CreateMovieDto`타입을 선언한다.
```javascript
// movies/movies.controller.ts
...
@Post()
create(@Body() movieData : CreateMovieDto) {
    return this.moviesService.create(movieData)
}
...

// movies/movies.service.ts
...
create(movieData : CreateMovieDto) {
    this.movies.push({
        id : this.movies.length + 1,
        ...movieData
    })
}
...
```

6. 만약 인자의 값이 달라서 문제가 생긴다면 그 역시도 `Validation Pipe`로 해결이 가능하다.
다만, 그 경우에는 반드시 받고싶은 타입을 지정해주어야 한다.

```javascript
// main.ts
...
app.useGlobalPipes(new ValidationPipe({
    ...,
    transform : true
}))
...
```

```javascript
...
// movies.service.ts
...
getOne(id : number) {
    const movie = this.movies.find((movie) => movie.id === id)
    ...
}

remove(id : number) {
    ...
    this.movies = this.movies.filter((movie) => movie.id !== id)
    ...
}
...

// movies.controller.ts
@Get('/:id')
getOne(@Param('id') item : number) {
    return this.moviesService.getOne(item)
}

@Delete('/:id')
remove(@Param('id') movieId : number) {
    return this.moviesService.remove(movieId)
}

@Patch('/:id')
patch(@Param('id') movieId : number, @Body() updateData : UpdateMovieDto) {
    return this.moviesService.patch(movieId, updateData)
}
```

7. `patch()`함수의 경우, 일부분의 body값만 적을 수 있다.
따라서 부분적인 body값이 갈 수 있도록 변경해야 한다.

1. `?`를 사용해서 optional한 값을 받아옴
```javascript
import { IsNumber, IsString } from "class-validator";

export class UpdateMovieDto {
    @IsString()
    readonly title? : string;
    @IsString()
    readonly writer? : string;
    @IsNumber()
    readonly year? : number;
    @IsString({each : true})
    readonly genres? : string[] 
}
```

위의 방식과 같이 `?`를 사용해서 body값을 optional하게 받아올 수도 있지만, 다른 방법도 있다.

2. `mapped-types` 라이브러리를 사용
```bash
npm i @nestjs/mapped-types
```

`mapped-types`라이브러리는 타입을 변환시키고 사용할 수 있게 해준다.

```javascript
// update-movie.dto.ts
import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
```

3. 만약, 배열 내부의 값을 선택적으로 받고 싶을 경우에는 아래와 같이 한다.

1. `@IsString({each : false})`를 사용
```javascript
@IsString({each : false})
readonly genres : string[] 
```

2. `@IsOptional()`을 사용
```javascript
@IsOptional()
@IsString({each : true})
readonly genres : string[] 
```

