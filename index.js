const express = require('express');
const routerApi = require('./routes')
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (request, response) => {
  response.send("Hello, this is my server in Express");
});

routerApi(app);

app.listen(port, () => {
  console.log('My port ' + port);
});
