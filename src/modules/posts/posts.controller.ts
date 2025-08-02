import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  findAll(@Query('search') search?: string) {
    return this.postsService.findAll(search?.trim())
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.postsService.findOne(id)
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.postsService.delete(id);
  }
}
