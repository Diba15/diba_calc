import {PrismaClient} from '@prisma/client';
import type {NextApiRequest, NextApiResponse} from 'next';

// Initialize the Prisma Client
const prisma = new PrismaClient();

/**
 * API handler for processing calculation requests.
 *
 * Supports only POST requests. Expects a JSON body with `expr` and `result` fields.
 *
 * - If `expr` and `result` are not provided, responds with a 400 Bad Request error.
 * - On successful creation of a new calculation record in the database, responds with a 201 status and the created record.
 * - Handles any errors by logging them and responding with a 500 Internal Server Error.
 *
 * For any unsupported HTTP methods, responds with a 405 Method Not Allowed error.
 *
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 */
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
            return res.status(500).json({
                error: 'Something went wrong',
                message: error,
            });
        }
    } else {
        // Handle unsupported HTTP methods
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }
}
