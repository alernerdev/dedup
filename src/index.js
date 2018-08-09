const express = require("express");
const chalk = require('chalk');

const keys = require("./config/keys");
const DB = require("./db.js");

DB.connect(keys.mongoURI);

const app = express();
require('./routes/dbRoutes')(app, DB, fetchRawData());

const PORT = process.env.PORT || 5000;
console.log(chalk.green(`listening on port ${PORT}`));

app.listen(PORT);


function fetchRawData() {
    const fakeData = [
      {
        title: "On global warming",
        content: "there should be one URL in the DB",
        published: new Date("2015-03-25T12:00:00Z"),
        url: "www.yahoo.com/GlobalWarming"
      },
      {
        title: "On politics",
        content: "there should be two URLs in the DB",
        published: new Date("2018-03-25T12:00:00Z"),
        url: "www.yahoo.com/foreignaffairs"
      },
      {
        title: "On politics",
        content: "there should be two URLs in the DB",
        published: new Date("2018-03-25T12:00:00Z"),
        url: "www.yahoo.com/trump"
      },
      {
        title: "Fisheries without fish",
        content: "there should be 3 URLs in the DB",
        published: new Date("2018-08-25T12:00:00Z"),
        url: "www.yahoo.com/fish1"
      },
      {
        title: "Fisheries without fish",
        content: "there should be 3 URLs in the DB",
        published: new Date("2018-08-25T12:00:00Z"),
        url: "www.yahoo.com/fish2"
      },
      {
        title: "Fisheries without fish",
        content: "there should be 3 URLs in the DB",
        published: new Date("2018-08-25T12:00:00Z"),
        url: "www.yahoo.com/fish3"
      }
    ];

    return fakeData;
  }