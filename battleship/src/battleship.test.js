import {Ship, Gameboard} from "./battleship";

test("Ship Functions", () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(5);

    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);

    ship2.hit();
    ship2.hit();
    ship2.hit();
    ship2.hit();
    expect(ship2.isSunk()).toBe(false);
    ship2.hit();
    expect(ship2.isSunk()).toBe(true);
})

test("Gameboard", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(2, 4, 3, "U");

    expect(gameboard.recieveAttack(2, 4)).toBe("Hit!");
    expect(gameboard.recieveAttack(2, 4)).toBe("Spot already hit");
    expect(gameboard.recieveAttack(1, 4)).toBe("Hit!");
    expect(gameboard.recieveAttack(0, 4)).toBe("Hit! Ship sunk!");
    expect(gameboard.recieveAttack(0, 0)).toBe("Miss");

    gameboard.placeShip(5, 6, 2, "L");
    expect(gameboard.hasAliveShips()).toBe(true);
    gameboard.recieveAttack(5, 6);
    gameboard.recieveAttack(5, 5);
    expect(gameboard.hasAliveShips()).toBe(false);
})