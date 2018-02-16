require("dotenv").config();
var keys = require('./key.js')

var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {screen_name: 'nodejs'};

var command = process.argv[2]
var input = process.argv

var what = []
for (var i = 3; i < input.length; i++) {
	what.push(input[i])
}

what = what.join(" ")


//----------------------------------------twitter function----------------------------------------
function tweets(){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < 19; i++) {
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
				console.log("-----------------------------------------------------")
			}
		}
	});
}


//----------------------------------------spotify function----------------------------------------
function spotifyit(){
	if (what.length !== 0) {
		spotify.search({ type: 'track', query: what, limit: 1 }, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			console.log("Artist: "+JSON.stringify(data.tracks.items[0].artists[0].name))
			console.log("Track: "+JSON.stringify(data.tracks.items[0].name))
			console.log("Link: "+JSON.stringify(data.tracks.items[0].href))
			console.log("Album: "+JSON.stringify(data.tracks.items[0].album.name))
		});
	}
	else {
		spotify.search({ type: 'track', query: 'The Sign Ace of Base', limit: 1 }, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			console.log("Artist: "+JSON.stringify(data.tracks.items[0].artists[0].name))
			console.log("Track: "+JSON.stringify(data.tracks.items[0].name))
			console.log("Link: "+JSON.stringify(data.tracks.items[0].href))
			console.log("Album: "+JSON.stringify(data.tracks.items[0].album.name))
		});
	}
}


//----------------------------------------omdb function----------------------------------------
function movie(){
	request("http://www.omdbapi.com/?t="+what+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

		if (!error && response.statusCode === 200) {

			console.log("Title: "+JSON.stringify(JSON.parse(body).Title))
			console.log("Released: "+ JSON.stringify(JSON.parse(body).Released))
			console.log("IMDB Rating: "+JSON.stringify(JSON.parse(body).imdbRating))
			console.log("Rotten Tomatoes Rating: "+ JSON.stringify(JSON.parse(body).Ratings[1]["Value"]))
			console.log("Production Country: "+ JSON.stringify(JSON.parse(body).Country))
			console.log("Language: "+ JSON.stringify(JSON.parse(body).Language))
			console.log("Plot: "+ JSON.stringify(JSON.parse(body).Plot))
			console.log("Actors: "+ JSON.stringify(JSON.parse(body).Actors))
		}
	});
}





if (command === "do-what-it-says") {
	var data = fs.readFileSync('random.txt','utf8');
	var dataArray = data.split(",");

	command = dataArray[0];
	what = dataArray[1];
}

switch(command) {

	case "my-tweets":
	tweets();
	break;

	case "spotify-this-song":
	spotifyit();
	break;

	case "movie-this":
	movie();
	break;

	default:
	console.log("invalid command");
}
