require('dotenv').config({path: "./config.env"})
const express = require('express');
const connectDB = require("./config/db")
const errorHandler = require('./middleware/error')
// const morgan = require('morgan')
// const cors = require('cors')
// const allRoutes = require('./routes/index')

// Conection MongoDB
connectDB();

// Init Express
const app = express()

// Middleware
// app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
// app.use(morgan('dev'))
// app.use(express.static('../client/build'))
// app.use(allRoutes)

// Error Handler (Should be last piece of middleware)
app.use(errorHandler);

const PORT = process.env. PORT || 5000;

const server = app.listen(PORT, () =>
  console.log( `Server runnning on port ${PORT}`)
);
              
process.on("unhandledRejection", (err, promise) =>{
  console.log( `Logged Error: ${err}`);
  server.close(() => process.exit(1));
});


