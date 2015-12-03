// parseSong
// this takes a whole song string and returns an array of note objects. The function should use the parseNote function
var parseSong = function(string){
  if (string){
    var notes_split = note.split(" ");
    var songs = [];

    for (var i=0; i< notes_split.length; i++){
      songs[i] = parseNote(notes_split[i]);
    }
    return songs;
  }
  else {
    alert("You did not enter anything. Please try it again");
  }
}
// parseNote
// parseNote("C#*2") -> this will pitch 'C#' with beat 2 if user doesnt provide a number of beats then set beats to 1.
// e.g. (C#*2) will be {pitch: 'C#', beats: 2}
// string -> hash
var parseNote = function(string){

  var notes = string.split("*");
  var song = {};

  song["pitch"] = notes[0];
  song["beats"] = notes[1];

  if (song["beats"] === undefined) {
      song["beats"] = 1;
  }
return song;
}

var onComplete = function (){
  note = prompt("Enter your song notes: ");
  playSong(parseSong(note),400,onComplete);
  console.log("Song finished playing");
  }
