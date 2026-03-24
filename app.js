const express = require('express');
const app = express();
const port = 3000;
const tasksRoutes = require('./routes/tasksRoutes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', tasksRoutes);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;