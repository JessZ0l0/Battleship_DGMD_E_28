//-----------------------------------------------------------------------------------------------
const boardContainer = document.getElementById("boardCreation");
const locationSquare = document.getElementById("locationSquare");
const gameMessage = document.getElementById("gameMessage");
const guessCounter = document.getElementById("guessCounter");

//OOP create a square class with properties row, column, 
// hasShip, isGuessed
class Square{
    constructor(row, column){
        this.row = row;
        this.column = column;
        this.hasShip = false; //setups preliminary info for if there is a ship located in that square
        this.isGuessed = false; //setups preliminary info 

    }
}
//setups the game for playing
class Game{
    constructor(){
        this.board = []; //saves board setup information
        this.guessCount = 0;
        this.gameOver = false; //game state currently
    }

    //I want this method to setup the grid of squares for
    //the game battleship using Square objects
    //creates a visual representation of the board to the browser
    buildBoard(){
        //inside for loop need to know what row, what column, class, and id
        //nest loop one for rows one for columns
        for(let row=1; row<= 6; row++){
            for(let column=1; column<=6; column++){
                console.log(row, column);
                const squareCreate = new Square(row, column);
                this.board.push(squareCreate); //push the square creation to the board
                console.log(this.board);

                //create the DOM div element with class and unique ids
                const newDiv = document.createElement("div");
                newDiv.classList.add("square");
                newDiv.setAttribute('id', ("square" + "_" + row + "_" + column));

                //keep track of row column
                newDiv.setAttribute('data-row', row);
                newDiv.setAttribute('data-col', column);
                boardContainer.setAttribute("tabindex", "0"); //sets the board attribute to tabindex 0 so I may perform a blur on the board not each individual square

                
                newDiv.addEventListener("click", () => {
                    locationSquare.style.display = "block";
                    locationSquare.textContent = ("This square is on row " + row + " and on column " + column);
                    this.checkSquareGuess(row, column); // use other method for complex if/else logic

                    //write conditional statement for miss hit sunk
                    //find the matching square object form the board using row and column
                    //if this square has laready been guessed:

                        //exit the function
                        //mark this square as guessed
                        //if the square does NOT have a ship this is a miss
                        //show message miss and increment guess count

                        //else it has a ship 
                        //it is a hit 
                        //show hit and increment count

                        //then check if the ship is now sunk 
                        //get this squares shipname
                        //look through the board for all squares for that ship
                        //check if all sunk
                        //show sunk

                        //else already showed hit so do nothing

                    //after each guess check total guess count isn't more than 20
                    //check if all ships sunk game won

                    // locationSquare.textContent = ("This square is on row " + row + " and on column " + column);
                });

                boardContainer.addEventListener("blur", function () {
                    // Hide or undo the effect
                    locationSquare.style.display = "none";
                  });

                boardContainer.appendChild(newDiv);
                
            }
        }
    }
    // In the Game class
    checkSquareGuess(row, col) {
        //write conditional statement for miss hit sunk
        //find the matching square object form the board using row and column
        //if this square has already been guessed:

        //check if used all 20 guesses and ends game if that is the case
        if (this.gameOver === true){
            gameMessage.textContent = "No more guesses — the game is over!";
            return;
        }

        const matchingSquare = this.board.find(square =>
            square.row === row && square.column === col
          );
        console.log("You clicked on:", matchingSquare);

        
        //exit the function
        //already guessed feature needed
        //mark this square as guessed
        //if the square does NOT have a ship this is a miss
        //show message miss and increment guess count
        if (matchingSquare.isGuessed){
            gameMessage.textContent = ("Already guessed!");
            return;
        }
        if (matchingSquare.hasShip === false){
            matchingSquare.isGuessed = true;
            this.guessCount++;
            guessCounter.textContent = `Guesses: ${this.guessCount} / 20`;
            if (this.guessCount === 20) {
                //alert("Game over! You've used all 20 guesses.");
                this.gameOver = true;
                this.colorShips(); 
                // gameMessage.textContent = "Game over! You've used all 20 guesses.";
                // show message: "Game over! You've used all 20 guesses."
                // optionally: disable further clicks
            } 
            // if (this.gameOver === true){
            //     gameMessage.textContent = "No more guesses — the game is over!";
            //     return;
            // }
              
            console.log(this.guessCount);
            const squareCheck = "square_" + row + "_" + col;
            document.getElementById(squareCheck).style.backgroundColor = "black";
            
            gameMessage.textContent = ("Miss!");            
        }
            //else it has a ship 
            //it is a hit 
            //show hit and increment count
        else{
            matchingSquare.isGuessed = true;
            gameMessage.textContent = ("Hit!");
            this.guessCount++;
            guessCounter.textContent = `Guesses: ${this.guessCount} / 20`;
            if (this.guessCount === 20) {
                //alert("Game over! You've used all 20 guesses.");
                this.gameOver = true;
                this.colorShips(); 
                //gameMessage.textContent = "Game over! You've used all 20 guesses.";
                // show message: "Game over! You've used all 20 guesses."
                // optionally: disable further clicks
            }
            // if (this.gameOver === true){
            //     gameMessage.textContent = "No more guesses — the game is over!";
            //     return;
            // }
            console.log(this.guessCount);
            const squareCheck = "square_" + row + "_" + col;
            document.getElementById(squareCheck).style.backgroundColor = "red";


            const shipSquares = this.board.filter(square => square.shipName === matchingSquare.shipName); //find every square that has
            //the same shipname is the one clicked returns array with all
            const allGuessed = shipSquares.every(square => square.isGuessed); //looks at every square 
            if (allGuessed === true){
                //alert("sunk!");
                //console.log("sunk");
                gameMessage.textContent = ("sunk");
            }

            //variable storing all ships location 
            const allShipsSunk = this.board.filter(square => square.hasShip).every(square => square.isGuessed);
            console.log("suunk" + allShipsSunk);
            if (allShipsSunk) {
            this.gameOver = true;
            gameMessage.textContent = "You win! All ships sunk!";
            this.colorShips(); 
            }
            console.log("sunk" + allShipsSunk);

            //then check if the ship is now sunk 
            //get this squares shipname
            //look through the board for all squares for that ship
            //check if all sunk
            //show sunk
        }
    }

