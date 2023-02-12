var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve('src/client/views/index.html'))
});

app.get("/test", async function (req, res) {
  await fetch(
    "https://api.meaningcloud.com/sentiment-2.1?" +
      new URLSearchParams({
        key: process.env.API_KEY,
        lang: "en",
        txt: req.query.text,
      })
  )
    .then(async (response) => {
      const result = JSON.parse(await response.text());
      res.send({
        title: "response",
        message: `The confidence is ${result.confidence} and agreement is ${result.agreement}`,
        time: "now",
      });
    })
    .catch((e) => console.log(e));
});
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
