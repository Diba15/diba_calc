import {PrismaClient} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

// Initialize the Prisma Client
const prisma = new PrismaClient();

/**
 * Handles DELETE requests to delete calculations from the database.
 * @param {NextApiRequest} req The request object.
 * @param {NextApiResponse} res The response object.
 * @returns {Promise<void>} A promise which resolves when the request has been handled.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            // Parse data from the request body
            const {id} = req.body;

            if (!id) {
                return res.status(400).json({error: 'id is required'});
            }

            // Insert data into the database
            const newCalc = await prisma.calc.deleteMany({where: {id}});

            // Respond with the created record
            return res.status(200).json(newCalc);

        } catch (e:unknown) {
            if (e instanceof Error) {
                res.status(500).json({error: "Failed to delete calcs"});
            }
        }
    } else {
        // Handle unsupported HTTP methods
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end('Method Not Allowed');
    }
}