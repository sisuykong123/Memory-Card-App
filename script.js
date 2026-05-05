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
    matchedCard++;

    if (matchedCard == 8) {
      clearInterval(timer); // បញ្ឈប់ timer

      setTimeout(() => {
        alert("🎉 Winner!");
        shuffleCard();
        resetTimer(); // ចាប់ផ្តើម timer វិញ
      }, 500);
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }
}

function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  disableDeck = false;

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

let timeLeft = 50;
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
  timeLeft = 50;
  document.getElementById("time").innerText = timeLeft;
  startTimer();
}
startTimer();
