const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Body Parser
app.use(express.json());

// Mount Router
app.use("/", require('./routes/route'));


const PORT = process.env.PORT || 8100;

app.listen(PORT, ()=>{
    // console.log(`listening on port ${PORT}`)
})