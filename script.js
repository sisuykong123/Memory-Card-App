const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
  let clickedCard = e.target; // getting user clicked card
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      // return the cardOne value to clickedCard
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    // if two cards img matched
    matchedCard++; // increment matched value by 1
    // if matched value is 8 that means user has matched all the cards (8 * 2 = 16 cards)
    if (matchedCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000); //calling both card value to blank
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; // setting both card value to blank
    return (disableDeck = false);
  } else {
    //if two card not matched
    setTimeout(() => {
      //adding shake class to both card after 400ms
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      //removing both shake & flip classes from the both card after  1.2 seconds
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = ""; // setting both card value to blank
      disableDeck = false;
    }, 1200);
  }
}

function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  disableDeck = false;
  let timeLeft = 30;

  // creating array of 16 items and each item is repeated twice
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); //sorting array item randomly

  // removing flip class from all cards and passing random image to each card
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((cards) => {
  cards.addEventListener("click", flipCard);
});

let timeLeft = 30;
let timer;

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      disableDeck = true;
      alert("⏰🫵😝 Game Over");
    }
  }, 1000);
}

function resetTimer() {
  timeLeft = 30;
  document.getElementById("time").innerText = timeLeft;
  startTimer();
}
shuffleCard();
startTimer();
