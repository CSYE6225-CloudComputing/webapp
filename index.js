const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Body Parser
app.use(express.json());

const PORT = process.env.PORT || 8100;

// Mount Router
app.use("/", require("./routes/route"));

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})