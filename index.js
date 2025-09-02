require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  const domain = req.get('host');
  //console.log(req);
  console.log(`${req.method} ${domain}${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.status(200).send("");
});

app.listen(PORT, () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});
