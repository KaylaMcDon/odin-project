import "./styles.css";
import { Ship, Gameboard, Player } from "./battleship.js";
import { DOMLogic } from "./DOMLogic.js";

const player = new Player("Player", "playerBoard");
const computer = new Player("Computer", "computerBoard");

computer.generateRandomBoard();
DOMLogic.placePlayerShips(player);

DOMLogic.displayEnemyGameboard(computer);