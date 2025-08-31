import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]), // Enables injecting PostRepository into PostsService using @InjectRepository(Post)
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
