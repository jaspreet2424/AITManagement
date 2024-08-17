const express = require('express');
const app = express();
const adminRouter = require('./Routes/Admin');
const connectDatabase = require('./database');
const expenseRouter = require('./Routes/Expense');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const configJs = require('config-js');
const staffRouter = require('./Routes/Staff');
const NODE_ENV = new configJs('./ait.config.js').get("ENV_VARIABLES");
const PORT = NODE_ENV.PORT; 

connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
    methods : ["POST" , "GET" , "DELETE"],
}))

app.use('/admin',adminRouter);
app.use('/expenses' , expenseRouter);
app.use("/staff" , staffRouter);

app.listen((PORT) , () => {
    console.log(`AIT Expense Tracker is running at http://localhost:${PORT}`);
})