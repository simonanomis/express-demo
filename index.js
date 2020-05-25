const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('Hello Simona');
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});

app.get('/api/courses', (request, response) => {
    response.send([1, 2, 3]);
});
//app.post();
//app.put();
//app.delete();