import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
  controllers: [],
  providers: [],
  imports: [HelloModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
