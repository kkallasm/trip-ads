import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodEffects, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export function validateRequestBody(schema: AnyZodObject|ZodEffects<AnyZodObject>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body)
            return next()
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                    error: error.flatten().fieldErrors
                })
            } else return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error)
        }
    }
}

