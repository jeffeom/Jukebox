// promptAndPlay
//
// Prompts the user to enter a song.
// Plays the entered song.
// Repeats when the song is complete.
//

// Get things going.

// var promptAndPlay = function() {
//   var songString = prompt("Welcome to JukeBox!\nEnter a song to play:");
//   var song = parseSong(songString);
//   playSong(song, 500, promptAndPlay);
// };

$(document).on('ready', function() {
  $("#play-button").click(function(){
    var songString = prompt("Welcome to JukeBox!\nEnter a song to play:");
    var song = parseSong(songString);
    $("#play-button").html("Playing...");
    $("#play-button").prop('disabled', true);
    playSong(song, 500, function(){
      $("#play-button").html("Play");
      $("#play-button").prop('disabled', false);
    });
  });
});
