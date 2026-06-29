import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';

import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('database');

  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('✅ Prisma connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.warn('❌ Prisma disconnected to database');
  }
}
