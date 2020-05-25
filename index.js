const express = require('express');
const app = express();

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
];

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
//app.post();
//app.put();
//app.delete();