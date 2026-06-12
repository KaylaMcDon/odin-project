const gridContainer = document.getElementById("gridContainer");

function createGrid(size) {
    for(let i=0; i<(size*size); i++){
        const div = document.createElement("div");
        div.setAttribute("style", "aspect-ratio: 1/1; width: "+100/size+"%");
        div.setAttribute("class", "blank");
        div.addEventListener("mouseenter", function() {
            this.setAttribute("class", "colored");
        })
        gridContainer.appendChild(div);
    }
}

function deleteGrid() {
    while(gridContainer.hasChildNodes()){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

//creates initial grid
createGrid(16);

//creates a button that makes a new grid of user specified size
const button = document.getElementById("newGrid");
button.addEventListener("click", () => {
    let newSize = prompt("How large would you like your grid to be? (1-100)");

    
    deleteGrid();
    createGrid(newSize);
})