var outputF;

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

let wordBank = [
    "testing",
    "words",
    "timetable",
    "mayor",
    "houseplant",
    "transform",
    "net",
    "upset",
    "firefighter",
    "damage",
    "outlet",
    "achievement",
    "depend",
    "extreme",
    "raincoat",
    "agreement",
    "shadow",
    "circle",
    "delivery",
    "attack",
    "illusion",
    "critical",
    "number",
    "formula",
    "convention",
    "corruption",
    "standard",
    "flowers",
    "bag",
    "wife",
    "gear",
    "objection",
    "return",
    "glass",
    "wealth",
    "hearsay",
    "honour",
    "revive",
    "sink",
    "float",
    "motivation",
    "drive",
    "power",
    "hungry",
    "devour",
    "burn",
    "storm",
    "allowance",
    "prisoner",
    "metal",
    "stumble",
    "litigation",
    "report",
    "subject",
    "charismatic",
    "hate",
    "love",
    "berry",
    "husband",
    "insert",
    "small",
    "flu",
    "outbreak",
    "body",
    "smart",
    "viable",
    "capital",
    "traction",
    "tractor",
    "trance",
    "bathtub",
    "pastel",
    "prince",
    "pay",
    "penny",
    "vertical",
    "skin",
    "consumer",
    "separate",
    "good",
    "tiktok",
    "camp",
    "category",
    "serve",
    "plot",
    "frog",
    "wild",
    "update",
    "install",
    "coast",
    "jelly",
    "steam",
    "chimney",
    "floor",
    "host",
    "burn",
    "disaster",
    "tone", 
    "ghost",
    "plan",
    "embarrassment",
    "wallet",
    "dribble",
    "fold",
    "franchise",
    "entry",
    "copyright",
    "memorandum",
    "series",
    "acute",
    "spy",
    "colon"
  ];
  
  function randomWord() {
    return wordBank[
      Math.floor(Math.random() * wordBank.length)
    ];
  }

  function randomWordWeb() {
    getJSON('https://random-word-api.herokuapp.com/word',
    function(err, data) {
    if (err !== null) {
        alert('Something went wrong while retrieving the word: ' + err);
    } else {
        //alert('Your word of the day is: ' + data);
        let outputF = data;
        alert('Your word of the day is: ' + data + "| outputF: " + outputF);
    }
    });
    return outputF;
  }
  
  export { randomWord, randomWordWeb };