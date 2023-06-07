import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Permission } from 'src/permission/permission.decorator';
import { Action } from 'src/user/role/role.constant';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { AddFileOutput } from './dto/add-file.dto';
import { FileService } from './file.service';
import { GetFileOutput } from './dto/get-file.dto';

const uploaderOptions: MulterOptions = {
  storage: diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
      return cb(null, uuidv4() + extname(file.originalname));
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp|mp4)$/)) {
      return callback(
        new BadRequestException('this file format is not supported'),
        false,
      );
    }
    callback(null, true);
  },
};

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Permission(Action.FILE_ADD)
  @Post()
  @UseInterceptors(FileInterceptor('file', uploaderOptions))
  async addFile(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AddFileOutput> {
    return this.fileService.addFile(user, file);
  }

  @Permission(Action.FILE_VIEW)
  @Get(':id')
  async getFile(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<GetFileOutput> {
    return this.fileService.getFile(user, id);
  }
}
