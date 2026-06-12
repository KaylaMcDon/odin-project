function createGrid() {

    const body = document.getElementById("gridContainer")

    for(let i=0; i<256; i++){
        const div = document.createElement("div")
        div.setAttribute("style", "aspect-ratio: 1/1; width: 6.25%")
        body.appendChild(div)
    }
}


createGrid()