import type {Calc} from "@prisma/client";
import {db} from "@/db";
import {notFound} from "next/navigation";

export async function getCalcs(): Promise<Calc[]> {
    return db.calc.findMany({
        orderBy: [
            {
                id: 'desc',
            }
        ],
    });
}

export async function getCalc(id: number): Promise<Calc> {
    const post = await db.calc.findUnique({where: {id}});
    if (!post) {
        notFound();
    }
    return post;
}