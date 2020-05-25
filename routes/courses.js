const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
];

//GET
router.get('/', (request, response) => {
    response.send(courses);
});

router.get('/:id', (request, response) => {
    const course = courses.find(course => course.id === parseInt(request.params.id));
    if (!course) return response.status(404).send('The course is not found');
    response.send(course);
});

//CREATE

router.post('/', (request, response) => {
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
router.put('/:id', (request, response) => {
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
router.delete('/:id', (request, response) => {
    //look up the course, if does not exist look 404
    const course = courses.find(course => course.id === parseInt(request.params.id));
    if (!course) return response.status(404).send('The course is not found');
    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return
    response.send(course);
});

module.exports = router;