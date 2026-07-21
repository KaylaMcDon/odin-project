import { Ship } from "./battleship.js";


export const DOMLogic = (() => {
    const cleargameboard = (divID) => {
        const gameboard = document.getElementById(divID);
        while (gameboard.hasChildNodes()) {
            gameboard.removeChild(gameboard.lastChild);
        }
    };

    const displayEnemyGameboard = (player) => {
        const divID = player.getBoardID();
        cleargameboard(divID);
        const screenBoard = document.getElementById(divID);

        const gameboard = player.getBoard();
        for (let row = 0; row < gameboard.getSize(); row++) {
            for (let col = 0; col < gameboard.getSize(); col++) {
                const square = document.createElement("div");
                square.setAttribute("class", "square");

                if (gameboard.getSquare(row, col) == "hit") {
                    const marker = document.createElement("div");
                    marker.setAttribute("class", "hitMarker");
                    square.appendChild(marker);
                } else if (gameboard.getSquare(row, col) == "miss") {
                    const marker = document.createElement("div");
                    marker.setAttribute("class", "missMarker");
                    square.appendChild(marker);
                } else {
                    square.addEventListener("click", () => {
                        const message = player.attackBoard(row, col);
                        displayEnemyGameboard(player);

                        const status = document.getElementById("status");
                        if (player.hasLost()) {
                            status.textContent = "You win!";
                        } else {
                            status.textContent = message;
                        }
                    })
                }

                screenBoard.appendChild(square);
            }
        }
    };

    const displayFriendlyGameboard = (player) => {
        const divID = player.getBoardID();
        cleargameboard(divID);
        const screenBoard = document.getElementById(divID);

        const gameboard = player.getBoard();
        for (let row = 0; row < gameboard.getSize(); row++) {
            for (let col = 0; col < gameboard.getSize(); col++) {
                const square = document.createElement("div");
                square.setAttribute("class", "square");

                if (gameboard.getSquare(row, col) == "hit") {
                    const marker = document.createElement("div");
                    marker.setAttribute("class", "hitMarker");
                    square.appendChild(marker);

                    square.setAttribute("class", "shipSquare");
                } else if (gameboard.getSquare(row, col) == "miss") {
                    const marker = document.createElement("div");
                    marker.setAttribute("class", "missMarker");
                    square.appendChild(marker);
                } else if (typeof gameboard.getSquare(row, col) == "object") {
                    square.setAttribute("class", "shipSquare");
                }

                screenBoard.appendChild(square);
            };

        };

    };

    const placePlayerShips = (player) => {
        //const computerColumn = document.getElementById("computerColumn");
        //computerColumn.setAttribute("class", "hidden");

        placeOneShip(player, 0);
    }

    function placeOneShip(player, count) {
        //case to end recursive function
        if(count==5){
            displayFriendlyGameboard(player);
            const shipSelector = document.getElementById("shipSelector");
            shipSelector.setAttribute("class", "hidden");

            const computerColumn = document.getElementById("computerColumn");
            computerColumn.setAttribute("class", "boardColumn");
        }

        const shipLengths = [5, 4, 3, 3, 2];
        const display = document.getElementById("shipDisplay");

        //reset display
        display.setAttribute("class", "shipDisplayDown");
        while(display.hasChildNodes()){
            display.removeChild(display.lastChild);
        }

        //draw ship
        for (let i = 0; i < shipLengths[count]; i++) {
            const square = document.createElement("div");
            square.setAttribute("class", "shipSquare");
            if (i == 0) { square.setAttribute("class", "selectedSquare") };

            display.appendChild(square);
        }

        //determine ship direction/rotation
        const possibleDirections = ["D", "L", "U", "R"];
        let directionPointer = { direction: 0 };

        const rotateBTN = document.getElementById("rotateShip");
        rotateBTN.onclick = () => {
            directionPointer.direction = (directionPointer.direction + 1) % possibleDirections.length;

            if (directionPointer.direction == 0) {
                display.setAttribute("class", "shipDisplayDown");
            } else if (directionPointer.direction == 1) {
                display.setAttribute("class", "shipDisplayLeft");
            } else if (directionPointer.direction == 2) {
                display.setAttribute("class", "shipDisplayUp");
            } else if (directionPointer.direction == 3) {
                display.setAttribute("class", "shipDisplayRight");
            }
        }

        const ship = new Ship(shipLengths[count]);
        displayFriendlyGameboard(player);

        //gives squares an onlick function to place ships when clicked on
        const playerBoard = document.getElementById("playerBoard");
        const allSquares = playerBoard.childNodes;

        for (let i = 0; i < allSquares.length; i++) {
            const square = allSquares[i];
            square.addEventListener("click", () => {
                const row = Math.floor(i / 10);
                const col = i % 10;

                const gameboard = player.getBoard()
                const isValid = gameboard.isValidPlacement(row, col, ship.getLength(), possibleDirections[directionPointer.direction]);

                if (isValid) {
                    gameboard.placeShip(row, col, ship.getLength(), possibleDirections[directionPointer.direction]);

                    placeOneShip(player, count + 1)
                } else {
                    //TODO: throw error message
                }

            });
        }
    }


    return { displayEnemyGameboard, displayFriendlyGameboard, placePlayerShips };
})();