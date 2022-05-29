import React, { Component } from "react";
import { randomWord, randomWordWeb } from "./RandomWord.js";
import "./hangman.css";
import image0 from "./images/base.svg";
import image1 from "./images/1.svg";
import image2 from "./images/2.svg";
import image3 from "./images/3.svg";
import image4 from "./images/4.svg";
import image5 from "./images/5.svg";
import image6 from "./images/6.svg";
const confetti = require('canvas-confetti');

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [image0, image1, image2, image3, image4, image5, image6],
  };

  constructor(props) {
    super(props);
    this.state = {
      noOfWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      noOfWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : "_ "));
  }

  handleGuess(evt) {
    let letter = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      noOfWrong: st.noOfWrong + (st.answer.includes(letter) ? 0 : 1),
    }));

    // if (letter === 'z') {
    //     console.log("You clicked the letter Z");
    //     console.log("The word in hangman.js is: " + randomWordWeb());
    //     this.setState({noOfWrong: 999})
    // }
  }

  generateKeypad() {

    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
        <button
          className="Hangman-keys"
          key={letter}
          value={letter}
          onClick={this.handleGuess}
          disabled={this.state.guessed.has(letter)}
        >
          {letter}
        </button>
      ));
  }

  generateLives() {
    
      let content = [];
      for (let i = 0; i<this.props.maxWrong - this.state.noOfWrong; i++) {
          content.push("🤍");
      }
      return content;
    }

    generateConfetti() {
    var myCanvas = document.createElement('canvas');
    document.body.appendChild(myCanvas);
    myCanvas.setAttribute('class', 'confettiCanvas');
    document.getElementsByClassName("confettiCanvas")[0].removeAttribute("height");
    
    var myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true
    });

    

// confetti function YAY
setTimeout(10);
    myConfetti({
      particleCount: 50,
      angle:60,
      spread: 55,
      origin: {x:0}
    });

    myConfetti({
      particleCount: 50,
      angle:120,
      spread: 55,
      origin: {x:1}
    });

    myConfetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {x: Math.random(), y: Math.random() - 0.2}
      });

    }


  render() {
    const gameOver = this.state.noOfWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState = this.generateKeypad();
    if (isWinner) gameState = "WOW! You sure do have a way with words. :) Again?";
    if (isWinner) {this.generateConfetti();}
    if (gameOver) gameState = "It's okay! You can try again! :)";
    let restart = gameOver || isWinner;
    let livesLeft = this.generateLives();
    return (
      <div className="Hangman">
        <h2>Hangman</h2> {/* Title of the page */}
        <img src={this.props.images[this.state.noOfWrong]} alt="HangMan" id="hangman-image"/>
        <p id="guessRemaining">{livesLeft}</p>
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p id="Hangman-keyboard">{gameState}</p>
        {restart && (
          <button id="reset" onClick={this.reset}>
            Restart?
          </button>
        )}
      </div>
    );
  }
}

export default Hangman;