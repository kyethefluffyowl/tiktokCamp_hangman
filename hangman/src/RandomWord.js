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
    "a"
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