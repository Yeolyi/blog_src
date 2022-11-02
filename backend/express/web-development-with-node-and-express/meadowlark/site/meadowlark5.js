const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers2');

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(express.static(__dirname + '/public'));
app.engine(
  'handlebars',
  expressHandlebars.engine({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

app.get('/', handlers.home);
app.get('/about', handlers.about);

app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

// 여기가 마지막이 아니면 안됨!!!
app.use(handlers.notFound);
app.use(handlers.serverError);

app.listen(port, () => console.log(`Express started on http://localhost:${port}`));
