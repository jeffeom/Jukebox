$(document).ready(function() {

  if($("li:eq(0)").html() === undefined){
    console.log("Enter a Song to Play");
  }else{
    console.log("Now Playing " + songName);
  }

  $("#play-button").click(function(){
      var songString = $("li:eq(0)").attr("value");
      var song = parseSong(songString);
      var songName = $("li:eq(0)").html();
      console.log("Now Playing " + songName);
      playSong(song, 500, exist = function(){
        if($("li:eq(0)").html() === undefined){
          console.log("Enter a Song to Play");
        }else{
          $("li:eq(0)").remove();
          var songString = $("li:eq(0)").attr("value");
          if($("li:eq(0)").html() === undefined){
            console.log("Enter a Song to Play");
          }
          var song = parseSong(songString);
          var songName = $("li:eq(0)").html();
          console.log("Now Playing " + songName);
          playSong(song, 500, exist);
        }
      });
    });

  $("input[value='Add Song']").on("click", function(){
    event.preventDefault();
    if($("input[name = 'names']").val() != "" && $("input[name = 'notes']").val() != ""){
      var songName = $("input[name = 'names']").val();
      var songNote = $("input[name = 'notes']").val();
      $("#song-queue").prepend("<li>" + songName + "</li>");
      $("li:eq(0)").attr("value", songNote);
    }
  });
});
