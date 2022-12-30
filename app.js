const express = require("express");
const app = express();

const shortUrl = require("./models/modelShortUrl");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://boody:0133286364Ams@cluster0.iispprf.mongodb.net/link?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Example app listening at http://localhost:5000");
    });
  })

  .catch((err) => {
    console.log(err);
  });
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const shortUrls = await shortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrl", async (req, res) => {
  await shortUrl.create({
    Full: req.body.fullurl,
  });
  res.redirect("/");
});

app.get("/:shortUrl", (req, res) => {
  shortUrl
    .findOne({ Short: req.params.shortUrl })
    .then((shortUrl) => {
      //   console.log(shortUrl);
      shortUrl.clicks++;
      shortUrl.save();

      res.redirect(shortUrl.Full);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});
