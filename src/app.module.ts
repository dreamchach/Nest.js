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
