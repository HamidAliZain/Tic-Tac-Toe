let cells = document.querySelectorAll('.cell')
let heading = document.querySelector('.heading')
let restart = document.querySelector('.restart')
let stautsText = document.querySelector('.stautsText')
let ScoreX = document.querySelector('.scoreX')
let ScoreO = document.querySelector('.scoreO')
let resetScore = document.querySelector('.resetScore')
let arr = [
    '/12769129.png',
    '1535162072.png',
    '/blonde-1300066_1280.webp',
    '/dc72ba6f23a6744d9d09a8812b6344c6.gif',
    '/rajput-man-holding-sword-in-hand-2660606-2231729.webp',
    '/rajput-man-is-showing-swag-2660609-2231732.png',
    '/Raven.webp',
    '/cd358046bbc1bb105438a559afa9f80d.gif',

];

let winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let options = ["", "", "", "", "", "", "", "", ""]
let runn = false
let currPlayer = 'X'
let scoreX = 0
let scoreO = 0
intilaize()
function intilaize() {
    cells.forEach(cell => cell.addEventListener('click', cellCicked));
    restart.addEventListener('click', Restart);
    resetScore.addEventListener('click', ResetScore)
    stautsText.textContent = `Player 1 turn`;
    runn = true
}
function cellCicked() {
    const cellIndex = this.getAttribute("cellIndex")
    if (options[cellIndex] != "" || !runn) {
        return;
    };
    updatePlayer(this, cellIndex)
    CheckWin()
}

function updatePlayer(cell, index) {
    options[index] = currPlayer;
    cell.textContent = currPlayer;
}
function changePlayer() {
    if (currPlayer == "X") {
        currPlayer = "O",
            stautsText.textContent = `Player 2 turn `;
    } else {
        currPlayer = "X"
        stautsText.textContent = `Player 1 turn`
    }
}
function CheckWin() {
    let roundWon = false
    for (let i = 0; i < winCondition.length; i++) {
        const condition = winCondition[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true
            break;
        }
    } if (roundWon) {
        if (currPlayer == "X") {
            stautsText.textContent = `Player 1 win`
            ScoreX.textContent = scoreX += 1
            playerWin()
       
        } else {
            stautsText.textContent = `Player 2 win`
            ScoreO.textContent = scoreO += 1
            playerWin()
        }
        runn = false
    } else if (!options.includes('')) {
        stautsText.textContent = `Draw `
        runn = false
    } else { changePlayer() }
}
function Restart() {
    currPlayer = "X"
    stautsText.textContent = `Player 1 turn`
    options = ["", "", "", "", "", "", "", "", ""]
    cells.forEach(cell => cell.textContent = '')
    runn = true
    heading.innerHTML = 'Tic Tac Toe'
}

function ResetScore() {
    ScoreX.textContent = 0;
    ScoreO.textContent = 0;
    Restart()
}
function playerWin() {
    let shuffle = Math.floor(Math.random() * arr.length)
    let img = `
        <img src="./image/${arr[shuffle]}" class="w-44 mx-auto" alt="Player 1 Win" >`
 
    heading.innerHTML = img

}
