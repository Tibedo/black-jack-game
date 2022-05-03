
// ************* VARIABLES ************* //
let deck;
let hidden;

let dealerSum = 0;
let playerSum = 0;

let dealerAce = 0;
let playerAce = 0;

let canHit = true;

window.onload = createDeck(), shuffleDeck(), startGame()

// ************* DECK ************* //
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

// ************* MELANGER DECK ************* //
function shuffleDeck() {

    for ( let i = 0; i < deck.length; i++) {
    let random = Math.floor(Math.random() * deck.length)
    let rand = deck[i];
    deck[i] = deck[random];
    deck[random] = rand;
    }
    //console.log(deck)
}


// ************* DISTRIBUTION CARTES ************* //
function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAce += checkAce(hidden);
    //console.log(hidden);
    //console.log(dealerSum)

// CARTES DU DEALER //
   for (let i = 0; i < 1; i++) {
    let cardImg = document.createElement("img")
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAce += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg)
}

// CARTES DU JOUEUR //
   for (let i =0; i < 2; i++) {
    let cardImg = document.createElement("img")
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAce += checkAce(card);
    document.getElementById("player-cards").append(cardImg)
    }
    let displayPlayer = document.getElementById("player-sum");
    displayPlayer.innerText = playerSum
    console.log(playerSum)
    console.log(dealerSum)
}

// ************* DEFINIR VALEUR DES CARTES ************* //
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


// ************* DEFINIR SI AS = 11 ou 1 ************* //
function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(yourSum, yourAce) {
    while (yourSum > 21 && yourAce > 0) {
        yourSum -= 10;
        yourAce -= 1;
    }
    return yourSum;
}

// ************* TIRER UNE CARTE ************* //
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
    let displayPlayer = document.getElementById("player-sum");
    displayPlayer.innerText = playerSum
}
document.getElementById("hit").addEventListener("click", hit)


// ************* LE DEALER TIRE UNE CARTE ************* //
function dealerHit() {
    
    while (dealerSum < 17) {
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg)
    }
    
    let displayDealer = document.getElementById("dealer-sum");
    displayDealer.innerText = dealerSum
}
let deal = document.getElementById("stay")
deal.addEventListener("click", dealerHit)


// ************* ARRETER DE TIRER + RESULTAT ************* //
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAce);
    playerSum = reduceAce(playerSum, playerAce);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (playerSum > 21) {
        message = "You LOOSE!";
    }
    else if (dealerSum > 21) {
        message = "You WIN!";
    }
    else if (playerSum == dealerSum) {
        message = "Grrrrrr";
    }
    else if (playerSum > dealerSum) {
        message = "You WIN!";
    }
    else if (playerSum < dealerSum) {
        message = "You LOOSE!";
    }

    let displayPlayer = document.getElementById("player-sum");
    displayPlayer.innerText = playerSum  
    let displayDealer = document.getElementById("dealer-sum");
    displayDealer.innerText = dealerSum
    document.getElementById("results").innerText = message;
}

document.getElementById("stay").addEventListener("click", stay)










