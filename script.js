let deck;
let hidden;

let dealerSum = 0;
let playerSum = 0;

let dealerAce = 0;
let playerAce = 0;

let canHit = true;

window.onload = createDeck(), shuffleDeck(), startGame()

function createDeck() {
    
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let n = 0; n < values.length; n++) {
            deck.push(values[n] + "-" + types[i]);       
        }       
    }
    //console.log(deck);
}


function shuffleDeck() {

    for ( let i = 0; i < deck.length; i++) {
    let random = Math.floor(Math.random() * deck.length)
    let rand = deck[i];
    deck[i] = deck[random];
    deck[random] = rand;
    }
    //console.log(deck)
}



function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAce += checkAce(hidden);
    //console.log(hidden);
   //console.log(dealerSum)

   for (let i = 0; i < 1; i++) {
    let cardImg = document.createElement("img")
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAce += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg)

}

   for (let i =0; i < 2; i++) {
    let cardImg = document.createElement("img")
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAce += checkAce(card);
    document.getElementById("player-cards").append(cardImg)

    }

}

function getValue(card) {
    let data = card.split("-"); // "6-H" -> ["6", "H"]
    let value = data[0];

    if (isNaN(value)) {   // A J Q K
        if (value == "A") {
            return 11;
        }
        return 10
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAce) {
    while (playerSum > 21 && playerAce > 0) {
        playerSum -= 10;
        playerAce -= 1;
    }
    return playerSum;
}


function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img")
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAce += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerSum, playerAce) > 21) {
        canHit = false;
    }

}
document.getElementById("hit").addEventListener("click", hit)


function stay() {
    dealerSum = reduceAce(dealerSum, dealerAce);
    playerSum = reduceAce(playerSum, playerAce);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (playerSum > 21) {
        message = "You Loose!";
    }
    else if (dealerSum > 21) {
        message = "You Win!";
    }
    else if (playerSum == dealerSum) {
        message = "GOD";
    }
    else if (playerSum > dealerSum) {
        message = "You Win!";
    }
    else if (playerSum < dealerSum) {
        message = "You Loose!";
    }
   
    document.getElementsByClassName("results").innerText = message;
}
document.getElementById("stay").addEventListener("click", stay)


function dealerHit() {
    while (dealerSum < 17) {
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg)

    }
}


let deal = document.getElementById("stay")

deal.addEventListener("click", dealerHit)







