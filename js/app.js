/*
 * Create a list that holds all of your cards
 */
let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

/*DOM MANIPULATION*/

const scorePanel = document.querySelector(".score-panel");
const stars = document.querySelector(".stars");
const moves = document.querySelector(".moves");
const restart = document.querySelector(".restart");
const deck = document.querySelector(".deck");
const winnerModal = document.querySelector('#winner-modal');
const winnerMessage = document.querySelector('#winner-message');
const playAgain = document.querySelector('.playAgain');

let openCards = [];
let matchedCards = 0;
let star=3;
moves.textContent = 0;
let moveCounter = moves.textContent;
let interval;
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let timeStart = false;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
restart.addEventListener('click', gameStart); /*Restart Button*/

function gameStart(){
  stopTimer();
  timeStart = false;
  timer.textContent = minute+"minutes "+second+"seconds";
  let shuffledCards = shuffle(cardList);  /*Shuffle the Cards*/
  for (let i=0; i<cardList.length; i++){  /*Loop through the card list*/
    let deckListElements = deck.getElementsByTagName("li"); /*Empty the list classes and replace them with the right ones*/
    let listElementsClass = deckListElements[i].getAttribute("class");
    deckListElements[i].className='';
    deckListElements[i].classList.add('card');

    let deckIconElements = deck.getElementsByTagName("i"); /*shuffle the icons*/
    let iconElementsClass = deckIconElements[i].getAttribute("class");
    deckIconElements[i].className='';
    deckIconElements[i].classList.add('fa',shuffledCards[i]);
  }
  openCards = [];
  matchedCards = 0;
  moves.textContent = 0;
  moveCounter = moves.textContent;
  stars.innerHTML='<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
  star='3';
  };

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


gameStart();


deck.addEventListener('click',function(event){
  if (!timeStart) {
    startTimer();
    timeStart= true;
  };
  let card = event.target;
  if (openCards.length<2){
    if (!card.classList.contains('open')){ /*if the card is not already clicked*/
      showSymbol(card); /*display the card's symbol*/
      addCardOpen(card); /* "open" the card and add it to a list of "open" cards */
    }};
  if (openCards.length===2){
    if (openCards[0].innerHTML === openCards[1].innerHTML){/*check if the card clicked matches the card we opened*/
      matchLock();
      matchedCards++;
     }
    else {
      matchFail()
      };
  moveCounter++;
  moves.innerText = moveCounter /*adds a move*/
  if (moves.innerText > 22) {
      stars.innerHTML='<li><i class="fa fa-star"></i></li>';
      star='1';
    }
    else if (moves.innerText > 11){
      stars.innerHTML='<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
      star='2';
    }
    else {
      stars.innerHTML='<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
      star='3';
    }
  }; /*decides the star rating*/
  gameOver() /*ends the game if the pairs are complete*/
});

function addCardOpen(card){
  openCards.push(card);
};

function showSymbol(card){
  card.classList.add('open');
  card.classList.add('show');
 };

function matchLock(){
  openCards[0].classList.add('match');
  openCards[0].classList.remove('open','show');
  openCards[1].classList.add('match');
  openCards[1].classList.remove('open','show');
  openCards=[];
};

function matchFail(){
  setTimeout(function(){
    openCards[0].classList.remove("show", "open");
    openCards[1].classList.remove("show", "open");
    openCards = [];
  },600);
};

function gameOver(){
  if (matchedCards === 8){
    winnerModal.style.display='block';
    winnerMessage.textContent= "You win! You completed the game in "+minute+" minutes and "+second+" seconds, "+moveCounter+" moves and with "+star+" stars"+"!";
    stopTimer();
  }
};


/*Timer*/

function startTimer(){
   interval = setInterval(function(){
        timer.textContent = minute+"minutes "+second+"seconds";
        second++;
        if(second === 60){
            minute++;
            second=0;
        }
    },1000);
};


function stopTimer(){
  clearInterval(interval);
  second = 0;
  minute = 0;
}

/*Restarts*/
restart.addEventListener('click', gameStart());

playAgain.addEventListener('click',function(){
  winnerModal.style.display = "none";
  gameStart();
});
