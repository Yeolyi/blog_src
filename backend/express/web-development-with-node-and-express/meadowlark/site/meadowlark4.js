const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');
const weatherMiddleware = require('./lib/middleware/weather');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(weatherMiddleware);
app.engine(
  'handlebars',
  expressHandlebars.engine({
    defaultLayout: 'main',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set('view engine', 'handlebars');

// 이제 이 handler들을 잘 쓰는지만 테스트하면 된다.
app.get('/', (req, res) => {
  res.render('homeWithPartial');
});
app.get('/about', handlers.about);
app.use(handlers.notFound);
app.use(handlers.serverError);

app.listen(port, () => console.log(`Express started on http://localhost:${port}`));
