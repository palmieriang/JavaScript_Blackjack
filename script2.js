$(document).ready(function() {

  var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  var suit = ["Hearts", "Diamonds", "Spades", "Clubs"];
  var deck = [];
  var shuffledCards = [];
  var card;
  var playersCard = [];
  var dealersCard = [];
  var score1 = 0;
  var turn = "player"

  function createDeck() {
    for(var i = 0; i < cards.length; i++) {
      for(var j = 0; j < suit.length; j++) {
        if(cards[i] === 1) {
          deck.push({"value": cards[i], "suit": suit[j], "point": 11});
        } else if(cards[i] === "J" || cards[i] === "Q" || cards[i] === "K") {
          deck.push({"value": cards[i], "suit": suit[j], "point": 10});
        } else {
          deck.push({"value": cards[i], "suit": suit[j], "point": cards[i]});
        }
      }
    }
    return deck;
  }

  function shuffle() {
    shuffledCards = createDeck();
    for (var i = shuffledCards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledCards[i];
      shuffledCards[i] = shuffledCards[j];
      shuffledCards[j] = temp;
    }
    return shuffledCards;
  }

  shuffle();
  console.log(shuffledCards);

  function deal() {
    card1 = shuffledCards[0];
    card2 = shuffledCards[1];
    card3 = shuffledCards[2];
    playersCard.push(card1, card2);
    dealersCard.push(card3);
    showCard(playersCard, turn);
    showCard(dealersCard, "dealer");
    shuffledCards.splice(0, 3);
  }

  function showCard(array, turn) {
    console.log(array, turn)
    for (var key in array) {
      $('.'+turn).append("<div class='card'><span> " + array[key].value + " </span></div>");
    }
    $('#score-'+turn).html("Player score: " + score(array));
  }

  function newCard() {
    var newCard = shuffledCards[0];
    $('.' + turn + '').append("<div class='card'><span> " + newCard.value + " </span></div>");
    if (turn == "player") {
      playersCard.push(newCard);
      $('#score-' + turn + '').html("Player score: " + score(playersCard));
    }
    if (turn == "dealer") {
      dealersCard.push(newCard);
      $('#score-' + turn + '').html("Player score: " + score(dealersCard));
    }
    shuffledCards.splice(0, 1);
  }

  function score(object) {
    var sum = 0;
    for (var key in object) {
      sum += object[key].point;
    }
    return sum;
  }

  $('#hit').click(function() {
    newCard();
  });

  $('#stick').click(function() {
    turn = "dealer";
    newCard()
  });

  deal();

  score(playersCard);

  function test() {
    console.log(shuffledCards)
  }

  console.log(shuffledCards);



});
