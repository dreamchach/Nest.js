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

## 8. Modules and Dependency Injection
1. 본디 `app.module.ts`에서는 `app.controller.ts`와 `app.service.ts`를 사용하는 것이 좋다.
2. 따라서 `movies.controller.ts`와 `movies.service.ts`를 위한 모듈을 새롭게 만들어야한다.
3. 새로운 모듈을 만드는 방법
```bash
nest g mo
```
모듈명은 `controller`와 `service`와 동일하게 하는 것이 좋다.
따라서 모듈명을 `movies`로 해주었다.

4. `movies`폴더에  `movies.module.ts`가 추가되었는지 확인한다.
```javascript
// movies.module.ts

import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers : [MoviesController],
    providers : [MoviesService]
})
export class MoviesModule {}
```

5. `app.module.ts`를 정리한다.
```javascript
import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TestModule } from './test/test.module';


@Module({
  imports: [MoviesModule, TestModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

6. 모듈은 여러개를 import 할 수 있다. 

7. `Dependency Injection`

```javascript
@Module({
    controllers : [MoviesController],
    // providers : [MoviesService]
})
```
```bash
Error: Nest can't resolve dependencies of the MoviesController (?). Please make sure that the argument MoviesService at index [0] is available in the MoviesModule context.

Potential solutions:
- Is MoviesModule a valid NestJS module?
- If MoviesService is a provider, is it part of the current MoviesModule?
- If MoviesService is exported from a separate @Module, is that module imported within MoviesModule?
  @Module({
    imports: [ /* the Module containing MoviesService */ ]
  })
```

## 9. Express on NestJS
- `Nest.js`는 `Express.js` 프레임워크를 기반으로 작동한다.
- 따라서 `Nest.js`에서도 `@Req`와 `@Res`를 이용해서 `req`와 `res`를 받을 수 있다.
- 하지만, `Nest.js`는 `Fantify`프레임워크도 기반으로 작동하기 때문에 `@Req, @Res`의 사용을 권장하지 않는다.

## 10. Introduction to Testing in Nest
- `jest` 라이브러리 사용
- `jest` 라이브러리는 `JavaScript` 테스트를 쉽게 해준다.
- `.spec`라고 적힌 파일들은 원본 파일들을 테스팅하는 파일이다.
- `jest` 라이브러리는 `.spec`라고 적힌 파일들을 찾는다.

파일들을 테스트해보면,
```bash
kimjiyeong@gimjiyeong-ui-Macmini Nest.js % npm run test:cov

> nest.js@0.0.1 test:cov
> jest --coverage

 PASS  src/test/test.service.spec.ts
 PASS  src/app/app.controller.spec.ts
 PASS  src/movies/movies.service.spec.ts
 PASS  src/test/test.controller.spec.ts
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   18.07 |        0 |    5.55 |   15.06 |                   
 src                   |   22.22 |      100 |       0 |   18.75 |                   
  app.controller.ts    |      80 |      100 |       0 |      75 | 7                 
  app.module.ts        |       0 |      100 |     100 |       0 | 1-12              
  main.ts              |       0 |      100 |       0 |       0 | 1-14              
 src/movies            |    9.52 |        0 |    6.66 |     8.1 |                   
  movies.controller.ts |       0 |      100 |       0 |       0 | 1-37              
  movies.module.ts     |       0 |      100 |     100 |       0 | 1-9               
  movies.service.ts    |   22.22 |        0 |    12.5 |      20 | 10-36             
 src/movies/DTO        |       0 |      100 |     100 |       0 |                   
  create-movie.dto.ts  |       0 |      100 |     100 |       0 | 1-12              
  update-movie.dto.ts  |       0 |      100 |     100 |       0 | 1-4               
 src/movies/entities   |       0 |      100 |     100 |       0 |                   
  movie.entities.ts    |       0 |      100 |     100 |       0 | 1                 
 src/test              |   53.84 |      100 |       0 |      50 |                   
  test.controller.ts   |      80 |      100 |       0 |      75 | 7                 
  test.module.ts       |       0 |      100 |     100 |       0 | 1-9               
  test.service.ts      |     100 |      100 |     100 |     100 |                   
-----------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        4.215 s
Ran all test suites.
```

이번 프로젝트는 위와 같이 나타난다.

표 안에서, `Funcs`는 해당 파일의 함수가 몇 퍼센트 테스트가 진행되었는지 나타나고, `Lines`는 해당 파일의 라인이 몇 퍼센트 테스트가 진행되었는지 나타나며, `Uncovered Line`을 통해 테스트가 진행되지 못한 줄이 어디있는지 확인할 수 있다.

```bash
kimjiyeong@gimjiyeong-ui-Macmini Nest.js % npm run test:watch

No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.

a

PASS  src/test/test.service.spec.ts
PASS  src/movies/movies.service.spec.ts
PASS  src/test/test.controller.spec.ts
PASS  src/app/app.controller.spec.ts

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.633 s, estimated 2 s
Ran all test suites.

Watch Usage: Press w to show more.

```

위를 보면 4개의 `.spec`파일을 전부 테스트 완료했다는 사실을 알 수 있다.

- 단위테스트(유닛테스트)는 모든 `function`을 따로 테스트 하는 것을 말한다. 
- 단위테스트는 서비스에서 분리된 유닛을 테스트한다.

- e2e테스트(end-to-end 테스트)는 모든 시스템을 테스트한다
- e2e테스트는 이 페이지로 가면 특정 페이지가 나와야하는 경우 사용한다.
- 즉, e2e테스트는 사용자가 취할만한 행동들을 처음부터 끝까지 테스트한다.


