const deck = []

const values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

const suits = ['diamonds', 'hearts', 'spades', 'clubs']

const ranks = [
  'ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king'
]

const dealerHand = []

const playerHand = []

let playerSum = 0

let dealerSum = 0

// recipe for deck of cards

const main = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = {
        rank: ranks[j],
        suit: suits[i],
        value: values[j],
        imageUrl: ranks[j] + '_of_' + suits[i] + '.svg'
      }
      deck.push(card)
    }
  }
  shuffleDeck()
  dealACard()
}

// recipe for deck shuffle

const shuffleDeck = () => {
  let temp
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

const dealACard = () => {
  for (let i = 0; i < 2; i++) {
    const drawnCard = deck.pop()
    playerHand.push(drawnCard)
    const cardLi = document.createElement('li')
    const img = document.createElement('img')
    img.src = './images/' + drawnCard.imageUrl
    cardLi.appendChild(img)
    document.querySelector('.player-cards').appendChild(cardLi)
    playerSum += playerHand[i].value
    document.querySelector('.player-score').textContent = playerSum
  }
}

const hitMe = () => {
  const hitUserCard = deck.pop()
  playerHand.push(hitUserCard)
  const userHandLiTwo = document.createElement('li')
  const imgTwo = document.createElement('img')
  imgTwo.src = './images/' + hitUserCard.imageUrl
  userHandLiTwo.appendChild(imgTwo)
  document.querySelector('.player-cards').appendChild(userHandLiTwo)
  playerSum += hitUserCard.value
  document.querySelector('.player-score').textContent = playerSum
  document.querySelector('.player-name').textContent = 'WINNER'

  if (playerSum > 21) {
    document.querySelector('.player-name').textContent = 'BUST!'
    document.querySelector('.dealer-name').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
  } else if (playerSum === 21) {
    document.querySelector('.player-name').textContent = 'WINNER'
    document.querySelector('.dealer-name').textContent = 'BUST!'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
  }
}

const hitDealer = () => {
  let i = 0
  while (dealerSum <= 17) {
    document.querySelector('.card-back').classList.add('hidden')
    document.querySelector('.card-back1').classList.add('hidden')
    const drawnDealerCard = deck.pop()
    dealerHand.push(drawnDealerCard)
    const dealerHandLi = document.createElement('li')
    const img = document.createElement('img')
    img.src = './images/' + drawnDealerCard.imageUrl
    dealerHandLi.appendChild(img)
    document.querySelector('.dealer-cards').appendChild(dealerHandLi)
    dealerSum += dealerHand[i].value
    document.querySelector('.dealer-score').textContent = dealerSum
    i++
  }
  if (dealerSum > 21) {
    document.querySelector('.player-name').textContent = 'WINNER'
    document.querySelector('.dealer-name').textContent = 'BUST!'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
  } else if (playerSum === 21) {
    document.querySelector('.player-name').textContent = 'BUST!'
    document.querySelector('.dealer-name').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
  } else if (dealerSum > playerSum) {
    document.querySelector('.player-name').textContent = 'BUST!'
    document.querySelector('.dealer-name').textContent = 'WINNER'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
  } else if (playerSum > dealerSum) {
    document.querySelector('.player-name').textContent = 'WINNER'
    document.querySelector('.dealer-name').textContent = 'BUST!'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
  } else if (playerSum === dealerSum) {
    document.querySelector('.player-name').textContent = 'PUSH'
    document.querySelector('.dealer-name').textContent = 'PUSH'
    document.querySelector('.hit-button').disabled = true
    document.querySelector('.stand-button').disabled = true
  }
}

const playAgain = () => {
  location.reload()
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit-button').addEventListener('click', hitMe)
document.querySelector('.stand-button').addEventListener('click', hitDealer)
document
  .querySelector('.play-again-button')
  .addEventListener('click', playAgain)
