/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

function initGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  //hide the dice in starting
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  //make score zero in starting
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//do something with dice when click on roll-btn
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (!!gamePlaying) {
    //1.random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";

    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    //3. Update the round score if the rolled number is not 1

    // if (dice === 6 && lastDice === 6) {
    //   //player looses score
    //   scores[activePlayer] = 0;
    //   document.querySelector("#score-" + activePlayer).textContent = "0";
    //   nextPlayer();
    // } else if (dice !== 1) {
    //   //add the score
    //   roundScore += dice;
    //   document.querySelector(
    //     "#current-" + activePlayer
    //   ).textContent = roundScore;
    // } else {
    //   nextPlayer();
    // }

    // lastDice = dice;

    if (dice1 !== 1 && dice2 !== 1) {
      //add the score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (!!gamePlaying) {
    //1. Add the current score to global score
    scores[activePlayer] += roundScore;

    //2. Update the UI for global
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winingScore;
    if (input) {
      winingScore = input;
    } else {
      winingScore = 100;
    }

    //3. Check if player won the game
    if (scores[activePlayer] >= winingScore) {
      gamePlaying = false;
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  document.querySelector(".btn-hold").style.display = "none";
  document.querySelector(".btn-roll").style.display = "none";
  setTimeout(function () {
    roundScore = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

    document.querySelector(".btn-hold").style.display = "block";
    document.querySelector(".btn-roll").style.display = "block";
  }, 1000);
}

document.querySelector(".btn-new").addEventListener("click", initGame);

initGame();
