const express = require("express");
const { connectMongo, getDB } = require("./db");

const app = express();
const port = process.env.PORT;

app.use(express.json());                         // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

(async function main() {
    await connectMongo();
    app.use("/api", require("./routes"));
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`)
    })
})();
