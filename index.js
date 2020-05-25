const logger = require('./logger');
const authenticate = require('./auth');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db'); 
const config = require('config');
const Joi = require('@hapi/joi');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use(authenticate);
app.use(helmet());

//Configuration
console.log('App Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password')); 

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled');
}

//DB work
dbDebugger('Starting the database...');

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
];

//GET
app.get('/', (request, response) => {
    response.send('Hello Simona!!!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...` );
});

app.get('/api/courses', (request, response) => {
    response.send(courses);
});

app.get('/api/courses/:id', (request, response) => {
    const course = courses.find(course => course.id === parseInt(request.params.id));
    if (!course) return response.status(404).send('The course is not found');
    response.send(course);
});

app.get('/api/posts/:year/:month', (request, response) => {
    response.send(request.params);
});

//CREATE

app.post('/api/courses/', (request, response) => {
    const { error } = validateCourse(request.body);
    if(error) return response.status(400).send(result.error);

    const course = {
        id: courses.length + 1, 
        name: request.body.name
    };
    courses.push(course);
    response.send(course);
});

//UPDATE
app.put('/api/courses/:id', (request, response) => {
    //look up an course if not exist, return 404
    const course = courses.find(course => course.id === parseInt(request.params.id));
    if (!course) return response.status(404).send('The course is not found');
   
    const { error } = validateCourse(request.body);
    if(error) return response.status(400).send(result.error);

    //update course
    course.name = request.body.name;
    //return the updated course
    response.send(course);

});

function validateCourse(course) {
    //validate
    //if invalid, return, 400
    const schema = {
        name: Joi.string().min(3).required()
    };

   return Joi.validate(course, schema);
}

//DELETE
app.delete('/api/courses/:id', (request, response) => {
    //look up the course, if does not exist look 404
    const course = courses.find(course => course.id === parseInt(request.params.id));
    if (!course) return response.status(404).send('The course is not found');
    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return
    response.send(course);
});