const tryAgain = document.querySelector(".try-again");
const timeLeft = document.querySelector(".time-left span");
const mistakes = document.querySelector(".mistakes span");
const paragraph = document.querySelector(".paragraph");
let letters = null;

let currentLetter = 0;
let mistakesCount = 0;
let isTyping = false;
let tryEnd = false;

const addNewParagraph = () => {
    const p = paragraphs[Math.floor(Math.random() * 20)];
    paragraph.innerHTML = Array.from(p, letter => `<span>${letter}</span>`).join("");
    currentLetter = 0;
    letters = document.querySelectorAll(".paragraph span");
    letters[0].className = "active";
}

addNewParagraph();

tryAgain.addEventListener("click", () => {
    timeLeft.textContent = "60s";
    mistakes.textContent = "0";
    tryEnd = false;
    isTyping = false;
    addNewParagraph();
});

document.addEventListener("keyup", e => {

    if (e.key === "Shift" || (e.key === "Backspace" && currentLetter === 0) || tryEnd)
        return;

    isTyping = true;

    if (e.key == "Backspace") {

        letters[currentLetter].className = "";
        letters[currentLetter - 1].className = "active";

        --currentLetter;
        return;
    }

    if (e.key === letters[currentLetter].textContent) {
        letters[currentLetter].className = "success";
        if (currentLetter + 1 !== letters.length)
            letters[currentLetter + 1].className = "active";
    }
    else {
        letters[currentLetter].className = "danger";
        mistakes.textContent = ++mistakesCount;
    }

    ++currentLetter;

    if (currentLetter === letters.length)
        tryEnd = true;

});

setInterval(() => {
    if (!isTyping || tryEnd)
        return;

    let currentSeconds = parseInt(timeLeft.textContent);
    timeLeft.textContent = `${currentSeconds - 1}s`;

    if (currentSeconds === 1)
        tryEnd = true;

}, 1000);