$(document).ready(function() {

  deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  var playersCard = [];
  var dealersCard = [];

  var score1 = 0;
  var score2 = 0;

  function getSuit() {
    suit = Math.floor(Math.random() * 4) + 1;
    if (suit == 1) {
      return "Hearts"
    } else if( suit == 2) {
      return "Diamonds"
    } else if( suit == 3) {
      return "Spades"
    } else {
      return "Clubs"
    }
  }

  function deal() {
    index = Math.floor(Math.random() * deck.length);
    card = deck[index];
    getSuit();
    return card
  }

  function getPoint(card) {
    if (card == 1) {
      return 11;
    } else if (card == "J" || card == "Q" || card == "K") {
      return 10;
    } else {
      return card;
    }
  }

  function score(array) {
    var sum = array.reduce(add, 0);

    function add(a, b) {
        return a + b;
    }
    return sum;
  }

  var card1 = deal();
  var card2 = deal();
  var card3 = deal();

  playersCard = [getPoint(card1), getPoint(card2)];
  dealersCard = [getPoint(card3)];

  for (var i = 0; i < playersCard.length; i++) {
    $('.player').append("<div class='card'><span> " + playersCard[i] + " </span></div>");
    $('#score-player').html("Player score: " + score(playersCard));
  }
  for (var i = 0; i < dealersCard.length; i++) {
    $('.dealer').append("<div class='card'><span> " + dealersCard[i] + " </span></div>");
    $('#score-dealer').html("Dealer score: " + score(dealersCard));
  }

  $('#hit').click(function hit() {
    newCard = deal();
    playersCard.push(newCard);
    console.log(playersCard);
    $('.player').append("<div class='card'><span> " + newCard + " </span></div>");
    newCard = getPoint(newCard);
    playersCard.push(newCard);
    $('#score-player').html("Player score: " + score(playersCard));
  })

  console.log(playersCard);
  console.log(dealersCard);

});
