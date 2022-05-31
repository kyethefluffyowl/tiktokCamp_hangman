import './App.css';
// import React from "react";
import Hangman from "./hangman.js";

document.title="Hangman"
document.getElementsByTagName('link')[0].href = "/favicon.png";

function App() {
  return (
    <div className="App" id='appWindow'>
      <Hangman />
    </div>
  );
}

export default App;
