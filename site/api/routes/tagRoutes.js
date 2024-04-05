import express from 'express'
const tagRouter = express.Router()

tagRouter.get('/', (req, res)=>{
    res.send('Hello from tags')
})

export default tagRouter
