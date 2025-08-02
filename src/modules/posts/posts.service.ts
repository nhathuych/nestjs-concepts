import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ILike, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {}

  findAll(search?: string): Promise<Post[]> {
    const whereClause = search ? { title: ILike(`%${search}%`) } : {};
    return this.postRepository.find({
      where: whereClause,
      order: { id: 'DESC' },
    });
  }

  findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOneBy({ id });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    // Use create() before save() to ensure hooks like @BeforeInsert run
    // Avoid doing: this.postRepository.save(createPostDto);

    const existingPost = await this.postRepository.findOneBy({ title: createPostDto.title });
    if (existingPost) throw new BadRequestException(`Post with title "${createPostDto.title}" already exists`);

    const post = this.postRepository.create(createPostDto); // convert DTO to a Post entity instance (not saved yet)
    return this.postRepository.save(post);  // insert the entity into the database
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    post.title = updatePostDto.title ?? post.title;
    post.author = updatePostDto.author ?? post.author;
    post.content = updatePostDto.content ?? post.content;

    return this.postRepository.save(post);
  }

  async delete(id: number): Promise<void> {
    // await this.postRepository.delete(id);

    const post = await this.findOne(id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    // This will trigger @BeforeRemove and @AfterRemove hooks if they exist
    await this.postRepository.remove(post);
  }
}
