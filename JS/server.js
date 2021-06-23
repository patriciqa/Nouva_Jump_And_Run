var express = require('express')
const app = express();
const fs = require('fs');
const cors = require('cors');
const { json } = require('body-parser');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {

  // read File
  fs.readFile('./Highscore/highscore.json', 'utf8', (err, data) => {

    try {
      let result = JSON.parse(data);
      let sortedScores = result.highscores.sort(function (a, b) { return b.score - a.score });
      let bestScores = sortedScores.slice(0, 5);
      res.send(bestScores);
    } catch (error) {
      res.status(404).end();
    }
  });
});

//write into file
app.post('/', (req, resp) => {

  // read File
  fs.readFile('./Highscore/highscore.json', 'utf8', (err, data) => {

    try {
      let json;
      if (data != "") {
        json = JSON.parse(data);
      } else {
        json = { highscores: [] };
      }
      json.highscores.push(req.body);

      fs.writeFile('./Highscore/highscore.json', JSON.stringify(json), (err_2) => {
        if (err_2) {
          console.error(err_2);
          resp.status(404).end();
        } else {
          resp.status(200).end();
        }
      });

    } catch (error) {
      resp.status(404).end();
    }
  });
})

app.listen(8080);