function Book(title, author, pageNum, read){
    this.title=title;
    this.author=author;
    this.pageNum=pageNum;
    this.read=read;

    this.info = function() {
        readStatus = "you have not read it yet";
        if(this.read){
            readStatus="you have read it before";
        }
        console.log(`${this.title} was written by ${this.author}, has ${this.pageNum} pages, and ${readStatus}.`)
    }
}


hobbit = new Book("The Hobbit", "Tolkien", 300, false)
myLibrary.push(hobbit)
