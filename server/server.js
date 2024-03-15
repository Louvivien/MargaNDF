// /Users/vivien/Documents/MargaNDF/server/server.js

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const expenseRoutes = require('./routes/expenses')
const userRoutes = require('./routes/user')
const cors = require('cors')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({
  origin: "*",
  methods: ["GET","POST","DELETE","PATCH"]
}));


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/expenses', expenseRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })