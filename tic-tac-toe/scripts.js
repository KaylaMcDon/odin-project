function player(name, symbol) {
    return { name, symbol };
}

const gameBoard = (() => {
    let board = [["", "", "",], ["", "", "",], ["", "", "",]];

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

    const resetBoard = (() => {
        board = [["", "", "",], ["", "", "",], ["", "", "",]];
    })

    return { placeSymbol, isWin, resetBoard }
})();


const gameLogic = (() => {
    const playerOne = player("Player One", "X");
    const playerTwo = player("Player Two", "O");

    const updatePlayerNames = (p1Name, p2Name) => {
        playerOne.name = p1Name == "" ? "Player One" : p1Name;
        playerTwo.name = p2Name == "" ? "Player Two" : p2Name;
        console.log(playerOne)
        console.log(playerTwo)
    }

    const swapPlayer = () => {
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne
    }

    let currentPlayer = playerOne;
    const getCurrentPlayerSymbol = () => { return currentPlayer.symbol };
    const getCurrentPlayerName = () => { return currentPlayer.name };

    const playRound = (row, col) => {
        gameBoard.placeSymbol(row, col, currentPlayer.symbol);

        //check for win
        if (gameBoard.isWin(currentPlayer.symbol)) {
            screenLogic.updateStatus(getCurrentPlayerName() + " has won!")
        } else {
            swapPlayer()
            screenLogic.updateStatus()
        }
    }
    return ({ getCurrentPlayerSymbol, getCurrentPlayerName, playRound, updatePlayerNames })
})();

const screenLogic = (() => {
    const board = document.getElementById("board")
    
    const makeBoard = (() => {
    
        for (let row = 0; row < 3; row++) {
            const rowDiv = document.createElement("div");
            rowDiv.setAttribute("class", "row")

            for (let col = 0; col < 3; col++) {
                const cell = document.createElement("p");
                cell.setAttribute("class", "cell")

                cell.addEventListener("click", function () {
                    if (this.textContent == "" && !gameBoard.isWin(gameLogic.getCurrentPlayerSymbol())) {

                        this.textContent = gameLogic.getCurrentPlayerSymbol()
                        gameLogic.playRound(row, col);
                    }
                })

                rowDiv.appendChild(cell)
            }

            board.appendChild(rowDiv)
        }
    });

    const initialSetup = (() => {
        makeBoard();

        const updateNameButton = document.getElementById("ApplyNames");
        updateNameButton.addEventListener("click", () => {
            const p1Name = document.getElementById("playerOneName").value;
            const p2Name = document.getElementById("playerTwoName").value;
            gameLogic.updatePlayerNames(p1Name, p2Name)
            updateStatus()
        })

        const resetButton = document.getElementById("resetButton");
        resetButton.addEventListener("click", () => {
            while (board.hasChildNodes()){board.removeChild(board.lastChild)}
            gameBoard.resetBoard();
            makeBoard();
            updateStatus();
        })
    })();

    const updateStatus = ((phrase = `It is currently ${gameLogic.getCurrentPlayerName()}'s turn`) => {
        const status = document.getElementById("status");
        status.textContent = phrase;
    })

    return ({ updateStatus })
})();