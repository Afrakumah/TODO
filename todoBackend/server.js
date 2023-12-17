import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todo_routes.js';
import dotenv from 'dotenv';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 7000;
const URI = process.env.MONGO_URI;

//error handler middleware
// app.use((err, req, res, next) => {
// console.log(err.stack);

// res.status(500).send('something went wrong!')
// next(err)
// });


//middleware
//app.use(cors());
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/todos', todoRoutes);


//connect to db
mongoose.connect(URI).then((results) => {
    if(results)
    console.log('mongoDB connected')
})
.catch((err) => 
console.log(err)) 



app.listen(PORT, console.log(`server is listening on Port ${PORT}`))