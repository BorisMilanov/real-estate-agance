const express = require('express');
const { PORT } = require('./constants');

const app = express();

const routes = require('./routes');

require('./config/express-config')(app);
require('./config/hbs-config')(app);


app.use(routes);


app.listen(PORT, () => {
    console.log(`The app is running on http://localhost:${PORT}/`)
});