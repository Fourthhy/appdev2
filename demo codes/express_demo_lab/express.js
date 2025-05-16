require('dotenv').config()
const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.encodeurl())

app.get("/", (req, res) => {
    res.send("Hi, Universe");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


