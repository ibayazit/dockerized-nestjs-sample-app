import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-main';

@Injectable()
export class PrismaMainClient extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
