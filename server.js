const express = require('express');
const bodyParser = require('body-parser');
const volleyball = require('volleyball');

var app = express();

var PORT = process.env.PORT || 3000;

app.use('/', volleyball);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static(__dirname + '/app/public'));

require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);

const listener = app.listen(PORT, () => {
  console.log(`
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Link to home: http://localhost:${PORT}/
Link to survey: http://localhost:${PORT}/survey
Link to JSON: http://localhost:${PORT}/api/friends
`);
});
