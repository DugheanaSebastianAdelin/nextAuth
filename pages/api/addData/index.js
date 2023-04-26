import { prisma } from '../auth/[...nextauth]';

export default async function handle(req) {
    const { item } = req.body;

    try {
        await prisma.user.create({ data: item })
      } catch (e) {
       console.log(e);
        throw e
      }
}