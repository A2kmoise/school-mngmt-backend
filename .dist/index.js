import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './routes/students_routes.js'
import dotenv from 'dotenv'
import Mongoconn from './config/dbConnection.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 3300;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('images'));
app.use(router);


    



app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});