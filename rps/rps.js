let humanScore=0;
let computerScore=0;

function getComputerChoice() {
    choice = Math.random()*3
    let returnValue;
    if (choice<1){
        returnValue="Paper"
    }
    else if (choice<2){
        returnValue="Scissors"
    }
    else{
        returnValue="Rock"
    }

    return(returnValue);
}

function playRound(humanChoice, computerChoice) {
    let message;
    if(humanChoice==computerChoice){message=`Tie! ${humanChoice} ties ${computerChoice}`}
    else if(computerChoice=="Rock"){
        if(humanChoice=="Paper"){message=`You win! ${humanChoice} beats ${computerChoice}.`; humanScore++;}
        else{{message=`You lose! ${humanChoice} loses to ${computerChoice}.`; computerScore++;}}
    }
    else if(computerChoice=="Paper"){
        if(humanChoice=="Scissors"){message=`You win! ${humanChoice} beats ${computerChoice}.`; humanScore++;}
        else{{message=`You lose! ${humanChoice} loses to ${computerChoice}.`; computerScore++;}}
    }
    else{
        if(humanChoice=="Rock"){message=`You win! ${humanChoice} beats ${computerChoice}.`; humanScore++;}
        else{{message=`You lose! ${humanChoice} loses to ${computerChoice}.`; computerScore++;}}
    }

    const roundResultText=document.querySelector("#lastRoundResult")
    const scoreText=document.querySelector("#currentScore")

    roundResultText.textContent=message
    
    if(humanScore==5){
        scoreText.textContent=`The current score is human: ${humanScore}, computer: ${computerScore}. You win!`
    }
    else if(computerScore==5){
        scoreText.textContent=`The current score is human: ${humanScore}, computer: ${computerScore}. You lose!`
    }
    else{
        scoreText.textContent=`The current score is human: ${humanScore}, computer: ${computerScore}.`
    }
}

const btnRock = document.querySelector("#rock")
const btnPaper = document.querySelector("#paper")
const btnScissors = document.querySelector("#scissors")

btnRock.addEventListener("click", () => {
    playRound("Rock", getComputerChoice())
})
btnPaper.addEventListener("click", () => {
    playRound("Paper", getComputerChoice())
})
btnScissors.addEventListener("click", () => {
    playRound("Scissors", getComputerChoice())
})