const windows = document.querySelectorAll('section');
const userButtons = document.querySelectorAll('button');
const optionCards = document.querySelectorAll('.option');
const flipCardInner = document.getElementById('fci');
const playerInput = document.getElementById('guessInput');
const inputCard = document.getElementById('inputCard');
const guessNum = document.getElementById('guess-number');
const scoreMode = document.getElementById('score-mode');
const totalGuess = document.getElementById('guesses');
const correctGuess = document.getElementById('correct-guesses');
const resultTry = document.getElementById('result-try');
const resultCorrect = document.getElementById('result-cor');
const resultRatio = document.getElementById('result-rat');
const allAudio = document.querySelectorAll('audio');

var selectedOption = '';
var defaultScore = 13;
var totalGuessCount = 0;
var correctGuessCount = 0;

userButtons.forEach((e, i) => {
  e.addEventListener('click', () => {
    allAudio[0].play();
    switch (i) {
      case 0:
        buttonEnter();
        break;

      case 1:
        buttonNext();
        break;

      case 2:
        buttonPlay();
        break;

      case 3:
        buttonGoBack();
        break;

      case 4:
        buttonFlipCard();
        break;

      case 5:
        buttonNextGame();
        break;

      case 6:
        buttonMenuOpen();
        break;
    }
  });
});

optionCards.forEach((e, i) => {
  e.addEventListener('click', () => {
    allAudio[0].play();
    e.classList.toggle('select');

    if (e.classList.contains('select')) {
      selectedOption = e.id;
    } else {
      selectedOption = '';
    }

    if (i == 0 && optionCards[1].classList.contains('select')) {
      optionCards[1].classList.toggle('select');
    } else if (i == 1 && optionCards[0].classList.contains('select')) {
      optionCards[0].classList.toggle('select');
    } else if (i == 2 && optionCards[3].classList.contains('select')) {
      optionCards[3].classList.toggle('select');
    } else if (i == 3 && optionCards[2].classList.contains('select')) {
      optionCards[2].classList.toggle('select');
    }
  });
});

inputCard.addEventListener('animationend', () => {
  inputCard.classList.remove('shake');
});

userButtons[4].addEventListener('animationend', () => {
  userButtons[4].classList.remove('shake');
});

userButtons[5].addEventListener('animationend', () => {
  userButtons[5].classList.remove('shake');
});

function buttonEnter() {
  windows[0].classList.add('hide');
  windows[1].classList.remove('hide');
}

function buttonNext() {
  if (selectedOption.includes('single')) {
    windows[1].classList.add('hide');
    windows[2].classList.remove('hide');
  } else if (selectedOption.includes('multiple')) {
    swal('Multiple Player is not available at this moment.', { icon: 'error' });
  } else if (selectedOption.includes('')) {
    swal('Please select a playig mode!', { icon: 'warning' });
  }
}

function buttonPlay() {
  if (selectedOption.includes('unlimited')) {
    windows[2].classList.add('hide');
    windows[3].classList.remove('hide');
    scoreMode.innerText = 'Total Guesses: ';
    totalGuess.innerText = 0;
  } else if (selectedOption.includes('limited')) {
    windows[2].classList.add('hide');
    windows[3].classList.remove('hide');
    scoreMode.innerText = 'Remaining Guesses: ';
    totalGuess.innerText = defaultScore;
  } else if (selectedOption.includes('')) {
    swal('Please select a score mode!', { icon: 'warning' });
    allAudio[0].play();
  }
}

function buttonGoBack() {
  swal({
    title: 'Are you sure to exit?',
    icon: 'warning',
    buttons: {
      yes: {
        text: 'Yes',
        value: true,
      },
      no: {
        text: 'No',
        value: false,
      },
    },
  }).then((value) => {
    allAudio[0].play();
    if (value) {
      resultWindow();
    }
  });
}

function buttonFlipCard() {
  if (flipCardInner.classList.contains('flip')) {
    userButtons[5].classList.add('shake');
    return;
  }
  if (playerInput.value === '') {
    inputCard.classList.add('shake');
    return;
  }
  let randomNumber = Math.floor(Math.random() * 10);
  guessNum.innerText = randomNumber;
  flipCardInner.classList.add('flip');
  totalGuessCount++;

  switch (selectedOption) {
    case 'unlimited':
      totalGuess.innerText = totalGuessCount;
      break;

    case 'limited':
      defaultScore--;
      totalGuess.innerText = defaultScore;
      break;
  }

  if (playerInput.value == randomNumber) {
    correctGuessCount++;
    allAudio[1].play();
  }

  correctGuess.innerText = correctGuessCount;
}

function buttonNextGame() {
  if (defaultScore == 0) {
    resultWindow();
  }

  if (flipCardInner.classList.contains('flip')) {
    flipCardInner.classList.remove('flip');
    playerInput.value = '';
  } else {
    userButtons[4].classList.add('shake');
  }
}

function buttonMenuOpen() {
  optionCards.forEach((e, i) => {
    e.classList.remove('select');
  });

  windows[4].classList.add('hide');
  windows[1].classList.remove('hide');

  selectedOption = '';
  defaultScore = 13;
  totalGuessCount = 0;
  correctGuessCount = 0;
}

function resultWindow() {
  windows[3].classList.add('hide');
  windows[4].classList.remove('hide');
  resultTry.innerText = totalGuessCount;
  resultCorrect.innerText = correctGuessCount;
  resultRatio.innerText = parseFloat(
    (correctGuessCount / totalGuessCount) * 100
  ).toFixed(2);
}
