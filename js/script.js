
const cardImage = {
    "AH": "AH.png",
    "2H": "2H.png",
    "3H": "3H.png",
    "4H": "4H.png",
    "5H": "5H.png",
    "6H": "6H.png",
    "7H": "7H.png",
    "8H": "8H.png",
    "9H": "9H.png",
    "10H": "10H.png",
    "JH": "JH.png",
    "QH": "QH.png",
    "KH": "KH.png",
    "AS": "AS.png",
    "2S": "2S.png",
    "3S": "3S.png",
    "4S": "4S.png",
    "5S": "5S.png",
    "6S": "6S.png",
    "7S": "7S.png",
    "8S": "8S.png",
    "9S": "9S.png",
    "10S": "10S.png",
    "JS": "JS.png",
    "QS": "QS.png",
    "KS": "KS.png",
    "AC": "AC.png",
    "2C": "2C.png",
    "3C": "3C.png",
    "4C": "4C.png",
    "5C": "5C.png",
    "6C": "6C.png",
    "7C": "7C.png",
    "8C": "8C.png",
    "9C": "9C.png",
    "10C": "10C.png",
    "JC": "JC.png",
    "QC": "QC.png",
    "KC": "KC.png",
    "AD": "AD.png",
    "2D": "2D.png",
    "3D": "3D.png",
    "4D": "4D.png",
    "5D": "5D.png",
    "6D": "6D.png",
    "7D": "7D.png",
    "8D": "8D.png",
    "9D": "9D.png",
    "10D": "10D.png",
    "JD": "JD.png",
    "QD": "QD.png",
    "KD": "KD.png",
}

class Player{
    constructor(name,imgElement,nameElement,valueElement,type){
        this.name = name,
        this.hand = [],
        this.handValue = 0
        this.overlap = 2;
        this.position = 0
        this.imgElement = imgElement;
        this.nameElement = nameElement;
        this.valueElement = valueElement
        this.type = type;
        let rect = document.getElementById(this.imgElement).getBoundingClientRect();
        this.y = rect.y;
        this.x = rect.x + rect.width / 2; 
    }

    async addImgElement(){
        let img = document.createElement("div");
        img.className = "card-container"
        document.getElementById(this.imgElement).append(img)
        let posX = this.x;
        let posY = this.y; 
        console.log(this.x,this.y)
        let card = await this.moveCard(posX,posY)
        // console.log(card)
        // console.log(posX,posY)
        
        card.remove()
        img.append(card);
        card.style.zIndex  = this.overlap;
        card.style.right = this.position + "px";
        card.classList.add("card-dealt")
        card.classList.remove("card-dealing")
    
        this.overlap++
        this.position +=50
        document.getElementById(this.nameElement).innerText = this.name;   // change it doesn't have to be in addImgElement
        document.getElementById(this.valueElement).innerHTML = this.handValue;
         
    }

    reset(){
        this.hand = [],
        this.handValue = 0,
        this.overlap = 2,
        this.position = 0
    }

    moveCard(posX,posY){
        let card = document.getElementById("deck-cards-container").lastChild;
        card.classList.add("card-dealing");
        card.classList.remove("card-on-deck")
        card.style.top = posY + "px";
        card.style.left = posX + "px";
        
        this.turnCard(card)
    
        var promise =  new Promise((res)=>{
            card.addEventListener("transitionend",(e)=>{
            if(e.propertyName == "top") res(card)
            })   
        })
        return promise
        
    }
    turnCard(card){
        card = card.lastChild
        card.style.transform = "rotate3d(0,100,0,90deg)";
        card.style.transition = "transform 250ms linear";
        card.addEventListener("transitionend",()=>{
            card.lastChild.classList.remove("card-back");
            card.lastChild.classList.add("card-front");
            let pic = this.hand[this.hand.length-1][Object.keys(this.hand[this.hand.length-1])[0]]
            card.lastChild.src = "./cards/PNG/" + pic;
            card.style.transform = "rotate3d(0,1,0,180deg)";
            card.style.transition = "transform 250ms linear";
        })
    }
    addingImg(){
        
        
    }
}
var com = new Player("Computer","dealer-cards","com-name","com-value","com");
var player;
var turn = "player";

const getRect = (e) =>{
    var rect = e.getBoundingClientRect();
    var promise = new Promise((res) =>{
        if(rect != undefined)res(rect)
    })
    return promise
}

