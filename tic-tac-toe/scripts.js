function player(name, symbol) {
    return {name, symbol};
}

const gameBoard = (() => {
    let board = [["", "", "",], ["", "", "",], ["", "", "",]]

    const placeSymbol = (row, col, symbol) => {
        board[row][col] = symbol;
    }

    const isWin = (symbol) => {
        //check row wins
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == symbol && board[i][1] == symbol && board[i][2] == symbol) {
                return true;
            }
        }

        //check column wins
        for (let i = 0; i < 3; i++) {
            if (board[0][i] == symbol && board[1][i] == symbol && board[2][i] == symbol) {
                return true;
            }
        }

        //check diagonal wins
        if (board[1][1] == symbol) {
            if (board[0][0] == symbol && board[2][2] == symbol) {
                return true;
            }
            if (board[2][0] == symbol && board[0][2] == symbol) {
                return true;
            }
        }

        //no win found
        return false;
    }

    return { placeSymbol, isWin }
})();


const gameLogic = (() => {
    const playerOne = player("Player One", "X");
    const playerTwo = player("Player Two", "O");

    console.log(playerOne)

    const swapPlayer = () => {
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne
    }

    let currentPlayer = playerOne;

    const getCurrentPlayerSymbol = () => {return currentPlayer.symbol};

    const playRound = (row, col) => {
        gameBoard.placeSymbol(row, col, currentPlayer.symbol);

        //check for win
        if (gameBoard.isWin(currentPlayer.symbol)) {
            console.log(currentPlayer.name + " has won!")
        } else {
            swapPlayer()
        }
    }
    return ({ getCurrentPlayerSymbol, playRound })
})();

const screenLogic = (() => {
    const makeBoard = (() => {
        const board = document.getElementById("board")

        for (let row = 0; row < 3; row++) {
            const rowDiv = document.createElement("div");

            for (let col = 0; col < 3; col++) {
                const cell = document.createElement("p");

                cell.addEventListener("click", function () {
                    if (this.textContent == "") {
                        console.log(row)
                        gameLogic.playRound(row, col);
                        this.textContent = gameLogic.getCurrentPlayerSymbol()
                    }
                })

                rowDiv.appendChild(cell)
            }

            board.appendChild(rowDiv)
        }
    })();
})();