import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

/* TODO:
    API validation and typehints
    Use a more thoughtful API endpoints (with real auth, the route paths would be different
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            return handlePost(req, res);
        case 'DELETE':
            return handleDelete(req, res);
        default:
            return res.status(405).end();
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    // TODO: Prisa.UserCreateInput
    const prisma = new PrismaClient()
    const createdUser = await prisma.user.create({
        data: JSON.parse(req.body)
    })

    res.json(createdUser);
}


async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query

    const prisma = new PrismaClient()
    await prisma.user.delete({
            where: {
                id: Number.parseInt(id as string)
            },
        }
    );

    res.status(200).end()
}
