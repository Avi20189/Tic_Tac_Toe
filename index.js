 const boxes = document.querySelectorAll(".box");
 const gameInfo = document.querySelector(".game-info");
 const newGameBtn = document.querySelector(".btn");

 let currentPlayer;
 let gameGrid;

 const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];

 //let's create a function to initialise the game
 function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //Add boxes to empty over UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //Remove green color by initialising the box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
 }

 initGame();

 function checkGameOver() { 
    let answer = "";
    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]]!== ""  || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        &&  (gameGrid[position[0]] ===  gameGrid[position[1]]) &&  (gameGrid[position[1]]=== gameGrid[position[2]])){
            //check if winner is X

            if(gameGrid[position[0]] === "X")
            answer  = "X";
            else
            answer = "0";

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //Now we know X/0 is a winner,so display it on ui
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
        
    });

    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    //let's check there is a winner or not 
    let fillCount = 0;
    gameGrid.forEach((box) =>  {
        if(box !== "")
        fillCount++;
    });

    //board is filled, gmae is tie
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
 }

 function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
     }

     
 function handleClick(index) {
    //if box is empty then put the current user value
    //After that make the box unclickable
    //Change the player and swap the turn
    //Check that no one is winner
    if(gameGrid[index] == "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //Swap karo turn ko
        swapTurn();
        //CHeck if no one is winner til
        checkGameOver();
    }
    
}


 boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
 });

newGameBtn.addEventListener("click", initGame);