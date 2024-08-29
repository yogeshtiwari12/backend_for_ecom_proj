import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import allroutes from './routes/routes.js'
import cookieParser from 'cookie-parser';

const app = express();



mongoose.connect('mongodb://localhost:27017/ecomerse_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to database', mongoose.connection.db.databaseName);
})
.catch(err => {
    console.log('Error connecting to', err.message);
});






app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/allroutes", allroutes);

app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})