const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
app.use(compression());
app.use(helmet());

app.get("/", function(req, res) {
  res.send("Hello");
});

app.listen(process.env.APP_PORT, function() {
  console.log("App server started");
});
