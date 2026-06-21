export function createMenu() {
    const content = document.getElementById("content");

    const smores = document.createElement("div");

    const smoresTitle = document.createElement("p");
    smoresTitle.textContent = "Strawberry S'mores"
    smores.appendChild(smoresTitle);

    const smoresDescription = document.createElement("p");
    smoresDescription.textContent = "This special is made with neapolitan syrup and a smores mix-in, before being topped with plenty of strawberries!"
    smores.appendChild(smoresDescription);
    content.appendChild(smores);


    const blondie = document.createElement("div");

    const blondieTitle = document.createElement("p");
    blondieTitle.textContent = "Big Top Blondie";
    blondie.appendChild(blondieTitle)

    const blondieDescription = document.createElement("p");
    blondieDescription.textContent = "This special is made with a banana syrup and a carmel apple mix-in, before being topped with blondie bites and peanuts!"
    blondie.appendChild(blondieDescription);
    content.appendChild(blondie);

}