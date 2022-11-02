const fortune = require('./fortune');

exports.home = (req, res) => res.render('homeWithLink');
exports.about = (req, res) => res.render('about', { fortune: fortune.getFortune() });
exports.notFound = (req, res) => res.render('404');
exports.serverError = (err, req, res, next) => res.render('500');

exports.newsletterSignup = (req, res) => {
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' });
};
exports.newsletterSignupProcess = (req, res) => {
  console.log('Form (from querystring): ' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  // 301은 permenent라서 다음 요청때 캐시를 통해 bypass할 수 있어서 이 경우 사용하면 안됨.
  res.redirect(303, '/newsletter-signup/thank-you');
};
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you');
