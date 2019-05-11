
// icon vars
const grinder="https://cdn0.iconfinder.com/data/icons/coffee-brewing-glyph/16/7-512.png";
const chemex="https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_chemex-512.png";
const plant="https://cdn1.iconfinder.com/data/icons/barista/256/barista-icons_coffea-arabica-512.png";
const house="https://cdn1.iconfinder.com/data/icons/barista/256/barista-icons_coffee-shop-sign-512.png";
const cup="https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_coffee-to-go-512.png";
const espresso="https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_espresso-machine-with-cup-512.png";
const perk="https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_espresso-maker-512.png";
const press="https://cdn2.iconfinder.com/data/icons/barista/256/barista-icons_french-press-512.png";


// shuffle vars
let deck = [grinder, grinder, chemex, chemex, plant, plant, house, house, cup, cup, espresso, espresso, perk, perk, press, press]
let deal = shuffle(deck);


// game vars
let clickCount = 0; 
let turnCount = 0;
let matchCount = 0;
let cardOne;
let cardTwo;
let pickOne;
let resetClick;
let icon;
let cards = document.querySelectorAll('.deck li');


// timer vars
let displayTime;
let stopwatch = document.getElementsByClassName('timer');
let start;
let finish;
let time;


// scoreboard vars
const starRate = document.getElementsByClassName('fa-star');
let clearCards;
let game;


 // start game
play(cards, deal);

// timer starts when first card is clicked
for (i = 0; i < cards.length; i++) {
	let card = cards[i];
	
	card.addEventListener ('click', function(event) {

		if(!game){
			start = performance.now();
			game = true;
			displayTime = setInterval(startDisplay, 1000);
		}

		clickCount += 1;

		this.classList.add('flip-2-hor-bottom-1');
		this.childNodes[1].style.visibility = 'visible';

		if (clickCount == 1) {
			cardOne = this;
			pickOne = cardOne.childNodes[1].src;
			cardOne.classList.add('open');
			this.style.pointerEvents = "none";	
		}


	// display match count
		if (clickCount == 2 && this != cardOne) {

			for (i = 0; i < 16; i++) {
				cards[i].style.pointerEvents = "none";
			}

			cardTwo = this;

			let pickTwo = cardTwo.childNodes[1].src;

			cardTwo.classList.add('open');

			if(pickOne == pickTwo){
				cardTwo.classList.add('match');
				cardOne.classList.add('match');

				matchCount += 1;

				document.getElementsByClassName('matches')[0].textContent= (matchCount);
				cardOne.style.pointerEvents = "auto";
				clickCount = 0;
			}

	 //winning conditions			
			if (matchCount == 8) {					
				game = false;
				stopwatch[1].textContent = ('Time ' + time + ' seconds');

	 //display popup modal
			document.getElementById('myModal').style.display = 'block';

			starRate[3].classList.add('rotate-scale-up');
			starRate[4].classList.add('rotate-scale-up');
			starRate[5].classList.add('rotate-scale-up');

			resetDeck();
			
			} else {
			// no match, display miss, and reset cards		
			window.setTimeout(resetCards, 800);						
			}
			
			clickCount = 0;
			
			} else {
			clickCount = 1;
		}
	});
}

// click 'fa-repeat' to replay resets the board
let restart = document.getElementsByClassName('fa-repeat');

for(i = 0; i < 2; i++){
	restart[i].addEventListener('click', function(event){
		resetDeck();
		resetCards();
		modal.style.display = "none";
		clearInterval(displayTime);
		resetStars();
	});
}

 // shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// reset stars, deck, and clear score-board

function resetStars() {
	for (i = 0; i < 6; i++) {
			starRate[i].style.visibility = 'visible';
		}
}

function resetDeck(){
	for (i = 0; i < cards.length; i++) {
		cards[i].classList.remove('show', 'open', 'match');
		cardTwo.childNodes[1].style.visibility = 'hidden';
		cardOne.childNodes[1].style.visibility = 'hidden';
	}

	document.getElementsByClassName('matches')[0].textContent= ('');
	document.getElementsByClassName('moves')[0].textContent= ('');
	document.getElementsByClassName('timer')[0].textContent= ('Time:');

	matchCount = 0;
	turnCount = 0;
	clickCount = 0;

	clearInterval(displayTime);

	deal = shuffle(deck);
	play(cards, deal);

}

// add card icons
function play(cards, deal){

	for (i = 0;i < 16; i++){
		let shuffle = cards[i].childNodes[1];
		shuffle.src = deal[i];
		shuffle.style.visibility = 'hidden';			
	}
}

// timer 
function startDisplay() {
	currentTime = performance.now();

	let totalSeconds = ((currentTime - start)/1000).toFixed(0);
	let minutes = (totalSeconds/60).toFixed(0);
	let seconds = totalSeconds % 60;

	if (seconds < 10){
		time = minutes + ":0" + seconds;
	}
	else{
		time = minutes + ":" + seconds;
	}

	stopwatch[0].textContent = ('Time ' + time);
}

function resetCards(){

	cardOne.classList.add('flip-2-hor-bottom-2');
	cardTwo.classList.add('flip-2-hor-bottom-2');

	cardTwo.classList.remove('open', 'show');
	cardOne.classList.remove('open', 'show');
	
	cardTwo.childNodes[1].style.visibility = 'hidden';
	cardOne.childNodes[1].style.visibility = 'hidden';

	window.setTimeout(removeAnimation, 300);


	for (i = 0; i < 16; i++) {
			cards[i].style.pointerEvents = "auto";
		}

	turnCount += 1;

	document.getElementsByClassName('moves')[1].textContent= (turnCount);
	document.getElementsByClassName('moves')[0].textContent= (turnCount);
	
// misses change star rating

	if (turnCount == 5) {
		starRate[2].style.visibility = 'hidden';	
		starRate[5].style.visibility = 'hidden';
	}
	if (turnCount == 10) {
		starRate[1].style.visibility = 'hidden'; 
		starRate[3].style.visibility = 'hidden';
	}
}


function removeAnimation() {
	cardOne.classList.remove('flip-2-hor-bottom-2','flip-2-hor-bottom-1');
	cardTwo.classList.remove('flip-2-hor-bottom-2', 'flip-2-hor-bottom-1');
}


// get modal
const modal = document.getElementById('myModal');

// get <span> element to close the modal
const span = document.getElementsByClassName("close")[0];

// when the user clicks on <span> (x), close modal
span.onclick = function() {
	resetStars();
	modal.style.display = "none";
	
	for (i = 0; i < 16; i++) {
			cards[i].style.pointerEvents = "auto";
		}
}

// when the user clicks anywhere outside of modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
		resetStars();
		modal.style.display = "none";
		
		for (i = 0; i < 16; i++) {
			cards[i].style.pointerEvents = "auto";
		}
    }
}