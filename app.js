var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.engine('pug', require('pug').__express)
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.listen(3000);
console.log("Running at Port 3000");

function getPlaylists(callback){
  const clientId = "";
  const clientSecret = "";
  //requesting authorization from spotify api
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  let allPlaylists = [];
  let recentlyAired = [];
  let bestOfWeek = [];

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // Access playlists from The IV Drip's account
      let token = body.access_token;
      let options = {
        url: 'https://api.spotify.com/v1/users/04g30cjey9d0jerbgv7hzvnv4/playlists',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        let playlists = body.items;
        let counter = 0

        for (let index in playlists){
          let title = playlists[index].name;
          let url = playlists[index].external_urls.spotify;
          url = [url.slice(0,25), "embed/", url.slice(25)].join('');
          allPlaylists.push({"title": title, "url": url})
          if (counter < 3){
            recentlyAired.push({"title": title, "url": url});
          }
          if (title.includes("Best of the Week")){
            bestOfWeek.push({"title": title, "url": url});
          }
          counter++;
        }
        return callback(null, [allPlaylists, recentlyAired, bestOfWeek]);
      });
    }
  });
}

app.get('/', function(req, res){
  getPlaylists(function(err, data){
    if(err) return res.send(err);
    res.render("index", { allPlaylists: data[0], recentlyAired: data[1], bestOfWeek: data[2]});
  });
});

app.get('/search', function (req, res){
  getPlaylists(function(err, data){
    if(err) return res.send(err);
    res.render("search", { allPlaylists: data[0]});
  });
});

app.get('/howtolisten', function (req, res){
  res.render("listen");
});

app.get('/blog', function(req, res){
  res.render("blog");
});
