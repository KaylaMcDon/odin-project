//creates a 4d array to represent the vertice graph of a knight on a chess board
//graph[current x position][curreny y position][next x position][next y position]
const graph = new Array(8);
for (let i = 0; i < 8; i++) {
    graph[i] = new Array(8);
    for (let j = 0; j < 8; j++) {
        graph[i][j] = new Array(8);
        for (let k = 0; k < 8; k++) {
            graph[i][j][k] = new Array(8);
            for (let l = 0; l < 8; l++) {
                const horizontalMovement = Math.abs(i-k);
                const verticalMovement = Math.abs(j-l);
                const isValidKnightMove = (
                    (horizontalMovement == 2 && verticalMovement == 1) ||
                    (horizontalMovement == 1 && verticalMovement == 2)
                )

                if(isValidKnightMove){
                    graph[i][j][k][l] = 1;
                } else {
                    graph[i][j][k][l] = 0;
                }
            }
        }
    }
}

class Move {
    constructor(position, lastMove){
        this.lastMove=lastMove;
        this.position=position;
    }

    getX() {
        return this.position[0];
    }

    getY() {
        return this.position[1];
    }

    //returns true if the moves position is the same as the one provided
    comparePosition(position) {
        return (
            position[0] == this.position[0] &&
            position[1] == this.position[1]
        );
    }

    //prints the series of moves that led to this one
    tracePath() {
        if(this.lastMove!=null){
            this.lastMove.tracePath();
        }
        console.log(this.position);
    }
};

//returns an array of all valid knight moves from a square
function validKnightMoves(move){
    const validMoves = [];

    for(let k=0; k<8; k++){
        for(let l=0; l<8; l++){
            if(graph[move.getX()][move.getY()][k][l] == 1){
                const nextMove = new Move([k, l], move)
                validMoves.push(nextMove);
            }
        }
    }

    return validMoves;
};

function findKnightPath(startPos, endPos){
    const startingMove = new Move([startPos[0], startPos[1]], null)
    let queue = [startingMove];

    while(true){
        const move = queue[0];

        if(move.comparePosition(endPos)){
            console.log(`Here is the path from ${startPos} to ${endPos}`)
            return move.tracePath();
        }
        queue = queue.concat(validKnightMoves(queue[0]));
        queue.shift();
    }
};

findKnightPath([0, 0], [0, 1])