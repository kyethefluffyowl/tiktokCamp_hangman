import React, { Component } from "react";
import { randomWord, randomWordWeb } from "./RandomWord.js";
import "./hangman.css";
import image0 from "./images/base.png";
import image1 from "./images/1.png";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.png";
import image5 from "./images/5.png";
import image6 from "./images/6.png";

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
    if (letter === 'z') {
        console.log("You clicked the letter Z");
        console.log("The word in hangman.js is: " + randomWordWeb());
        this.setState({noOfWrong: 999})
    }
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

  render() {
    const gameOver = this.state.noOfWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState = this.generateKeypad();
    if (isWinner) gameState = "WOW! You sure do have a way with words. :) Again?";
    if (gameOver) gameState = "Better Luck Next Time";
    let restart = gameOver || isWinner;
    return (
      <div className="Hangman">
        <h2>Hangman</h2> {/* Title of the page */}
        <img src={this.props.images[this.state.noOfWrong]} alt="HangMan" id="hangman-image"/>
        <p>
          Guesses Remaining: {this.props.maxWrong - this.state.noOfWrong} /{" "}{this.props.maxWrong}
        </p>
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