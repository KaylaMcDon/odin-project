import {createHome} from "./home.js";
import {createMenu} from "./menu.js";
import {createContact} from "./contact.js"

function clearContent() {
    const content = document.getElementById("content");
    while(content.hasChildNodes()){
        content.removeChild(content.lastChild);
    }
}

createHome();

const homeBTN = document.getElementById("home");
homeBTN.addEventListener("click", () => {
    clearContent();
    createHome();
})

const menuBTN = document.getElementById("menu");
menuBTN.addEventListener("click", () => {
    clearContent();
    createMenu();
})

const contactBTN = document.getElementById("contact");
contactBTN.addEventListener("click", () => {
    clearContent();
    createContact();
})