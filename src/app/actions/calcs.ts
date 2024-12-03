'use server'

import {db} from "@/db";
import type {Calc} from "@prisma/client";
// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {z} from "zod";

const CalcSchema = z.object({
    expr: z.string(),
    result: z.string(),
})

interface CalcFormState {
    errors: {
        expr?: string[];
        result?: string[];
        _form?: string[]
    }
}

export async function createCalc(formData: FormData) {
    const result = CalcSchema.safeParse({
        expr: formData.get('expr') as string,
        result: formData.get('result') as string,
    });

    if (!result.success) {
        return {
            // The flatten method is used to convert the validation errors into a flat object structure
            // that can be easily displayed in the form.
            errors: result.error.flatten().fieldErrors
        }
    }

    let calc: Calc
    try {
        calc = await db.calc.create({
            data: {
                expr: result.data.expr,
                result: result.data.result,
            }
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                errors: {
                    _form: [e.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ["Something went wrong"]
                }
            }
        }
    }

    console.log(calc);

    revalidatePath('/');
    redirect(`/`);
}

export async function deleteCalc(id: number): Promise<CalcFormState> {
    let calc: Calc;
    try {
        calc = await db.calc.delete({where: {id}});
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                errors: {
                    _form: [e.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ["Something went wrong"]
                }
            }
        }
    }

    revalidatePath('/');
    redirect(`/`);
}