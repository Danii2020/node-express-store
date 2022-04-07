const express = require('express');
const routerApi = require('./routes')
const cors = require('cors');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    (whiteList.includes(origin))
      ? callback(null, true)
      : callback(new Error('Access denied'));
  }
}
app.use(cors(options));

app.get('/', (request, response) => {
  response.send("Hello, this is my server in Express");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port ' + port);
});
