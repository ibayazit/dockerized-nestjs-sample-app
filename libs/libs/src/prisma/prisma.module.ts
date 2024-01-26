import { DynamicModule, Module, Provider } from '@nestjs/common';

@Module({})
export class PrismaModule {
  static forRoot<TProvider extends Provider>(
    provider: TProvider,
  ): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
