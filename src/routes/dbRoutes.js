const mongoose = require("mongoose");

const Article = mongoose.model("articles");

module.exports = (app, DB, rawData) => {
  app.get("/db", (req, res) => {
    DB.getData(results => {
      res.send(results);
    });
  });

  // TODO
  // did it as a get for the sake of expediency, but its not a get
  app.get("/db/delete", (req, res) => {
    DB.clear((stats) => {
      res.send("dropped DB");
    });
  });

  // could have done it as a POST, but I am not really posting anything
  app.get("/db/insert", (req, res) => {
    DB.insert(rawData, stats => {
      res.send(stats);
    });
  });

  app.get("/db/stats", (req, res) => {
    res.send(DB.stats());
  });

};