    //method revealing ship locations after 20 guesses  
    colorShips() {
        for (const square of this.board) {
          if (square.hasShip) {
            const squareId = `square_${square.row}_${square.column}`;
            const squareDiv = document.getElementById(squareId);
            if (squareDiv) {
              squareDiv.style.backgroundColor = "blue";
              squareDiv.textContent = square.shipName; //provides what ship was located where
              squareDiv.style.fontSize = "10px";
              squareDiv.style.color = "white";
              squareDiv.style.display = "flex";
              squareDiv.style.alignItems = "center";
              squareDiv.style.justifyContent = "center";
              squareDiv.style.textAlign = "center";
            }
          }
        }
      }
      

    //place the ships where they need ot go on the battleship board
    placeShips(shipData){
        for (const ship of shipData){ //of loops over values in loops over keys
            //extract and store the data form each array within the object
            const startCol = ship.coords[0];
            const startRow = ship.coords[1];
            const shipSize = ship.size;
            const shipOrientation = ship.orientation;
            console.log(startCol);
            console.log(startRow);
            console.log(shipSize);
            console.log(shipOrientation);
            //ship.size

            //check if vertical orientation thus goes through to mark the board's hasShip as true at the correct coordinates aka column, rows
            if (shipOrientation === "vertical"){
                for (let i=0; i< (shipSize); i++){
                    const targetRow = startRow + i;
                    const targetCol = startCol;
                    const matchingSquare = this.board.find(square =>
                        square.row === targetRow && square.column === targetCol
                    );
                    if (matchingSquare) {
                        matchingSquare.hasShip = true;
                        matchingSquare.shipName = ship.name; //provides ship name to squares
                        console.log("Placed ship on:", matchingSquare);
                        console.log("Placed ship on:", matchingSquare.shipName);
                    }
                }
            }

            if (shipOrientation === "horizontal"){
                for (let i=0; i< (shipSize); i++){
                    const targetRow = startRow;
                    const targetCol = startCol + i;
                    const matchingSquare = this.board.find(square =>
                        square.row === targetRow && square.column === targetCol
                    );
                    if (matchingSquare) {
                        matchingSquare.hasShip = true;
                        matchingSquare.shipName = ship.name; //provides ship name to squares
                        console.log("Placed ship on:", matchingSquare);
                    }
                }
            }
        }
    }
}

fetch("battleship.json")
    .then(response => response.json())
    .then(json => {
        gameTest.placeShips(json.ships); //call the instance of the class and method to load json ships data
        // gameTest.colorShips();
        console.log("Ship data loaded:", json);
    })
    .catch(error => {
        console.error("Failed to load JSON:", error);
    })
//Next Step: fetch the JSON file which is stored in a JSON file
//I fetch data to read asynchronously with parse data
//fetch the json data successfully 
//log the ship data in the console to confirm access


//Next step today 4/3/2025
//check if that square has a ship
//check if it's been guessed already isGuessed
//update the state of isGuessed
//respond with the right message hit, miss, sunk



//create instance of the class
const gameTest = new Game();
//test the specific method
gameTest.buildBoard();
//console.log(gameTest.buildBoard());