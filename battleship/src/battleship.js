export class Ship {
    constructor(length) {
        this.length = length;
        this.timesHit = 0;
        this.isShipSunk = false;
    }

    hit() {
        this.timesHit += 1;
        if (this.timesHit == this.length) {
            this.isShipSunk = true;
        }
    }

    isSunk() {
        return this.isShipSunk;
    }

    getLength() {
        return this.length;
    }
}

export class Gameboard {
    constructor() {
        this.board = new Array(10);
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(10).fill("");
        }
    }

    getArray() {
        return this.board;
    }

    getAllShips() {
        const ships = [];

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const square = this.board[i][j];
                const isShip = typeof square == "object";
                if (isShip) {
                    if (!ships.includes(square)) { ships.push(square) };
                }
            }
        }

        return ships;
    }

    isValidPlacement(row, col, shipLength, direction) {
        function updateCoordinates() {
            if (direction == "U") {
                row--;
            } else if (direction == "D") {
                row++;
            } else if (direction == "L") {
                col--;
            } else if (direction == "R") {
                col++;
            };
        }

        for (let i = 0; i < shipLength; i++) {
            const isInRange = row >= 0 && row < 10 && col >= 0 && col < 10;
            const isValidSquare = (isInRange) && (this.isEmptySquare(row, col))
            if (!isValidSquare) { return false }
            updateCoordinates();
        }

        return true;
    }

    placeShip(row, col, length, direction) {
        const ship = new Ship(length);

        function updateCoordinates() {
            if (direction == "U") {
                row--;
            } else if (direction == "D") {
                row++;
            } else if (direction == "L") {
                col--;
            } else if (direction == "R") {
                col++;
            }
        }

        for (let i = 0; i < length; i++) {
            this.board[row][col] = ship;
            updateCoordinates();
        }
    }

    recieveAttack(row, col) {
        const target = this.board[row][col];

        if (target == "") {
            this.board[row][col] = "miss";
            return "Miss";
        } else if (target == "miss" || target == "hit") {
            return "Spot already hit";
        } else {
            target.hit();
            this.board[row][col] = "hit";

            if (target.isSunk()) {
                return "Hit! Ship sunk!"
            }

            return "Hit!";
        }
    }

    hasAliveShips() {
        const ships = this.getAllShips();

        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return true;
            }
        }
        return false;
    }

    getNumShipsLeft() {
        return this.getAllShips().length;
    }

    isEmptySquare(row, col) {
        return this.board[row][col] == "";
    }

    getSize() {
        return this.board.length;
    }

    getSquare(row, col) {
        return this.board[row][col]
    }

    setSquare(row, col, value) {
        this.board[row][col] = value;
    }
}

export class Player {
    constructor(name, boardID) {
        this.name = name;
        this.board = new Gameboard();
        this.boardID = boardID;
    }

    generateRandomBoard() {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        const shipLengths = [5, 4, 3, 3, 2];
        const possibleDirections = ["U", "D", "L", "R"];

        for (const shipLength of shipLengths) {
            let row = getRandomInt(10);
            let col = getRandomInt(10);
            let direction = possibleDirections[getRandomInt(4)];
            while (!this.board.isValidPlacement(row, col, shipLength, direction)) {
                row = getRandomInt(10);
                col = getRandomInt(10);
                direction = possibleDirections[getRandomInt(4)]
            }

            this.board.placeShip(row, col, shipLength, direction);
        }
    }

    getBoard() {
        return this.board;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getBoardID() {
        return this.boardID;
    }

    attackBoard(row, col) {
        return this.board.recieveAttack(row, col)
    }

    hasLost() {
        return !this.board.hasAliveShips();
    }
}