const deal = () =>{
var card,dealCard;
    random = Math.floor(Math.random()*(Object.keys(cardImage).length-1));
    card = Object.keys(cardImage)[random];
    dealCard = Object.fromEntries(new Array([card,cardImage[card]]));
    delete cardImage[card]
    // deckCards(); 
    return dealCard;
}

const checkCardsValue = (hand) =>{
    var cardValue = [];
    hand.forEach(e =>{
        cardValue.push(Object.keys(e)[0][0])
    })
    console.log(cardValue);
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
                value += (Number.parseInt(element) == 1)?Number.parseInt(element) + 9:Number.parseInt(element);
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
    turn = "com";
    var cont = true
    do{
        if(com.handValue <= 16){ 
            var c = deal();
            com.hand.push(c);
            com.handValue = checkCardsValue(com.hand)
            com.addImgElement()
        }
    
        if(com.handValue > 16 && com.handValue <21){
            var random = Math.random();
            if(random <= 0.5){
                com.hand.push(deal());
                com.handValue = checkCardsValue(com.hand)
                com.addImgElement()
            }else{
                cont = false;
            }
        }
    
        if(com.handValue >= 21){
            cont = false;
        }
    }while(cont)
    message();
    
}

const checkWinner = ()=>{
    if(player.handValue>21)return com.name;  //If player goes over 21 com wins
    if(com.handValue>21)return player.name;  //If com goes over 21 player wins
    return (player.handValue > com.handValue)? player.name : com.name; // The higher hand wins
}

const deckCards = async () =>{
    var rect,moveContainer,turnContainer,img
    var translate = 0
    let zIndex = 2
    document.getElementById("deck-cards-container").innerHTML = ""
    for(i = 0; i < Object.keys(cardImage).length; i++){
        img = document.createElement("img");
        img.classList.add("card-back")
        img.src = "./cards/PNG/blue_back.png";
        img.style.transform = "translate(" + translate + "px," + translate + "px)"
        translate -= 0.25;
        img.style.zIndex = zIndex;
        zIndex++;
        turnContainer = document.createElement("div");
        turnContainer.append(img);
        moveContainer = document.createElement("div");
        moveContainer.classList.add("card-on-deck")
        moveContainer.append(turnContainer);
        document.getElementById("deck-cards-container").append(moveContainer);
        // rect = moveContainer.getBoundingClientRect();
        moveContainer.style.top = moveContainer.getBoundingClientRect().y + "px";
        moveContainer.style.left = moveContainer.getBoundingClientRect().x + "px";
        console.log(moveContainer.style.top)
    } 

    var promise = new Promise(res =>{
        setTimeout(()=>res('done'),1);
    })
    return promise
}

const newGame = async () =>{
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("message-title").innerText = "";
    player.reset();
    com.reset();
    await deckCards();
    player.hand.push(deal());
    player.handValue = checkCardsValue(player.hand)
    await player.addImgElement();
    player.hand.push(deal());
    player.handValue = checkCardsValue(player.hand)
    await player.addImgElement();
    turn = "player";
    com.hand.push(deal());
    com.handValue = checkCardsValue(com.hand);
    await com.addImgElement();
    com.hand.push(deal());
    com.handValue = checkCardsValue(com.hand);
    await com.addImgElement();
}

const message = () =>{
    if(checkWinner() == player.name){
        document.getElementById("message-title").innerText = "Congratulation you won";
    
        
    } else{
        document.getElementById("message-title").innerText = "YOUR LOST";

    }
}

// var name = prompt("Please enter your name");


document.getElementById("new-game").addEventListener("click",()=>{
    newGame();
})
document.getElementById("deal-card").addEventListener("click",()=>{
    if(turn = "player" && player.handValue < 21){
        player.hand.push(deal());
        player.handValue = checkCardsValue(player.hand);
        player.addImgElement();
    }
})
document.getElementById("end-turn").addEventListener("click",()=>{
    comPlayer();
})
var name = prompt("Please enter your name:")
var player = new Player(name,"player-cards", "player-name", "player-value", "human")
newGame();



// com.handValue = checkCardsValue(com.hand);
// console.log(player.name + "'s turn")
// do{
//     console.log(player.name + " This is your hand " + player.hand);
//     var answer = prompt("Do you want another card? ");
//     if(answer){
//         player.hand.push(deal());
//         player.handValue = checkCardsValue(player.hand)
//     }else{
//         break;
//     }
// }while(player.handValue < 21)


// comPlayer();


console.log("GAME OVER")

