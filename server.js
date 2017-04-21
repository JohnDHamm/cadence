'use strict';

const express = require('express');

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

app.set('port', port);

app.use(express.static('client'));
app.use(bodyParser.json());




app.listen(port, () => {
	console.log(`Listening on port ${port}`)
});
