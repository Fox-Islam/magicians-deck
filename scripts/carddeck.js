//Array of card values for painless sorting, initial digit shows suit (1 = clubs, 2 = spades, 3 = hearts, 4 = diamonds)
//100 -> 2 of clubs, 412 -> ace of diamonds
var initDeckArray = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212,
300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312,
400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412];

var deckArray = initDeckArray.slice(0); //Creates a copy of the array so that we can later reset within the webapp without reload
var handArray = []; 

//Shuffles the deck
function deckShuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Takes an input 3-digit value and returns the card relating to that value
function parseCode(cardCode){
    var cardName = "";
    var suit = (''+cardCode)[0]; //First digit of code for suit
    var val = parseInt((''+cardCode).slice(1,3)); //Following two digits for value

    if (val > 8){
        if (val == 9){
            val = "Jack";
        }else if (val == 10){
            val = "Queen";
        }else if (val == 11){
            val = "King";
        }else if (val == 12){
            val = "Ace";
        }else{
            val = "Invalid value";
        }
    }else{
        val += 2; //Need to +2 to latter two digits to display correct value for number cards (eg. 104 -> 6 of clubs)
    }
    cardName += val;
    
    if (suit == "1"){
        cardName += " of Clubs";
    }else if(suit == "2"){
        cardName += " of Spades";
    }else if(suit == "3"){
        cardName += " of Hearts";
    }else if(suit == "4"){
        cardName += " of Diamonds";
    }else{
        cardName += " Invalid suit";
    }
    
    return cardName
}

handCards = document.getElementById("handcards");
//Generates HTML for displaying the drawn cards
function displayHand(handArray){
    handCards.innerHTML = "";
    for (card in handArray){
        image = "<img class=\"playingcard\" src=\"images/" + handArray[card] + ".png\">"; //Playing card image tag
        handCards.innerHTML += "<div class=\"showhand\">" + image + "<br>" + parseCode(handArray[card]) + "</div>"; //div block for formatting playing card display
    }
}

//BUTTON: Displays the top card in the deck
document.getElementById("topcard").addEventListener("click", topCardClick);
function topCardClick() {
    if (deckArray.length > 0) {
        document.getElementById("firstcard").innerHTML = "The top card in the deck is the " + parseCode(deckArray[0]);
    }else if (deckArray.length == 0){
        document.getElementById("error").innerHTML = "There are no more cards in the deck to peek at";
    }
}

//BUTTON: Shuffles the deck
document.getElementById("shuffle").addEventListener("click", shuffleClick);
function shuffleClick() {
    deckShuffle(deckArray);
    document.getElementById("firstcard").innerHTML = "";
}

//BUTTON: Draws a card
document.getElementById("draw").addEventListener("click", drawClick);
function drawClick() {
    drawInput = parseInt(document.getElementById("drawinp").value);
    if (typeof drawInput === 'number'){
        count = drawInput
        while (count > 0){
            if (deckArray.length > 0){
            handArray.push(deckArray[0]); //Add the top card of the deck into the hand
            deckArray.splice(0,1); //Remove the top card from the deck
            
            
            displayHand(handArray);
            
            //Count cards in deck and hand
            document.getElementById("decknumber").innerHTML = deckArray.length;
            document.getElementById("handnumber").innerHTML = handArray.length;
            
            document.getElementById("firstcard").innerHTML = "";
            }else{
                document.getElementById("error").innerHTML = "There are no more cards in the deck to draw from";
            }
            count -= 1;
        }
    }
    
}

//BUTTON: Sorts the cards in the hand
document.getElementById("sort").addEventListener("click", sortClick);
function sortClick() {
    handArray.sort();
    displayHand(handArray);
}

//BUTTON: Resets the webapp
document.getElementById("reset").addEventListener("click", resetClick);
function resetClick() {
    handArray = [];
    deckArray = initDeckArray.slice(0);
    
    document.getElementById("decknumber").innerHTML = deckArray.length;
    document.getElementById("handnumber").innerHTML = handArray.length;
    displayHand(handArray);
    document.getElementById("firstcard").innerHTML = "";
    document.getElementById("error").innerHTML = "";
}