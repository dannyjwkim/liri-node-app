var inputCommand = process.argv[2];
var title = process.argv[3];
console.log(inputCommand);
console.log(title);

var keys = require("./keys.js")
var request = require("request");
var spotify = require("spotify");
var twitter = require("twitter");



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