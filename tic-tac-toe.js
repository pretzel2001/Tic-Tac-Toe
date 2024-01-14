function audio() {
    const click = new Audio("mouse-click-effect.wav");
    click.play();
}

let playerInput = document.getElementById('status');
let restartbtn = document.getElementById('restart');
let boxes = Array.from(document.getElementsByClassName('box'));

const o_letter = "O";
const x_letter = "X";
let firstLetter = x_letter;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClick));
}

function boxClick(hehe) {
    const id = hehe.target.id;
    if (!spaces[id]) {
        spaces[id] = firstLetter;
        hehe.target.innerText = firstLetter;
        if (win()) {
            playerInput.innerText = `${firstLetter} has won!`;
        }
        else {
            firstLetter = firstLetter == x_letter ? o_letter : x_letter;
            if (spaces.every(space => space !== null) && !win()) {
                playerInput.innerText = 'It\'s a Tie!';
            } else {
                playerInput.innerText = `${firstLetter}'s turn`;
            }
        }
    }
}

const winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function win() {
    for (const condition of winCombo) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

restartbtn.addEventListener('click', restart);

function restart() {
    audio();
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
    });
    playerInput.innerText = 'Tic Tac Toe';
    firstLetter = x_letter;
}

startGame();
