export function createContact() {
    const content = document.getElementById("content");

    const papa = document.createElement("div");

    const papaDetails = document.createElement("p");
    papaDetails.textContent = "Contact papa for inquery about the overall papa buisness"
    papa.appendChild(papaDetails);

    const papaNumber = document.createElement("p");
    papaNumber.textContent = "111-111-1111";
    papa.appendChild(papaNumber);
    content.appendChild(papa);

    const frezzeria = document.createElement("p");

    const freezeriaDetails = document.createElement("p");
    freezeriaDetails.textContent = "Contact the freeszeria to make an order, or to cxontact this specific franchise"
    frezzeria.appendChild(freezeriaDetails);

    const freeszeriaNumber = document.createElement("p");
    freeszeriaNumber.textContent = "222-222-2222";
    freezeriaDetails.appendChild(freeszeriaNumber);
    content.appendChild(frezzeria);

}