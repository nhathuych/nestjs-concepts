import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]), // Enables injecting PostRepository into PostsService using @InjectRepository(Post)
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
