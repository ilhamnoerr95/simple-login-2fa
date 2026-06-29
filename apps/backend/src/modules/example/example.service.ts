import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/internal/prismaNamespace';

@Injectable()
export class ExampleService {
  constructor(private prismaService: PrismaService) {}
  async create(createExampleDto: CreateExampleDto) {
    try {
      return await this.prismaService.user.create({
        data: createExampleDto,
      });
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email sudah digunakan');
      }

      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const result = await this.prismaService.user.findMany();

      return { message: 'data', data: result };
    } catch (error: any) {
      throw new InternalServerErrorException('internal server error');
    }
  }

  async findOne(id: number) {
    const result = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!result) {
      throw new NotFoundException(`id dengan nomor ${id} tidak ditemukan`);
    }
    return { message: 'success', data: result };
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    return `This action updates a #${id} example`;
  }

  remove(id: number) {
    return `This action removes a #${id} example`;
  }
}
