export class Ship {
    constructor(length){
        this.length=length;
        this.timesHit=0;
        this.isShipSunk=false;
    }

    hit() {
        this.timesHit+=1;
        if(this.timesHit==this.length){
            this.isShipSunk=true;
        }
    }

    isSunk() {
        return this.isShipSunk;
    }
}

export class Gameboard {
    constructor() {
        this.board = new Array(10);
        for(let i=0; i<this.board.length; i++){
            this.board[i] = new Array(10).fill("");
        }
    }

    getArray() {
        return this.board;
    }

    getAllShips() {
        const ships = [];
        
        for(let i=0; i<this.board.length; i++){
            for(let j=0; j<this.board[i].length; j++){
                const square = this.board[i][j];
                const isShip = typeof square == "object";
                if(isShip){
                    if(!ships.includes(square)){ships.push(square)};
                }
            }
        }

        return ships;
    }

    placeShip(row, col, length, direction){
        const ship = new Ship(length);

        function updateCoordinates() {
            if(direction=="U"){
                row--;
            } else if(direction=="D"){
                row++;
            } else if(direction=="L"){
                col--;
            } else if(direction=="R"){
                col++;
            }
        }

        for(let i=0; i<length; i++){
            this.board[row][col] = ship;
            updateCoordinates();
        }
    }

    recieveAttack(row, col){
        const target = this.board[row][col];

        if(target == ""){
            this.board[row][col] = "miss";
            return "Miss";
        } else if(target == "miss" || target == "hit"){
            return "Spot already hit";
        } else {
            target.hit();
            this.board[row][col] = "hit";

            if(target.isSunk()){
                return "Hit! Ship sunk!"
            }

            return "Hit!";
        }
    }

    hasAliveShips() {
        const ships = this.getAllShips();
        
        for(let i=0; i<ships.length; i++){
            if(!ships[i].isSunk()){
                return true;
            }
        }
        return false;
    }
}

export class Player{
    constructor(name, boardID){
        this.name = name;
        this.board = new Gameboard();
        this.boardID = boardID;
    }

    generateRandomBoard(){
        //TODO: Make actually random
        this.board.placeShip(0, 0, 2, "R");
    }

    getBoard(){
        return this.board;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getBoardID() {
        return this.boardID;
    }

    attackBoard(row, col){
        this.board.recieveAttack(row, col)
    }
}