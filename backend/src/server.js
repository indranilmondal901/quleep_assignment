const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();

//connection
require("./db/connection")
//routes
const router = require("./route/route")

//middlewire
// app.use(cors());
const corsConfig = {
    origin: `*`,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaaders: ['Content-Type', 'Authorization', 'Set-Cookie']
}
app.use(cors(corsConfig));
app.use(express.json());
app.use("/api/v1",router);

//listen
app.listen(PORT, () => {
    console.log(`Your Server is started on Port no ${PORT}`);
})
