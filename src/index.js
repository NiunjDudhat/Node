require('dotenv').config();
const passport = require('passport');
const express = require('express');
const router = require('./routes/index');
const connectDB = require('./db/mongoDB');
const socketIo = require('./helper/socketio');
const cookieParser = require('cookie-parser');
const googleProvider = require('./helper/google_curd');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');
const db = require('../models');

const app = express();
app.use(cookieParser())
connectDB();
googleProvider();
app.use(cors())

app.use(require('express-session')({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use('/', router);
socketIo();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);    
})


// (async() => {
//     await db.sequelize.sync({ alter: true });

//     app.listen(process.env.PORT, () => {
//         console.log(`Server running at http://localhost:${process.env.PORT}`);    
//     })
// })()