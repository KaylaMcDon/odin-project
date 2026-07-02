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
        for (let i = 0; i < library.length; i++) {
            if (library[i].id == book.id) { library.splice(i, 1) }
        }
    })
    card.appendChild(deleteButton)

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.appendChild(card);
}

function initializeDisplay() {
    for (let i = 0; i < library.length; i++) {
        if (document.getElementById(library[i].id) == null) {
            makeCard(library[i]);
        }
    }
}

const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
    e.preventDefault();

    //load form elements
    const title = document.getElementById("title");
    const author = document.getElementById("name");
    const pageNum = document.getElementById("pageNum");
    const read = document.getElementById("read");


    //validate correctness
    let isValidForm = true;
    if (title.validity.valueMissing) {
        title.setCustomValidity("Please input a book title");
        title.reportValidity();
        isValidForm = false;
    } else {
        title.setCustomValidity("");
    }

    if (author.validity.valueMissing) {
        author.setCustomValidity("Please input a book's author");
        author.reportValidity();
        isValidForm = false;
    } else {
        author.setCustomValidity("");
    }

    if (pageNum.validity.valueMissing) {
        pageNum.setCustomValidity("Please input the number of pages in the book");
        pageNum.reportValidity();
        isValidForm = false;
    } else {
        pageNum.setCustomValidity("");
    }

    if (isValidForm) {
        const readValue = () => {
            if (read.value == "true") { return true }
            else if (read.value == "false") { return false }
        }

        addBookToLibrary(title.value, author.value, pageNum.value, readValue());
        makeCard(library[library.length - 1]);
    }
})

addBookToLibrary("The Hobbit", "Tolkien", 300, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);
initializeDisplay();