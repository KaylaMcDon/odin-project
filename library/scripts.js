const library = [];

class Book {
    constructor(title, author, pageNum, read) {
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.read = read;
        this.id = crypto.randomUUID()
    }

    info() {
        let readStatus = "you have not read it yet";
        if (this.read) {
            readStatus = "you have read it before";
        }
        return (`${this.title} was written by ${this.author}, has ${this.pageNum} pages, and ${readStatus}.`)
    }
}

function addBookToLibrary(title, author, pageNum, read) {
    let newBook = new Book(title, author, pageNum, read);
    library.push(newBook);
}

function makeCard(book) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", book.id);

    const cardText = document.createTextNode(book.info());
    card.appendChild(cardText);

    const swapReadButton = document.createElement("button");
    swapReadButton.textContent = "Read";
    swapReadButton.addEventListener("click", () => {
        book.read = !book.read;
        cardText.textContent = book.info();
    })
    card.appendChild(swapReadButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Book";
    deleteButton.addEventListener("click", () => {
        card.remove();
        for(let i=0; i<library.length; i++){
            if(library[i].id==book.id){library.splice(i, 1)}
        }
    })
    card.appendChild(deleteButton)

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.appendChild(card);
}

function initializeDisplay(){
    for(let i=0; i<library.length; i++){
        if(document.getElementById(library[i].id)==null){
            makeCard(library[i]);
        }
    }
}

const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    let title = document.getElementById("title").value;
    let author = document.getElementById("name").value;
    let pageNum = document.getElementById("pageNum").value;
    let read = document.getElementById("read").value;
    if(read=="true"){read=true}
    else if (read=="false"){read=false}
    
    addBookToLibrary(title, author, pageNum, read);
    makeCard(library[library.length-1]);
    event.preventDefault();
})

addBookToLibrary("The Hobbit", "Tolkien", 300, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);
initializeDisplay();