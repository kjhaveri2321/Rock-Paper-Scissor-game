let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0};

updateScoreElement();

/*
if(!score){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
} 
*/

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors');
  }
});

function playGame(playerMove){
  const ComputerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'scissors'){
    if(ComputerMove === 'rock'){
      result = 'You lose.';
    }
    else if (ComputerMove === 'paper'){
      result = 'You win.';
    }
    else if (ComputerMove === 'Scissors'){
      result = 'Tie.';
    } 
  }

  else if(playerMove === 'paper'){
    if(ComputerMove === 'rock'){
      result = 'You Win.';
    }
    else if (ComputerMove === 'paper'){
      result = 'Tie.';
    }
    else if (ComputerMove === 'Scissors'){
      result = 'You lose.';
    }
  }

  else if(playerMove === 'rock'){
    if(ComputerMove === 'rock'){
      result = 'Tie.';
    }
    else if (ComputerMove === 'paper'){
      result = 'You lose.';
    }
    else if (ComputerMove === 'Scissors'){
      result = 'You win.';
    }
  }

  if(result === 'You win.'){
    score.wins += 1;
  }
  else if(result === 'You lose.'){
    score.losses += 1;
  }
  else if(result === 'Tie.'){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = 
  `You <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${ComputerMove}-emoji.png" class="move-icon"> Computer`; 
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
  const RandomNumber = Math.random();
  let ComputerMove = '';
if(RandomNumber >= 0 && RandomNumber < 1/3){
ComputerMove = 'rock';
}
else if(RandomNumber >= 1/3 && RandomNumber < 2/3){
ComputerMove = 'paper';
}
else if(RandomNumber >= 2/3 && RandomNumber < 1){
ComputerMove = 'Scissors';
}

return ComputerMove;
}