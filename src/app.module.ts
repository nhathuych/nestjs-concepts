import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './modules/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './db/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfigs } from './config/throttler.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig),
    ThrottlerModule.forRoot(throttlerConfigs),
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
