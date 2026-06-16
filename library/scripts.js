const library = [];

function Book(title, author, pageNum, read){
    this.title=title;
    this.author=author;
    this.pageNum=pageNum;
    this.read=read;
    this.id=crypto.randomUUID()

    this.info = function() {
        readStatus = "you have not read it yet";
        if(this.read){
            readStatus="you have read it before";
        }
        return(`${this.title} was written by ${this.author}, has ${this.pageNum} pages, and ${readStatus}.`)
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

    const cardContainer = document.getElementById("cardContainer")
    cardContainer.appendChild(card);
}

function updateDisplay(){
    for(let i=0; i<library.length; i++){
        if(document.getElementById(library[i].id)==null){
            makeCard(library[i]);
        }
    }
}

addBookToLibrary("The Hobbit", "Tolkien", 300, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);
updateDisplay()
