const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();

//connection
require("./db/connection")
//routes
const router = require("./route/route")

//middlewire
app.use(cors());
app.use("/api/v1",router);
app.use(express.json());

//listen
app.listen(PORT, () => {
    console.log(`Your Server is started on Port no ${PORT}`);
})
