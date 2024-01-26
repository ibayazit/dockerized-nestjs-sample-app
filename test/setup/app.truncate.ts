import { PrismaMainClient } from '../../prisma/prisma.client';

export async function NestAppTruncate(
  prisma: PrismaMainClient,
): Promise<boolean> {
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  return true;
}
