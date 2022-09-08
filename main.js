// wichtige Variablen
const zeitDisplay = document.querySelector("#timeLeft");
const resultDisplay = document.querySelector("#result");
const startPauseButtonDisplay = document.querySelector("#startPauseButton"); 
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".logLeft");
const logsRight = document.querySelectorAll(".logRight");
const carsLeft = document.querySelectorAll(".carLeft");
const carsRight = document.querySelectorAll(".carRight");
console.log(squares);
let currentIndex = 76;
let width = 9;
let timerID;
let outcomeTimerId = 0;
let currentTimer = 20;



/*
    Mit dieser Funktion bringen wir den Benutzer dazu, 
    den Frog in alle Richtungen zu bewegen, indem er die Pfeile eintippt, 
    indem er eine switch-Anweisung macht.
*/
function moveFrog(e) {
    squares[currentIndex].classList.remove("frog");

    switch(e.key){
        case "ArrowLeft":
            console.log("move Left")
            if(currentIndex % width !== 0) currentIndex -= 1;
            break;
        case "ArrowRight":
            console.log("move right");
            if(currentIndex % width < width - 1) currentIndex += 1;
            break;
        case "ArrowUp":
            console.log("move Up");
            if(currentIndex - width >= 0) currentIndex -= width; 
            break;
        case "ArrowDown":
            console.log("move down");
            if(currentIndex + width < width * width) currentIndex += width;
            break;
    }
    squares[currentIndex].classList.add("frog");
}




/*
    Mit dieser Funktion bringen wir die Protokolle und Autos dazu, 
    sich endlos zu bewegen, indem wir eine forEach-Schleife verwenden
*/
function autoMoveElements(){
    currentTimer--;
    zeitDisplay.textContent = currentTimer;
    logsLeft.forEach(log => moveLogLeft(log))
    logsRight.forEach(log => moveLogRight(log))
    carsLeft.forEach(car => moveCarLeft(car))
    carsRight.forEach(car => moveCarRight(car)) 
}


function checkOutcomes() {
    win()
    lose()
}




/*
    Mit dieser Funktion bewegen wir die Protokolle nach links, 
    indem wir eine switch-Anweisung verwenden, prüfen,
    ob ein div eine Klasse enthält, 
    sie entfernen und in einem anderen div hinzufügen
*/
function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains("l1"):
            logLeft.classList.remove("l1");
            logLeft.classList.add("l2");
            break;
        case logLeft.classList.contains("l2"):
            logLeft.classList.remove("l2");
            logLeft.classList.add("l3");
            break;
        case logLeft.classList.contains("l2"):
            logLeft.classList.remove("l2");
            logLeft.classList.add("l3");
            break;
        case logLeft.classList.contains("l3"):
            logLeft.classList.remove("l3");
            logLeft.classList.add("l4");
            break;
        case logLeft.classList.contains("l4"):
            logLeft.classList.remove("l4");
            logLeft.classList.add("l5");
            break;
        case logLeft.classList.contains("l5"):
            logLeft.classList.remove("l5");
            logLeft.classList.add("l1");
            break;
    }
}



/*
    Mit dieser Funktion bringen wir die Protokolle dazu, sich nach rechts zu bewegen, 
    indem wir eine switch-Anweisung verwenden und den gleichen Prozess ausführen, 
    den wir in der left-log-Funktion verwendet haben
*/
function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains("l1"):
            logRight.classList.remove("l1");
            logRight.classList.add("l5");
            break;
        case logRight.classList.contains("l2"):
            logRight.classList.remove("l2");
            logRight.classList.add("l1");
            break;
        case logRight.classList.contains("l3"):
            logRight.classList.remove("l3");
            logRight.classList.add("l2");
            break;
        case logRight.classList.contains("l4"):
            logRight.classList.remove("l4");
            logRight.classList.add("l3");
            break;
        case logRight.classList.contains("l5"):
            logRight.classList.remove("l5");
            logRight.classList.add("l4");
            break;
;
    }
}




/*
    Mit dieser Funktion bewegen wir das Auto auf der linken Seite
*/
function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains("c1"):
            carLeft.classList.remove("c1");
            carLeft.classList.add("c2");
            break;
        case carLeft.classList.contains("c2"):
            carLeft.classList.remove("c2");
            carLeft.classList.add("c3");
            break;
        case carLeft.classList.contains("c3"):
            carLeft.classList.remove("c3");
            carLeft.classList.add("c1");
            break;
    }
}



/*
    with this function we make the car to move on the right side
*/
function moveCarRight(carRight){
    switch(true){
        case carRight.classList.contains("c1"):
            carRight.classList.remove("c1");
            carRight.classList.add("c3");
            break;
        case carRight.classList.contains("c2"):
            carRight.classList.remove("c2");
            carRight.classList.add("c1");
            break;
        case carRight.classList.contains("c3"):
            carRight.classList.remove("c3");
            carRight.classList.add("c2");
            break;
    }
}


/*
    Mit dieser Funktion prüfen wir, 
    ob der Spieler verloren hat, indem wir prüfen, 
    ob er auf ein vorhandenes Auto oder auf Wasser getreten ist
*/
function lose() {
    if(squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") || 
    squares[currentIndex].classList.contains("l5") ||
    currentTimer <= 0
    ){
        resultDisplay.textContent = "You Lose!";
        clearInterval(timerID)
        squares[currentIndex].classList.remove("frog");
        document.removeEventListener("keyup", moveFrog)
    }
}




/*
    Mit dieser Funktion prüfen wir, ob der Benutzer das rote Div erreicht hat
*/
function win(){
    if(squares[currentIndex].classList.contains("endingBlock")){
        resultDisplay.textContent = "you Won!";
        clearInterval(timerID)
        squares[currentIndex].classList.remove("frog");
        document.removeEventListener("keyup", moveFrog)
    }
}




/*
    Mit dieser Funktion prüfen wir, 
    ob der Benutzer das rote Div erreicht hat
*/
startPauseButtonDisplay.addEventListener("click", () => {
    if(timerID){
        clearInterval(timerID);
        clearInterval(outcomeTimerId);
        outcomeTimerId = null;
        timerID = null;
        document.removeEventListener("keyup", moveFrog)
    }else{
        timerID = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener("keyup", moveFrog);
    }
})