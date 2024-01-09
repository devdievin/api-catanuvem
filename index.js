const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const routes = require("./src/routes/indexRoute");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, () => console.log(`Api running on http://localhost:${PORT}`));
