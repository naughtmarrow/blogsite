import dotenv from 'dotenv';
dotenv.config()

import express from 'express'
const app = express()
app.use(express.json())

import indexRouter from './routes/indexRoutes.js';
import tagRouter from './routes/tagRoutes.js';
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';

app.use('/', indexRouter)
app.use('/tags', tagRouter)
app.use('/users', userRouter)
app.use('/blogs', blogRouter)

app.listen(process.env.PORT || 3000)
