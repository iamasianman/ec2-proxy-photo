require('newrelic');
const express = require('express');
const port = 3000;
const path = require('path');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.get('/restaurants/:id/photos', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/api/restaurants/:id/photos', (req, res) => {
  const { id } = req.params;
  axios.get(`http://localhost:3060/api/restaurants/${id}/photos`)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(500).send();
    });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports.app = app;



// app.get('/:id', (req, res) => {
//     if (!req.params.id) {
//       res.status(400);
//       res.end();
//     } else {
//       res.sendFile('index.html', { root: path.resolve(__dirname, '../client/public') });
//     }
//   });