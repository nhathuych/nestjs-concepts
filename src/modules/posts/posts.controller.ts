import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { RolesGuard } from '../auth/guards/roles-guard';

@Controller({ path: 'posts', version: '1' }) // /api/v1/posts
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

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: any) {
    return this.postsService.create(createPostDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: any
  ) {
    return this.postsService.update(id, updatePostDto, user);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.postsService.delete(id);
  }
}
