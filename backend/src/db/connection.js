const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const url = process.env.DB_URL;

//connect with db
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Your DB is succesfully connected with Node.js");
}).catch((err)=>{
    console.log(err);
})