//your JS code here. If required.
let player1;
let player2;

let currentPlayer = 1;

let gameOver = false;

let board = ["", "", "", "", "", "", "", "", ""];

let winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

let submit = document.getElementById("submit");

submit.addEventListener("click", function () {

    player1 = document.getElementById("player-1").value.trim();
    player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names");
        return;
    }

    document.getElementById("login").style.display = "none";

    document.getElementById("game").style.display = "block";

    document.querySelector(".message").innerText =
        player1 + ", you're up";

});

let cells = document.querySelectorAll(".cell");

cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        if (gameOver || cell.innerText !== "") {
            return;
        }

        let index = Number(cell.id) - 1;

        if (currentPlayer === 1) {

            cell.innerText = "x";
            board[index] = "x";

        } else {

            cell.innerText = "o";
            board[index] = "o";

        }

        checkWinner();

        if (gameOver) {
            return;
        }

        if (board.every(value => value !== "")) {
            document.querySelector(".message").innerText = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;

        let name = currentPlayer === 1 ? player1 : player2;

        document.querySelector(".message").innerText =
            name + ", you're up";

    });

});

function checkWinner() {

    for (let combination of winningCombinations) {

        let [a, b, c] = combination;

        if (
            board[a - 1] !== "" &&
            board[a - 1] === board[b - 1] &&
            board[b - 1] === board[c - 1]
        ) {

            let winner = board[a - 1] === "x" ? player1 : player2;

            document.querySelector(".message").innerText =
                winner + " congratulations you won!";

            gameOver = true;

            return;
        }
    }
}