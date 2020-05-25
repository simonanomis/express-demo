const express = require('express');
const app = express();
app.use(express.json());

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
    if (!course) response.status(404).send('The course is not found');
    response.send(course);
});
app.get('/api/posts/:year/:month', (request, response) => {
    response.send(request.params);
});

//CREATE

app.post('/api/courses/', (request, response) => {
    const course = {
        id: courses.length + 1, 
        name: request.body.name
    };
    courses.push(course);
    response.send(course);
});
//app.put();
//app.delete();