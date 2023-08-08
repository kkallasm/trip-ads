import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodEffects, ZodError } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { ZodIssue } from 'zod/lib/ZodError'

export function validateRequest (
    schema: AnyZodObject | ZodEffects<AnyZodObject>
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req)
            return next()
        } catch (error: any) {
            if (error instanceof ZodError) {
                let errors: any = {}
                error.errors.map((error: ZodIssue) => {
                    const path =
                        error.path.length > 1
                            ? error.path[error.path.length - 1]
                            : error.path[0]
                    if (errors[path] === undefined) {
                        errors[path] = [error.message]
                    } else {
                        errors[path].push(error.message)
                    }
                })

                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                    errors: errors,
                })
            } else
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error)
        }
    }
}
