//library imports
const express = require('express');
const path = require('path');
//file imports
//variables
const app = express();
const port = 3000;
const midware = express.static(path.join(__dirname, '../client/dist/'));

app.use(midware);

app.listen(port, ()=> {
  console.log(`Server listening at http://localhost:${port}`);
})