export const DOMLogic = (() => {
    const cleargameboard = (divID) => {
        const gameboard = document.getElementById(divID);
        while(gameboard.hasChildNodes()){
            gameboard.removeChild(gameboard.lastChild);
        }
    };

    const displayGameboard = (player) => {
        const divID = player.getBoardID();
        cleargameboard(divID);
        const screenBoard = document.getElementById(divID);

        const gameboard = player.getBoard().getArray();
        for(let i=0; i<gameboard.length; i++){
            for(let j=0; j<gameboard[i].length; j++){
                const square = document.createElement("div");
                square.setAttribute("class", "square");
                
                if(gameboard[i][j] == "hit"){
                    const marker = document.createElement("div");
                    marker.setAttribute("class", "hitMarker");
                    square.appendChild(marker);
                } else if(gameboard[i][j] == "miss"){
                    const marker = document.createElement("div");
                    marker.setAttribute("class", "missMarker");
                    square.appendChild(marker);
                }

                screenBoard.appendChild(square);
            }
        }
    };

    return {displayGameboard}
})();