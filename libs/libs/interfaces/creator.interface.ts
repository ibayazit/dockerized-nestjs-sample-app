export interface CreatorInterface<T> {
  createOne(data: unknown): Promise<T>;
}
