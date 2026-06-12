function createGrid() {

    const body = document.getElementById("gridContainer")

    for(let i=0; i<256; i++){
        const div = document.createElement("div")
        div.setAttribute("style", "aspect-ratio: 1/1; width: 6.25%")
        div.addEventListener("mouseenter", function() {
            this.setAttribute("class", "colored");
        })
        body.appendChild(div)
    }
}


createGrid()