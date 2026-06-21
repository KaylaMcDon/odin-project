import restaurantImage from "./restaurantImage.avif";

export function createHome() {
    const content = document.getElementById("content");

    const title = document.createElement("h1");
    title.textContent = "Papa's Freezeria!";
    content.appendChild(title);

    const subtitle = document.createElement("h2");
    subtitle.textContent = "The best milkshakes in town!";
    content.appendChild(subtitle)

    const image = document.createElement("img");
    image.src = restaurantImage
    image.setAttribute("alt", "An image from the game Papa's Freezeria");
    content.appendChild(image);

    const description = document.createElement("p");
    description.textContent = "Choose from our wide array of flavors, mix-ins and toppings to create your perfect treat!";
    content.appendChild(description);

}




/* <h1>Papa's Freezeria!</h1>
        <h2>The best milkshakes in town!</h2>
        <img src="resaurantImage.avif" alt="An image from the game Papa's Freezeria">
        <p>choosefrom our wide array of flavors, mix-ins and toppings to create your perfect treat!</p>
        */