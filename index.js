const logger = require('./middleware/logger');
const authenticate = require('./auth');
const courses = require('./routes/courses');
const home = require('./routes/home');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db'); 
const appDebugger = require('debug')('app:app'); 
const config = require('config');
const Joi = require('@hapi/joi');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use(authenticate);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Configuration
appDebugger('App Name: ' + config.get('name'));
appDebugger('Mail Server: ' + config.get('mail.host'));
appDebugger('Mail Password: ' + config.get('mail.password')); 

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled');
}

//DB work
dbDebugger('Starting the database...');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    startupDebugger(`Listening on port ${port}...` );
});

app.get('/api/posts/:year/:month', (request, response) => {
    response.send(request.params);
});