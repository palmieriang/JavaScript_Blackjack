$(document).ready(function() {

  var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  var suit = ["Hearts", "Diamonds", "Spades", "Clubs"];
  var deck = [];
  var shuffledCards = [];
  var card;
  var playersCard = [];
  var dealersCard = [];
  var score1 = 0;

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
    showPlayerCard(playersCard);
    showDealerCard(dealersCard);
    shuffledCards.splice(0, 3);
  }

  function showPlayerCard(playersCard) {
    for (var key in playersCard) {
      $('.player').append("<div class='card'><span> " + playersCard[key].value + " </span></div>");
    }
    $('#score-player').html("Player score: " + score(playersCard));
  }

  function showDealerCard(dealersCard) {
    for (var key in dealersCard) {
      $('.dealer').append("<div class='card'><span> " + dealersCard[key].value + " </span></div>");
    }
  }

  function score(object) {
    var sum = 0;
    for (var key in object) {
      sum += object[key].point;
    }
    return sum;
  }

  deal();

  $('#hit').click(function() {
    var newCard = shuffledCards[0];
    playersCard.push(newCard);
    $('.player').append("<div class='card'><span> " + newCard.value + " </span></div>");
    $('#score-player').html("Player score: " + score(playersCard));
    shuffledCards.splice(0, 1);
  })

  score(playersCard);


  function test() {
    console.log(shuffledCards)
  }

  console.log(shuffledCards);



});
