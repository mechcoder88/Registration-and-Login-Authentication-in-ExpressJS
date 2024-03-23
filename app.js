import express from "express";

const app = express();

const port = process.env.PORT || "5000";

import web from "./routes/web.js";

// Database Connection
import connectDB from "./db/connectdb.js";
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/blogdb";
connectDB(DATABASE_URL);

// Setting Template Engine
app.set('view engine', 'ejs')

// Using 'urlencoded' built-in middleware function to parse(&send) data from (Frontend) 'registration.ejs' to (Backend) 'userController.js'
app.use(express.urlencoded({ extended: true }));

// Creating Route
app.use('/', web);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});