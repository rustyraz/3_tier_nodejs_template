// Lets import all the dependencies & middlewars here
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
// import logger from 'morgan'

// custom imports
import { homeRoute, userRoute } from './routes'

// Initiate the Express app
const app = express()
const logger = require('morgan')

// use the dependencies here
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))

// use all the controllers (APIs) here
app.use('/', homeRoute)
app.use('/users', userRoute)

const PORT = process.env.PORT ? process.env.PORT : 8080
const dbName = 'test'
// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  mongoose.Promise = global.Promise
  mongoose.connect(`mongodb://localhost/${dbName}`).then(() => {
    console.log('Connected to mongoDB at port 27017')
  })
})
