const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDesk = false;

function flipCard(e) {
   let clickedCard = e.target; //getting user clicked card
if(clickedCard !== cardOne && !disableDesk) {
    clickedCard.classList.add("flip");
    if(!cardOne) {
        //return the cardOne value to clickedCard
        return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disableDesk = true;
    let cardOneImg = cardOne.querySelector("img").src,
    cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
}
}

function matchCards(img1, img2) {
    if(img1 === img2) { //if two cards img matched
        matchedCard++; //increment matched value by 1
        if(matchedCard == 8) {
        setTimeout(()=>{
            return shuffleCard();
        }, 1000); //calling shuffleCard function after 1 sec
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //setting both card value to blank
        return disableDesk = false;
    }
    //if two card not matched
    setTimeout(() => {
        //adding shake class to both card after 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        //removing both shake and flip classes the both card after 1.2 seconds
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; //setting both card value to blank
        disableDesk = false;
    }, 1200);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDesk = false;
    //creating array of 16 items and each item is reparated twice
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sorting array item randomly
  
    //removing flip class from all cards and passing random image to each card
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => { //adding click event to all cards
    card.addEventListener("click", flipCard);
});