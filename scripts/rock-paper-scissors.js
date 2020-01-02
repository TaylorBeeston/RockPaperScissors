const game = (() => {
  const score = { player: 0, computer: 0 };
  const MOVES = { ROCK: "Rock", PAPER: "Paper", SCISSORS: "Scissors" };

  const reset = () => {
    score.player = 0;
    score.computer = 0;
  };

  const getComputerMove = () => {
    const POSSIBLE_MOVES = [MOVES.ROCK, MOVES.PAPER, MOVES.SCISSORS];

    return POSSIBLE_MOVES[Math.floor(Math.random() * 3)];
  };

  // returns 1 if move1 wins, -1 if move2 wins, 0 if tie
  const compareMoves = (move1, move2) => {
    if (move1 === move2) return 0;
    if (move1 === MOVES.ROCK) return move2 === MOVES.SCISSORS ? 1 : -1;
    if (move1 === MOVES.PAPER) return move2 === MOVES.ROCK ? 1 : -1;
    if (move1 === MOVES.SCISSORS) return move2 === MOVES.PAPER ? 1 : -1;
  };

  const playRound = playerMove => {
    const computerMove = getComputerMove();
    const gameResult = compareMoves(playerMove, computerMove);

    if (gameResult > 0) {
      score["player"]++;
      return `You win! ${playerMove} beats ${computerMove}.`;
    } else if (gameResult < 0) {
      score["computer"]++;
      return `You lose! ${computerMove} beats ${playerMove}`;
    } else {
      return `It's a tie! You both played ${playerMove}`;
    }
  };

  return { MOVES, playRound, score, reset };
})();

const message = document.getElementById("message");
const score = document.getElementById("score");

const newGame = () => {
  game.reset();
  document.getElementById("rock").addEventListener("click", () => {
    playRound(game.MOVES.ROCK);
  });

  document.getElementById("paper").addEventListener("click", () => {
    playRound(game.MOVES.PAPER);
  });

  document.getElementById("scissors").addEventListener("click", () => {
    playRound(game.MOVES.SCISSORS);
  });
  message.innerText = "";
  score.innerHTML = `You: ${game.score.player}<br />Computer: ${game.score.computer}`;
};

const newPlayAgainButton = () => {
  const button = document.createElement("button");
  button.innerText = "Play Again?";
  button.addEventListener("click", newGame);

  return button;
};

const gameEnd = win => {
  message.innerHTML = `Game Over! You ${win}!<br />`;
  message.appendChild(newPlayAgainButton());
  document.querySelectorAll(".options > button").forEach(button => {
    // remove Event Listeners
    button.outerHTML = button.outerHTML;
  });
};

const playRound = move => {
  message.innerText = game.playRound(move);
  score.innerHTML = `You: ${game.score.player}<br />Computer: ${game.score.computer}`;
  if (game.score.player >= 5) gameEnd("win");
  if (game.score.computer >= 5) gameEnd("lose");
};

newGame();

