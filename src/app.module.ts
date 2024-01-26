import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as Joi from 'joi';
import { TransformInterceptor } from '../libs/libs/src/interceptors/transform.interceptor';
import { PrismaModule } from '../libs/libs/src/prisma/prisma.module';
import { PrismaMainClient } from '../prisma/prisma.client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
      }),
      envFilePath: [
        process.env.NODE_ENV !== 'production'
          ? `.env.${process.env.NODE_ENV}`
          : '',
        '.env',
      ],
    }),
    BookModule,
    AuthorModule,
    PrismaModule.forRoot(PrismaMainClient),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
