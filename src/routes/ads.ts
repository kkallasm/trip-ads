import express from 'express'
const router = express.Router()

router
    .get('/' ,(req: express.Request, res: express.Response) => {
        res.send('ads index')
    })

router
    .route('/:id')
    .get((req: express.Request, res: express.Response) => {
        res.send(`Get Ad With ID ${req.params.id}`)
    })
    .put((req: express.Request, res: express.Response) => {
        res.send(`Update Ad With ID ${req.params.id}`)
    })
    .delete((req: express.Request, res: express.Response) => {
        res.send(`Delete Ad With ID ${req.params.id}`)
    })

export default router