const express = require('express');
const app = express()
const Dot = require('dotenv')
const mongoose = require('mongoose');
const userRoutes = require('./Routes/User');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors')

      Dot.config()

    
      mongoose.connect(process.env.MONGO_URI,{ useUnifiedTopology: true ,useNewUrlParser: true }).then(()=>{


        console.log('database has been connected')
      })


  // cookie parser saves the information

  //middleware
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(cors())
  app.use(expressValidator())

//routes
app.use('/',userRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{

    console.log(`the server is listening on ${PORT}`)
})