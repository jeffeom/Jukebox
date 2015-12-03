// PLAYER
//
// Defines the following useful functions:
//
// - parseSong => Parse a song string into an array of note objects.
//                You wrote this for Jukebox-1
//
// - playSong  => Play a song when given an array of note objects.
//                This is the same function you were given in Jukebox-1
//

// parseNote
//
// Accepts a note string (e.g. "C#*2")
// Returns a note object (e.g. {pitch: "C#", beats: 2}).
// If a number of beats is not present, then it defaults to 1.
//
var parseNote = function(string) {
  var parts = string.split('*');
  var pitch = parts[0];
  var beats;

  if (typeof parts[1] === "undefined") {
    beats = 4;
  } else {
    beats = parseInt(parts[1]);
  }

  return {
    pitch: pitch,
    beats: beats
  };
};

// parseSong
//
// Accepts a song string (e.g. "A*1 C#*2 D*4")
// Returns an array of note objects.
//

var parseSong = function(string) {
  var noteStrings = string.split(' ');
  var notes = [];

  for (var i=0; i < noteStrings.length; i++) {
    notes.push( parseNote(noteStrings[i]) );
  }

  return notes;
  }

  var MIDDLE_OCTAVE = 4;
  var MIDDLE_A_FREQUENCY = 440.0;

  var PITCH_RATIOS = {
   "A"  : 1.0,
   "A#" : 16.0 / 15.0,
   "B"  : 9.0 / 8.0,
   "C"  : 6.0 / 5.0,
   "C#" : 5.0 / 4.0,
   "D"  : 4.0 / 3.0,
   "D#" : 45.0 / 32.0,
   "E"  : 3.0 / 2.0,
   "F"  : 8.0 / 5.0,
   "F#" : 5.0 / 3.0,
   "G"  : 9.0 / 5.0,
   "G#" : 15.0 / 8.0,
   "H"  : 1.0 * 2,
   "H#" : 16.0 * 2 / 15.0,
   "I"  : 9.0 * 2 / 8.0,
   "J"  : 6.0 * 2 / 5.0,
   "J#" : 5.0 * 2 / 4.0,
   "K"  : 4.0 * 2 / 3.0,
   "L"  : 3.0 * 2 / 2.0,
   "K#" : 45.0 * 2 / 32.0,
   "M"  : 8.0 * 2 / 5.0,
   "M#" : 5.0 * 2 / 3.0,
   "N"  : 9.0 * 2 / 5.0,
   "N#" : 15.0 * 2 / 8.0,
   "O"  : 1.0 * 4,
   "P#" : 16.0 * 4  / 15.0,
   "P"  : 9.0  * 4 / 8.0,
   "Q"  : 6.0  * 4 / 5.0,
   "Q#" : 5.0  * 4 / 4.0,
  };

  var ENHARMONIC_EQUIVALENTS = {
   "A"   : "A",
   "G##" : "A",
   "Bbb" : "A",

   "A#"  : "A#",
   "Bb"  : "A#",
   "Cbb" : "A#",

   "B"   : "B",
   "A##" : "B",
   "Cb"  : "B",

   "C"   : "C",
   "B#"  : "C",
   "Dbb" : "C",

   "C#"  : "C#",
   "B##" : "C#",
   "Db"  : "C#",

   "D"   : "D",
   "C##" : "D",
   "Ebb" : "D",

   "D#"  : "D#",
   "Eb"  : "D#",
   "Fbb" : "D#",

   "E"   : "E",
   "D##" : "E",
   "Fb"  : "E",

   "F"   : "F",
   "E#"  : "F",
   "Gbb" : "F",

   "F#"  : "F#",
   "E##" : "F#",
   "Gb"  : "F#",

   "G"   : "G",
   "F##" : "G",
   "Abb" : "G",

   "G#"  : "G#",
   "Ab"  : "G#",

   //new octave
   "H"   : "H",
   "G##" : "H",
   "Ibb" : "H",

   "H#"  : "H#",
   "Ib"  : "H#",
   "Jbb" : "H#",

   "I"   : "I",
   "H##" : "I",
   "Jb"  : "I",

   "J"   : "J",
   "I#"  : "J",
   "Kbb" : "J",

   "J#"  : "J#",
   "I##" : "J#",
   "Kb"  : "J#",

   "K"   : "K",
   "J##" : "K",
   "Lbb" : "K",

   "K#"  : "K#",
   "Lb"  : "K#",
   "Mbb" : "K#",

   "L"   : "L",
   "K##" : "L",
   "Mb"  : "L",

   "M"   : "M",
   "L#"  : "M",
   "Nbb" : "M",

   "M#"  : "M#",
   "L##" : "M#",
   "Nb"  : "M#",

   "N"   : "N",
   "M##" : "N",
   "Hbb" : "N",

   "N#"  : "N#",
   "Ob"  : "N#",

   "O"   : "O",
   "N##" : "O",
   "Pbb" : "O",

   "O#"  : "O#",
   "Pb"  : "O#",
   "Qbb" : "O#",

   "P"   : "P",
   "O##" : "P",
   "Qb"  : "P",

   "Q"   : "Q",
   "P#"  : "Q",
   "Rbb" : "Q",

   "Q#"  : "Q#",
   "B##" : "Q#",
   "Rb"  : "Q#",
  };

var SECONDS_PER_MINUTE = 60;
var MILLIS_PER_SECOND = 1000;
var CUTOFF_FREQUENCY = 200;
var RESONANCE_FREQUENCY = 100;
var WAVEFORM = 'square';

var NUM_HARMONICS = 50;

// Returns the frequency in hz for a given pitch.
// e.g. 'A' => 440
var pitchFrequency = function(pitch) {
  var normalizedPitch =  ENHARMONIC_EQUIVALENTS[pitch.toUpperCase()];
  return MIDDLE_A_FREQUENCY * PITCH_RATIOS[normalizedPitch];
};

// Play a tone with the given frequency in hz and duration in seconds,
// to the given audio context.
var playTone = function(frequency, duration, audioContext) {
  startTime = audioContext.currentTime;

  // Setup oscillators for first 10 harmonics.
  var harms = [];

  for (var i=1; i <= NUM_HARMONICS; i++) {
    var osc = audioContext.createOscillator();
    osc.type = WAVEFORM;
    osc.frequency.value = i * frequency;

    var gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.0, startTime);
    gain.gain.linearRampToValueAtTime(10/i, startTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, startTime + duration * 0.75);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    // Start the oscillators.
    osc.start(startTime);

    // Stop the oscillators when we're done.
    osc.stop(startTime + duration);

    harms.push(osc);
  }

};

// Setup a single shared audio context for the juke box.
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var jukeboxAudioContext = new AudioContext();

// Play a given song at "bpm" beats per minute.
// Calls "onComplete" when the song is over.
//
// A song should be an array of notes, each containing a pitch and
// number of beats, e.g:
// [{pitch: 'A', beats: 1}, {pitch: 'B#', beats: 2}, ...]
var playSong = function(song, bpm, onComplete) {

  if (typeof onComplete == "undefined") {
    onComplete = function(){};
  }

  var currNote = 0;

  var bps = bpm / SECONDS_PER_MINUTE;

  var playNextNote = function() {
    var note = song[currNote];
    var duration = note.beats / bps;
    var frequency = pitchFrequency(note.pitch);

    playTone(frequency, duration, jukeboxAudioContext);

    currNote++;

    if (currNote < song.length) {
      setTimeout(playNextNote, duration * MILLIS_PER_SECOND);
    } else {
      onComplete();
    }
  };

  playNextNote();

};
