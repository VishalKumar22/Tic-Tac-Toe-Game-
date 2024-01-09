let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#new-button");
let messageContainer = document.querySelector(".message-container");
let message = document.querySelector("#message")

let turnNo = true;//PlayerX, PlayerO
let count = 0;// To Track Draw 
 
const winPatterns =[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnNo === true){
            //PlayerO
            box.innerText = "O";
            turnNo = false;
        }else {
            //PlayerX
            box.innerText = "X"
            turnNo = true;
        }
        box.disabled = true;//To avoid Double Click         
        count++;
        let isWinner = checkWinnner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

//Draw 
const gameDraw = () => {
    message.innerText = `Game was a Draw.`;
    messageContainer.classList.remove("hide");
    disabledBoxes();
  };

//get triggered when New Game or Reset Button clicked
const resetGame = () => {
    turnNo = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide")
 }

//user can not play after winner announced
const disabledBoxes = () => {
    boxes.forEach((box)=>{
        box.disabled = true;
    }) 
}

//get triggered when user clicked to reset button
const enableBoxes = () => {
    boxes.forEach((box)=>{
        box.disabled = false;
        box.innerText = "";
    }) 
}

const showWinner = (winner) => {
    message.innerText = `Congratulations, Winner is ${winner}`;
    messageContainer.classList.remove("hide")
    disabledBoxes();
}

const checkWinnner = () => {
    winPatterns.forEach((patterns) => {
        let position1Value = boxes[patterns[0]].innerText;
        let position2Value = boxes[patterns[1]].innerText;
        let position3Value = boxes[patterns[2]].innerText;

        if(position1Value != "" && position2Value != "" && position3Value != ""){
            if(position1Value === position2Value && position2Value === position3Value){
                showWinner(position1Value);
                return true;
            }
        }
    })
};

newGameButton.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);


 
    