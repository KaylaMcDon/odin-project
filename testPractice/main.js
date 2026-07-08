export function capitalize(str) {
    const firstLetter = str.substring(0, 1).toUpperCase();
    const restOfStr = str.substring(1);
    return firstLetter + restOfStr;
}

export function reverse(str) {
    let finalString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        finalString += str[i];
    };
    return finalString;
}

function isValidPair(newCharCode, oldCharCode) {
    function isUpperCase(charCode) { return charCode >= 65 && charCode <= 90 };
    function isLowerCase(charCode) { return charCode >= 97 && charCode <= 122 };

    //checks to ensure that both the old and new letter are either both upper or lower case
    //this is to prevent an uppercase number from being turned into a lowercase
    const areUpperCase = isUpperCase(newCharCode) && isUpperCase(oldCharCode);
    const areLowerCase = isLowerCase(newCharCode) && isLowerCase(oldCharCode);
    return areUpperCase || areLowerCase;
}

function isALetter(charCode) {
    //running 'isValidPair' with the same char code twice will
    //return true if the char code is associated with a letter
    //or false if not
    return isValidPair(charCode, charCode);
}

function calculateCharCode(oldCharCode, newCharCode) {
    while (!isValidPair(oldCharCode, newCharCode)) {
        newCharCode -= 26;
    }
    return newCharCode;
}

/*
    caesar shifts a string by turning each string letter into its char code value,
    adding the shift amount, and then converting back to a character.
*/
//TODO: refactor for clarity
export function caesarCipher(str, shiftNum) {
    let finalString = "";
    shiftNum = shiftNum % 26;

    for (let i = 0; i < str.length; i++) {
        //gets the char code of the original letter
        const oldCharNum = str.charCodeAt(i);
        let newChar;

        //check if oldCharNum is a letter or punctuation
        if (isALetter(oldCharNum)) {
            // calculate the char code for the new letter using a function
            // in order to prevent overflow errors
            const newCharNum = calculateCharCode(oldCharNum, oldCharNum + shiftNum);
            newChar = String.fromCharCode(newCharNum);
        } else {
            //if its punctuation just load the char of the old char code.
            newChar = String.fromCharCode(oldCharNum);
        }
        finalString += newChar;
    }

    return finalString;
}