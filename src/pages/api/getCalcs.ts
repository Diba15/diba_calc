import {PrismaClient} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

// Initialize the Prisma Client
const prisma = new PrismaClient();

/**
 * Handles GET requests to `/api/getCalcs`.
 *
 * @param req The Next.js request object.
 * @param res The Next.js response object.
 * @returns A JSON response containing an array of `calc` records, ordered by `id` in descending order.
 *          If an error occurs, a 500 status code is set, and a JSON response with an `error` property is returned.
 *          If the request method is not GET, a 405 status code is set, and a plain text response "Method Not Allowed" is returned.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const calcs = await prisma.calc.findMany({
                orderBy: [
                    {
                        id: 'desc',
                    }
                ],
            });
            res.status(200).json(calcs);
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(500).json({error: "Failed to fetch calcs"});
            }
        }
    } else {
        // Handle unsupported HTTP methods
        res.setHeader('Allow', ['GET']);
        res.status(405).end('Method Not Allowed');
    }
}