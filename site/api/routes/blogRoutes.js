import express from 'express'
const blogRouter = express.Router()

blogRouter.get('/', (req, res)=>{
    res.send('Hello from blogs')
})

export default blogRouter
