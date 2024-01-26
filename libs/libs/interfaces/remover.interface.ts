export interface RemoverInterface<T> {
  removeOneById(id: string): Promise<T>;
}
