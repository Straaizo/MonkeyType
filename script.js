const $time = document.querySelector('time');
const $paragraph = document.querySelector('p');
const $input = document.querySelector('input');


const INITIAL_TIME = 30;

const TEXT =  'the quick brown fox jumps over the lazy dog and monkeytype for fun profit using vanilla js for the typing test speed'


let words = []
let currentTime = INITIAL_TIME;

initGame()
initEvents()

function initGame() {
  words = TEXT.split(' ').slice(0,32)
  currentTime = INITIAL_TIME;

  $time.textContent = currentTime


  $paragraph.innerHTML = words.map((word, index) => {
    const letters = word.split('')

    return `<word> 
      ${letters
      .map(letter => `<letter>${letter}</letter>`)
      .join('')
    }
    </word>
    `
  }).join('')


  const $firstWord = $paragraph.querySelector('word')
  $firstWord.classList.add('active')
  $firstWord.querySelector('letter').classList.add('active')

  const IntervalId = setInterval (() => {
    currentTime--
    $time.textContent = currentTime

    if (currentTime == 0) {
      clearInterval(IntervalId)
      gameOver()
    }
  }, 1000)
}

function initEvents() {
  $input.addEventListener('keydown',onkeydown)
  $input.addEventListener('keyup',onkeyup)
}


function onkeydown(event) {
  const $currentWord = $paragraph.querySelector('word.active')
  const $currentLetter = $currentWord.querySelector('letter.active')

  if (event.key === ' ') {
    event.preventDefault()

    const $nextWord = $currentWord.nextElementSibling
    if (!$nextWord) return

    $currentWord.classList.remove('active','marked')
    $currentLetter.classList.remove('active')

    const $nextLetter = $nextWord.querySelector('letter')
    $nextWord.classList.add('active')
    $nextLetter.classList.add('active')

    // Limpiar input
    $input.value = ''
  
    const hasMissedLetters = $currentWord
    .querySelectorAll('letter:not(.correct)').length > 0

    const classToAdd = hasMissedLetters ? 'marked' : 'correct'  
    $currentWord.classList.add(classToAdd)
  }


}


function onkeyup(){
  const $currentWord = $paragraph.querySelector('word.active')
  const $currentLetter = $currentWord.querySelector('letter.active')
  
  const currentWord = $currentWord.innerText.trim()
  $input.maxLength = currentWord.length
  console.log({ value: $input.value, currentWord})

  const $allLetters = $currentWord.querySelectorAll('letter')

  $allLetters.forEach($letter => $letter.classList.remove('correct','incorrect'))

  $input.value.split('').forEach((char, index) => {
   const $letter = $allLetters[index]
   const letterToCheck = currentWord[index]

    const isCorrect = char == letterToCheck
    const letterClass = isCorrect ? 'correct' : 'incorrect'
    $letter.classList.add(letterClass)
  })

  $currentLetter.classList.remove('active', 'is-last')
  const inputLength = $input.value.length
  const $nextActiveLetter = $allLetters[inputLength]

  if ($nextActiveLetter) {
    $nextActiveLetter.classList.add('active')
  } else {
    $currentLetter.classList.add('active', 'is-last')
  }

}







function gameOver () {
  console.log('game over')
}

