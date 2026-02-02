import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'kamranshakib' }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/auth-nestJs'),
    HelloModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
