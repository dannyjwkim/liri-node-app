var fs = require("fs");
var keys = require("./keys.js")
var request = require("request");
var spotify = require("spotify");
var twitter = require("twitter");

var inputCommand = process.argv[2];
// var title = process.argv[3];
// console.log(inputCommand);
// console.log(title);

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
	// Instructions displayed in terminal to the user
	default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
		"1. my-tweets 'any twitter name' " +"\r\n"+
		"2. spotify-this-song 'any song name' "+"\r\n"+
		"3. movie-this 'any movie name' "+"\r\n"+
		"4. do-what-it-says."+"\r\n"+
		"Be sure to put the movie or song name in quotation marks if it's more than one word.");
	};

var client = new twitter({
consumer_key: keys.twitterKeys.consumer_key,
consumer_secret: keys.twitterKeys.consumer_secret,
access_token_key: keys.twitterKeys.access_token_key,
access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {screen_name: 'Bob Loblaw Bootcamp'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});