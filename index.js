const refs = {
  table: document.querySelector(".game"),
  gamePlayer: document.querySelector(".gamePlayer"),
  xWin: document.querySelector(".xwin"),
  oWin: document.querySelector(".owin"),
  allTD: document.querySelectorAll("td"),
};

const totalWins = {
  x: 0,
  o: 0,
}

let isWinner = false;
let countMove = 0;

refs.xWin.textContent = totalWins.x;
refs.oWin.textContent = totalWins.o;

let currentPlayer = "o";
refs.table.addEventListener("click", onTableClick);

function onTableClick(event) {
  if (event.target.nodeName !== "TD" || event.target.textContent) return;

  event.target.textContent = currentPlayer;
  checkWinner(currentPlayer);
  changePlayer();
  
}

function changePlayer() {
  if(isWinner) {
    currentPlayer = "o"
    refs.gamePlayer.textContent = `Current Move: ${currentPlayer}`
    isWinner = false
    return
  }
  currentPlayer === "o" ? (currentPlayer = "x") : (currentPlayer = "o");
  refs.gamePlayer.textContent = `Current Move: ${currentPlayer}`;
}
function checkWinner(player) {
  countMove+=1
  const values = [...refs.allTD].map((el) => el.textContent);
  console.log(values);
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let isDraw = true;

  combos.forEach((combo) => {
    if (
      values[combo[0]] === values[combo[1]] &&
      values[combo[1]] === values[combo[2]] &&
      values[combo[2]] === player
    ) {
      isDraw = false;
      winner(player);
    }
  });
  console.log(countMove);
  console.log(isDraw);
  if(countMove === 9 && isDraw) {
    alert("draw")
    countMove = 0;
    const clearTd = [...refs.allTD].forEach(td => td.textContent = "")
    isWinner = true
  }
}

function winner(player) {
  isWinner = true
  alert(`Congratulations!!! ${player} wins!!!`)
  console.log(`${player} wins`);
  winnerCounter(player)
  const clearTd = [...refs.allTD].forEach(td => td.textContent = "")
  countMove = 0;
}

function winnerCounter (playerWinner){
  totalWins[playerWinner] += 1
  refs.xWin.textContent = totalWins.x;
  refs.oWin.textContent = totalWins.o;
}