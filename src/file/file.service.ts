import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AddFileOutput } from './dto/add-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';
import { GetFileOutput } from './dto/get-file.dto';
import { GetFilesInput, GetFilesOutput } from './dto/get-files.dto';
import { FileFilter } from './file.filter';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async addFile(user: User, f: Express.Multer.File): Promise<AddFileOutput> {
    const file = await this.fileRepository.save({
      createdBy: user,
      filename: f.filename,
      originalname: f.originalname,
      mimetype: f.mimetype,
      path: f.path,
      size: f.size,
    });

    return {
      message: 'file added successfully',
      file,
    };
  }

  async getFile(user: User, id: number): Promise<GetFileOutput> {
    const file = await this.fileRepository.findOneBy({ id });

    if (!file) throw new NotFoundException();

    return {
      message: 'file was found successfully',
      file,
    };
  }

  async getFiles(user: User, input: GetFilesInput): Promise<GetFilesOutput> {
    const filters = new FileFilter(input);

    const files = await this.fileRepository.find({
      relations: ['createdBy'],
      where: filters.getFilters(),
      ...filters.getOptions(),
    });

    const totalCount = await this.fileRepository.countBy(filters.getFilters());

    return {
      message: 'files was found successfully',
      files,
      pagination: { page: input.page, totalCount },
    };
  }
}
