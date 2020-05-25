const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('Hello Simona!!!');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...` );
});

app.get('/api/courses', (request, response) => {
    response.send([1, 2, 3]);
});
//app.post();
//app.put();
//app.delete();