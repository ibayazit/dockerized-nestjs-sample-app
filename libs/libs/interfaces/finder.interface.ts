export interface FinderInterface<T> {
  findMany(options?: undefined): Promise<T[]>;

  findOne(options: unknown): Promise<T>;

  failOne(options: undefined): Promise<boolean>;

  findOneById(id: string): Promise<T>;
}
