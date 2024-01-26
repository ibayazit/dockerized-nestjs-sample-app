export interface UpdaterInterface<T> {
  updateOne(id: string, data: undefined): Promise<T>;
}
