$(document).ready(function() {

  let cards = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
    suit = ["Hearts", "Diamonds", "Spades", "Clubs"],
    deck = [],
    shuffledCards = [],
    card,
    playersCard = [],
    dealersCard = [],
    turn = "player";

  // multiplayers start
  let numberOfPlayers = 2;

  let players = [
    {cards: [], score: 0}
  ]

  for (let i = 1; i <= numberOfPlayers; i++) {
    players.push({cards: [], score: 0})
  }

  console.log(players);
  // multiplayers end

  function createDeck() {
    for(let i = 0; i < cards.length; i++) {
      for(let j = 0; j < suit.length; j++) {
        deck.push({"value": cards[i], "suit": suit[j], "point": getPoints(cards[i])});
      }
    }
    return deck;
  }

  function getPoints(card) {
    if (card === "A") {
      return 11;
    } else if (card === "J" || card === "Q" || card === "K") {
      return 10;
    } else {
      return card;
    }
  }

  (function shuffle() {
    $('#hit').attr("disabled", false);
    shuffledCards = createDeck();
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = shuffledCards[i];
      shuffledCards[i] = shuffledCards[j];
      shuffledCards[j] = temp;
    }
    return shuffledCards;
  })();

  function deal() {
    card1 = shuffledCards[0];
    card2 = shuffledCards[1];
    card3 = shuffledCards[2];
    playersCard.push(card1, card2);
    dealersCard.push(card3);
    showCard(playersCard, turn);
    showCard(dealersCard, "dealer");
    shuffledCards.splice(0, 3);
  };

  function showCard(array, turn) {
    for (let key in array) {
      $('.'+turn).append("<div class='card " + array[key].suit + "'><span> " + array[key].value + " </span><span class='reverse " + array[key].suit + "'>" + array[key].value + "</span></div>");
    }
    $('#score-'+turn).html(turn.charAt(0).toUpperCase() + turn.slice(1) + " score: " + score(array));
  }

  function newCard() {
    let newCard = shuffledCards[0];
    $('.' + turn).append("<div class='card " + newCard.suit + "'><span> " + newCard.value + " </span><span class='reverse " + newCard.suit + "'>" + newCard.value + "</span></div>");
    if (turn == "player") {
      playersCard.push(newCard);
      $('#score-' + turn).html(turn.charAt(0).toUpperCase() + turn.slice(1) + " score: " + score(playersCard));
    }
    if (turn == "dealer") {
      dealersCard.push(newCard);
      $('#score-' + turn + '').html(turn.charAt(0).toUpperCase() + turn.slice(1) + " score: " + score(dealersCard));
    }
    shuffledCards.splice(0, 1);
    checkWinner();
  }

  function score(object) {
    let sum = 0;
    for (let key in object) {
      sum += object[key].point;
    }
    return sum;
  }

  function restart() {
    playersCard.splice(0,playersCard.length);
    dealersCard.splice(0,dealersCard.length);
    $('.card').remove();
    turn = "player";
    deal();
  }

  function checkWinner() {
    if (score(dealersCard) > 21) {
      $('#stick').attr("disabled", true);
      setWinner("player");
    }

    if (score(playersCard) > 21) {
      setWinner("dealer");
      $('#stick').attr("disabled", true);
      $('#hit').attr("disabled", true);
    }

    if (score(dealersCard) >= score(playersCard) && score(dealersCard) <= 21) {
      if (score(dealersCard) > score(playersCard)) {
        setWinner("dealer");
        $('#stick').attr("disabled", true);
      } else if (score(dealersCard) < score(playersCard)) {
        setWinner("player");
        $('#stick').attr("disabled", true);
      } else if (score(dealersCard) == score(playersCard)) {
        setWinner("tie");
        $('#stick').attr("disabled", true);
        $('#hit').attr("disabled", true);
      }
    }
  }

  function setWinner(winner) {
    if (winner == "tie") {
      $('#winner').html("Tie!");
    } else {
      $('#winner').html("The winner is: " + winner);
    }
  }

  $('#hit').click(function() {
    newCard();
  });

  $('#stick').click(function() {
    $('#hit').attr("disabled", true);
    turn = "dealer";
    while (score(dealersCard) < score(playersCard)) {
      newCard()
    }
  });

  $('#playAgain').click(function() {
    $('#stick').attr("disabled", false);
    $('#hit').attr("disabled", false);
    restart();
    $('#winner').html(" ");
  });

  $('#shuffle').click(function() {
    $('#winner').html(" ");
    turn = "player";
    $('#stick').attr("disabled", false);
    $('#hit').attr("disabled", false);
    restart();
  });

  deal();

});
