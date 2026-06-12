const gridContainer = document.getElementById("gridContainer");

function createGrid(size) {
    for(let i=0; i<(size*size); i++){
        const div = document.createElement("div");
        div.setAttribute("style", "aspect-ratio: 1/1; width: "+100/size+"%; background-color: white;");
        div.addEventListener("mouseenter", function() {
            let hexadecimalColor = Math.floor(Math.random()*16777216).toString(16);
            this.style.backgroundColor="#"+hexadecimalColor;
        })
        gridContainer.appendChild(div);
    }
}

function deleteGrid() {
    while(gridContainer.hasChildNodes()){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function recreateGrid() {
    let newSize = prompt("How large would you like your grid to be? (1-100)");

    deleteGrid();
    createGrid(newSize);
}



const button = document.getElementById("newGrid");
button.addEventListener("click", () => {
    recreateGrid()
})

//creates initial grid
createGrid(16);