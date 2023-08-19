// import necessary dependancy
 const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routes/route');
const adminRouter = require('./routes/admin_route');
const  movieRouter = require('./routes/movie_route');
const bookingRouter = require('./routes/booking_route');
dotenv.config();


//create a instance of express
const app = express();


//middlewares
app.use(express.json());
app.use(cors());
app.use("/user", userRouter); 
app.use("/admin", adminRouter); 
app.use('/movie', movieRouter);
app.use('/booking', bookingRouter);

//connect mongoose to mongoDB
mongoose.connect(process.env.DB_connect)
.then(()=>console.log("Database Connected"))
.catch(err =>console.log(err)); 


//listen to port 5500
app.listen(5500,()=>{
    console.log(`server is listening at port ${5500}`);
});