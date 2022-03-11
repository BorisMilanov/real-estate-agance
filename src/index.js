const express = require('express');
const app = express();

const port = 5000;
require('./config/hbsConfig')(app);

app.get('/', (req, res) => {
    res.render('test',{layout:false});
});

app.listen(port, () => {
    console.log(`The app is running on http://localhost:${port}/`)
})