import {PrismaClient} from '@prisma/client';
import type {NextApiRequest, NextApiResponse} from 'next';

// Initialize the Prisma Client
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Parse data from the request body
            const {expr, result} = req.body;

            if (!expr || !result) {
                return res.status(400).json({error: 'Both expr and result are required'});
            }

            // Insert data into the database
            const newCalc = await prisma.calc.create({
                data: {
                    expr,
                    result,
                },
            });

            // Respond with the created record
            return res.status(201).json(newCalc);
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'Something went wrong'});
        }
    } else {
        // Handle unsupported HTTP methods
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }
}
