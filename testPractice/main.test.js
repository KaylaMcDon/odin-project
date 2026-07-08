import { capitalize, reverse, caesarCipher } from './main';

test("Capitalizes correctly", () => {
    expect(capitalize("hello world")).toBe("Hello world");
})

test("Reverses correctly", () => {
    expect(reverse("hello world")).toBe("dlrow olleh");
})

test("Caesar cipher normal logic", () => {
    expect(caesarCipher("abc", 1)).toBe("bcd");
    expect(caesarCipher("lol", 3)).toBe("oro");
})

test("Caesar cipher capitalization", ()=>{
    expect(caesarCipher("AAAaaaAAA", 1)).toBe("BBBbbbBBB");
    expect(caesarCipher("Z", 7)).toBe("G");
})

test("Caesar cipher punctuation", () => {
    expect(caesarCipher("...no!", 1)).toBe("...op!");
})

test("Caesar cipher wrap around", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
})

test("Caesar cipher edge cases", () => {
    expect(caesarCipher("hello world", 0)).toBe("hello world");
    expect(caesarCipher("aa", 27)).toBe("bb");
    expect(caesarCipher("bb", -1)).toBe("aa");
})