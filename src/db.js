const mongoose = require("mongoose");
const crypto = require("crypto");
const chalk = require('chalk');

require("./models/Article");

const Article = mongoose.model("articles");

const stats = {
    total: 0,
    inserted: 0,
    deduped: 0
}

module.exports = {
  // Database connect
  connect: function(dbURI) {
    mongoose.connect(
      dbURI,  {useNewUrlParser: true },
      err => {
        if (err) {
          console.log(chalk.red(error));
        } else {
          console.log(chalk.blue(`conected to: ${dbURI}`));
        }
      }
    );
  },

  // return stats
  stats: function() {
    return stats;
  },

  // return all data from db
  getData: async function(callback) {
    const results = await Article.find({});
    callback(results);
  },

  // delete the entire collection
  clear: async function(callback) {
    stats.total = 0, stats.inserted = 0, stats.deduped = 0;

    await Article.remove({}, err => {
        if (err) {
            console.log(chalk.red(`Error ${err} removing collection`));
        }

        console.log(chalk.blue("collection removed"));
    });

    if (callback)
        callback(stats);
  },

  // insert data while not taking duplicates and adding to the list of URLs
  insert: async function(data, callback) {
    let hashedData;

    stats.total=data.length;

    for (let i = 0; i < data.length; i++) {
      hashedContent = crypto.createHash("md5").update(data[i].content).digest("hex");

      /*
        TODO
        ideally, my find/insert/update would be an atomic operation done in one swoop, but
        I cant get MongoDB upsert to work for the moment
      */
      const existingArticle = await Article.findOne({ hash: hashedContent });
      if (!existingArticle) {
        // insert a new article
        const newArticle = new Article({
          title: data[i].title,
          content: data[i].content,
          published: data[i].published,
          url: [data[i].url],
          hash: hashedContent
        });

        await newArticle.save();
        stats.inserted++;

      } else {
        // article already exists.  Just add new URL to array
        await Article.findOneAndUpdate(
          { hash: hashedContent },
          {
            $addToSet: {
              url: [data[i].url]
            }
          },
          { upsert: true }
        );
        stats.deduped++;
      }
    } // end of for every record loop

    if (callback)
        callback(stats);
  }
};
