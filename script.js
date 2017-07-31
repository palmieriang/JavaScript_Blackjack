$(document).ready(function() {

  var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  var suit = ["Hearts", "Diamonds", "Spades", "Clubs"];
  var deck = [];
  var shuffledCards = [];
  var card;
  var playersCard = [];
  var dealersCard = [];
  var turn = "player";

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

  (function shuffle() {
    $('#hit').attr("disabled", false);
    shuffledCards = createDeck();
    for (var i = shuffledCards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledCards[i];
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
    for (var key in array) {
      $('.'+turn).append("<div class='card " + array[key].suit + "'><span> " + array[key].value + " </span><span class='reverse " + array[key].suit + "'>" + array[key].value + "</span></div>");
    }
    $('#score-'+turn).html("Player score: " + score(array));
  }

  function newCard() {
    var newCard = shuffledCards[0];
    $('.' + turn).append("<div class='card " + newCard.suit + "'><span> " + newCard.value + " </span><span class='reverse " + newCard.suit + "'>" + newCard.value + "</span></div>");
    if (turn == "player") {
      playersCard.push(newCard);
      $('#score-' + turn).html("Player score: " + score(playersCard));
    }
    if (turn == "dealer") {
      dealersCard.push(newCard);
      $('#score-' + turn + '').html("Player score: " + score(dealersCard));
    }
    shuffledCards.splice(0, 1);
    checkWinner();
  }

  function score(object) {
    var sum = 0;
    for (var key in object) {
      sum += object[key].point;
    }
    return sum;
  }

  function restart() {
    playersCard.splice(0,playersCard.length);
    dealersCard.splice(0,dealersCard.length);
    $('.card').remove();
    deal();
  }

  function checkWinner() {
    if (score(playersCard) > 21) {
      console.log("You lose");
      theWinnerIs("dealer");
      $('#stick').attr("disabled", true);
      $('#hit').attr("disabled", true);
    }
    if (score(dealersCard) > 21) {
      console.log("You win");
      $('#stick').attr("disabled", true);
      theWinnerIs("dealer");
    }

    if (score(dealersCard) > 17 && score(dealersCard) <= 21) {
      if (score(dealersCard) <= 21 && score(dealersCard) > score(playersCard)) {
        theWinnerIs("dealer");
        $('#stick').attr("disabled", true);
      } else if (score(dealersCard) < score(playersCard)) {
        theWinnerIs("player");
        $('#stick').attr("disabled", true);
      } else if (score(dealersCard) == score(playersCard)) {
        console.log("Tie");
        $('#stick').attr("disabled", true);
        $('#hit').attr("disabled", true);
      }
    }

  }

  function theWinnerIs(winner) {
    $('#winner').html("The winner is: " + winner);
  }

  $('#hit').click(function() {
    newCard();
  });

  $('#stick').click(function() {
    $('#hit').attr("disabled", true);
    turn = "dealer";
    while (score(dealersCard) < 17) {
      newCard()
    }
  });

  $('#playAgain').click(function() {
    $('#stick').attr("disabled", false);
    $('#hit').attr("disabled", false);
    playersCard.splice(0,playersCard.length);
    dealersCard.splice(0,dealersCard.length);
    $('.card').remove();
    turn = "player";
    $('.winner').remove();
    deal();
  });  

  $('#shuffle').click(function() {
    $('.winner').remove();
    restart();
  });

  deal();

  function test() {
    console.log(shuffledCards)
  }

});
