const express = require('express');
const app = express()
const Dot = require('dotenv')
const mongoose = require('mongoose');
const userRoutes = require('./Routes/User');

      Dot.config()

    
      mongoose.connect(process.env.MONGO_URI,{ useUnifiedTopology: true ,useNewUrlParser: true }).then(()=>{


        console.log('database has been connected')
      })


//routes
app.use('/',userRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{

    console.log(`the server is listening on ${PORT}`)
})