
const rl = require("readline-sync");
const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suite = ["♦", "♥", "♣", "♠"];
var   dealtCards = [];
const cardImage = {
    ["A", "♥"]: "AH.png",

}
cardImage[["A","♥"]]
class Player{
    constructor(name){
        this.name = name,
        this.hand = [],
        this.handValue = 0
    }
}
var com = new Player("Computer");

const deal = () =>{
    var cardRandom;
    var suiteRandom;
    var card;
    do{
        cardRandom = Math.floor(Math.random()*13);
        suiteRandom = Math.floor(Math.random()*4);
        card = [cards[cardRandom], suite[suiteRandom]];
        if(dealtCards.length == 52)break;
    }while(dealtCards.some(e =>{return (e[0] === card[0] && e[1] === card[1]);}))
    dealtCards.push(card);
    return card;
}

const checkCardsValue = (hand) =>{
    var cardValue = [];
    hand.forEach(e =>{
        cardValue.push(e[0])
    })
    var value = 0;
    var ace = false;
    if(cardValue.length == 2 && cardValue[0] == "J" && cardValue[1] == "J")return 21;
    cardValue.forEach(element => {
        switch (element) {
            case "J":
            case "Q":
            case "K":
                value += 10;
                break;
            case "A":
                value += 10;
                ace = true;
                break;
            default:
                value += Number.parseInt(element);
                break;
        }       
        
    });
    if(value > 21 && ace){
        cardValue.forEach(e =>{
            if(e == "A")value -= 9;
        })
    }
    return value ;
}

const comPlayer = () =>{
    var cont = true
    do{
        if(com.handValue <= 16){ 
            var c = deal();
            com.hand.push(c);
            com.handValue = checkCardsValue(com.hand)
        }
    
        if(com.handValue > 16 && com.handValue <21){
            var random = Math.random();
            if(random <= 0.5){
                com.hand.push(deal());
                com.handValue = checkCardsValue(com.hand)
            }else{
                cont = false;
            }
        }
    
        if(com.handValue >= 21){
            cont = false;
        }
    }while(cont)
    
}

const checkWinner = ()=>{
    if(player.handValue>21)return com.name;
    if(com.handValue>21)return player.name;
    return (player.handValue > com.handValue)? player.name : com.name;
}

console.log("Welcome to MTA Blackjack");
var name = rl.question("Please enter your name:");
var player = new Player(name);
player.hand.push(deal());
player.hand.push(deal());
player.handValue = checkCardsValue(player.hand);
com.hand.push(deal());
com.hand.push(deal());
com.handValue = checkCardsValue(com.hand);
console.log(player.name + "'s turn")
do{
    console.log(player.name + " This is your hand " + player.hand);
    var answer = rl.keyInYNStrict("Do you want another card? ");
    if(answer){
        player.hand.push(deal());
        player.handValue = checkCardsValue(player.hand)
    }else{
        break;
    }
}while(player.handValue < 21)

console.log(com.name + "'s turn");
comPlayer();
if(checkWinner() == player.name){
    console.log("Congratulation you won");
    console.log(player.hand);
    console.log(com.hand);
    
} else{
    console.log("YOUR LOST");
    console.log(player.hand);
    console.log(com.hand);
}

console.log("GAME OVER")

module.exports = {
    cards,
    suite,
    Player,
    deal,
    checkCardsValue,
    comPlayer,
    checkWinner
}