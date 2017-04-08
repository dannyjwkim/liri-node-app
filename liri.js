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
	case "my-tweets": myTweets(); 
		break;
	case "spotify-this-song": spotifyThisSong(); 
		break;
	// case "movie-this": movieThis(); 
	// 	break;
	// case "do-what-it-says": doWhatItSays(); 
	// 	break;
	// // Instructions displayed in terminal to the user
	// default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
	// 	"1. my-tweets 'any twitter name' " +"\r\n"+
	// 	"2. spotify-this-song 'any song name' "+"\r\n"+
	// 	"3. movie-this 'any movie name' "+"\r\n"+
	// 	"4. do-what-it-says."+"\r\n"+
	// 	"Be sure to put the movie or song name in quotation marks if it's more than one word.");
	};

//Twitter function
function myTweets(){

	var client = new twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
	});

	var twitterUsername = process.argv[3];

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

			// log(twitterResults); // calling log function

			}	  
		} else {
				console.log("Error :"+ error);
				return;
		}
	});
}

//Spotify function
function spotifyThisSong(songTitle) {

	var songTitle = process.argv[3];

	if(!songTitle){
			songTitle = "The Sign";
	}

	params = songTitle;
	spotify.search({ type: "track", query: params }, function(error, data) {
		if(!error){
			var songInfo = data.tracks.items;
			for (var i = 0; i < 5; i++) {
				if (songInfo[i] != undefined) {
					var spotifyResults =
					"Artist: " + songInfo[i].artists[0].name + "\r\n" +
					"Song: " + songInfo[i].name + "\r\n" +
					"Album the song is from: " + songInfo[i].album.name + "\r\n" +
					"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
					"========================= " + (i+1) + " =========================" + "\r\n";
					console.log(spotifyResults);

					// log(spotifyResults); // calling log function

				}
			}
		}	else {
			console.log("Error :"+ error);
			return;
		}
	});
};