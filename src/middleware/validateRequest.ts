import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodEffects, ZodError } from 'zod';

export function validateRequest(schema: AnyZodObject) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            return next()
        } catch (error: any) {
            if (error instanceof ZodError) {

                console.log(error.errors, 'siin')
                console.log(error.flatten(), 'siin2')
                //console.log(error.format(), 'siin3')

                const urrors = error.flatten((issue) => {
                    console.log(issue, 'issue')
                    return issue
                })

                console.log(urrors, 'urrors')

                return res.status(422).json(error.flatten().fieldErrors)
            } else return res.status(422).json(error)
        }
    }
}

export function validateRequestBody(schema: AnyZodObject|ZodEffects<AnyZodObject>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body)
            return next()
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(422).json({
                    error: error.flatten().fieldErrors
                })
            } else return res.status(422).json(error)
        }
    }
}

