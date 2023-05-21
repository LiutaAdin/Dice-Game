'use strict';

// Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const inputScore = document.querySelector('.input-score')
const form = document.getElementById('form')
const player = document.querySelector('.player')
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnSet = document.querySelector('.btn-set-score')
const wrapper = document.querySelector('.wrapper') 



const focus = function() {

    inputScore.addEventListener('click',function () {
        wrapper.classList.add('blur')
    })
    
    wrapper.addEventListener('click', function() {
        wrapper.classList.remove('blur')
        inputScore.classList.add('mw-0')
        
    })
}


let scores, currentScore, activePlayer, playing, setScore;

//starting condition




btnSet.addEventListener('click',function(e){
    e.preventDefault();
    let score;
    score = +inputScore.value;

    console.log(typeof inputScore.value)
    
    
    if(score || inputScore.value === ""){
        console.log(score)
        setScore = score
        inputScore.value = "";
                inputScore.value = "";
                console.log(setScore)
                init()
        
    } 
    wrapper.classList.toggle('blur')
    inputScore.classList.toggle('mw-0')   
})
    

    




const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  if(!setScore  || setScore === undefined){ setScore = 10}
  else{setScore}
  

  
  
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('blur')
  player1El.classList.remove('blur')
//   player0El.removeChild('.winner')
//   player1El.removeChild('.winner')

  focus();
    
  
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice function

btnRoll.addEventListener('click', function () {
    document.querySelector('.form-score').classList.add('hidden')

  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. ceck for a rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    // scores[1] = scores[1] + currentScore ⬆
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= setScore) {
      // Finish Game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');  
    }else 
    //switch to the next player
    switchPlayer();
    
    

  }
});

btnNew.addEventListener('click', function() {
    
    document.querySelector('.form-score').classList.remove('hidden')
    // inputScore.classList.toggle('mw-0')
    
    // input.focus()
    // focus()
    init();
    console.log(setScore)

});

