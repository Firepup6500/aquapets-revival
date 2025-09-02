require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(async (req, res, next) => {
  const domain = req.get('host');
  //console.log(req);
  console.log(`${req.method} ${domain}${req.url}`);
  next();
});

// bpgapiv2/system/whatever
let sales={}, version={}, news={};

app.get("/system/sales.json", async (req, res, next) => {
  res.status(200).json(sales);
})

app.get("/system/version.json", async (req, res, next) => {
  res.status(200).json(version);
})

app.get("/system/news.json", async (req, res, next) => {
  res.status(200).json(news);
})

// bpgapiv2/client/whatever
let invites={}, gifts={};

app.get("/client/invites.json", async (req, res, next) => {
  res.status(200).json(news);
})

app.get("/system/gifts.json", async (req, res, next) => {
  res.status(200).json(gifts);
})

// bpgapiv2/aquapets/whatever
let messages={};

app.get("/aquapets/messages.json", async (req, res, next) => {
  res.status(200).json(news);
})

// bionicpandagamesapi/client/tapjoy/check

app.get("/client/tapjoy/check", async (req, res, next) => {
  res.status(200).send("")
})

app.use(async (req, res, next) => {
  res.status(404).send("");
});

app.listen(PORT, () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});
