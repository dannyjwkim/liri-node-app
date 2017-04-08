var fs = require("fs");
var keys = require("./keys.js")
var request = require("request");
var spotify = require("spotify");
var twitter = require("twitter");

var inputCommand = process.argv[2];
var twitterUsername = process.argv[3];
var songTitle = process.argv[3];
var movie = process.argv[3];

switch(inputCommand) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  };

//Twitter function
function myTweets(){

  var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  if(!twitterUsername){
    twitterUsername = "potus";
  }

  var params = {screen_name: twitterUsername};

  client.get('statuses/user_timeline', params, function(error, data, response) {
    if (!error) {
      for(var i = 0; i < data.length; i++) {
        var twitterResults = 
        "@" + data[i].user.screen_name + ": " + 
        data[i].text + "\r\n" + 
        data[i].created_at + "\r\n" + 
        "========================= " + (i+1) + " =========================" + "\r\n";

        console.log(twitterResults);

        log("===================================================== \r\n" + twitterResults + "\r\n");

      }
    } else {
        console.log("Error :"+ error);
        return;
    }
  });
}

//Spotify function
function spotifyThisSong(songTitle) {

  if(!songTitle){
    songTitle = "The Sign - Ace of Base";
  }

  params = songTitle;

  spotify.search({ type: "track", query: params }, function(error, data) {
    if(!error){
      var songInfo = data.tracks.items;
      for (var i = 0; i < 3; i++) {
        if (songInfo[i] != undefined) {
          var spotifyResults =
          "Artist: " + songInfo[i].artists[0].name + "\r\n" +
          "Song: " + songInfo[i].name + "\r\n" +
          "Album the song is from: " + songInfo[i].album.name + "\r\n" +
          "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
          "========================= " + (i+1) + " =========================" + "\r\n";

          console.log(spotifyResults);

          log("===================================================== \r\n" + spotifyResults + "\r\n");

        }
      }
    } else {
        console.log("Error :"+ error);
        return;
    }
  });

};

//Movie function
function movieThis(){

  if(!movie){
    movie = "Mr. Nobody";
  }

  params = movie

  request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {

    if (!error && response.statusCode == 200) {

      var movieObject = JSON.parse(body);

      var movieResults =
      "========================= " + "Movie Info" + " =========================" + "\r\n" +
      "Title: " + movieObject.Title + "\r\n" +
      "Year: " + movieObject.Year + "\r\n" +
      "Imdb Rating: " + movieObject.imdbRating+ "\r\n" +
      "Country: " + movieObject.Country + "\r\n" +
      "Language: " + movieObject.Language + "\r\n" +
      "Plot: " + movieObject.Plot + "\r\n" +
      "Actors: " + movieObject.Actors + "\r\n" +
      "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
      "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" +
      "========================== " + "The End" + " ===========================";

      console.log(movieResults);

      log(movieResults + "\r\n");

    } else {
        console.log("Error :"+ error);
        return;
    }

  });

};

//do-what-it-says function
function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function (error, data) {

    if (!error) {
      var doWhatItSaysArray = data.split(",");
      spotifyThisSong(doWhatItSaysArray[1]);
    } else {
      console.log("Error occurred" + error);
    }

  });

};

//log function
function log(searchResults){

  fs.appendFile("log.txt", searchResults, function (error) {
    if (error) throw error;
  });

}

