const express = require('express');
const routerApi = require('./routes')
const {logErrors, errorHandler} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (request, response) => {
  response.send("Hello, this is my server in Express");
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port ' + port);
});
