const express = require('express');
const { credentials } = require('./config');

const app = express();
const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser(credentials.cookieSecret));

app.get('/', (req, res) => {
  res.cookie('monster', 'nom nom');
  res.cookie('signed_monster', 'nom nom', { signed: true });
  // res.clearCookie('monster');
  res.send({ cookies: req.cookies, signedCookies: req.signedCookies });
});

app.listen(port, () => console.log(`Express started on http://localhost:${port}`));
