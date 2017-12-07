$(document).ready(init)

var game;
function init(){
  game = new Deal52()
  game.controller.makeDeck()
  addClickHandlers();
}

function addClickHandlers(){
  $('.addPlayer').on('click', function(){ //adding players on game;
    $(this).text('playing')
    game.addPlayer(this);
  });
  $('.deal').on('click', function(){
    game.controller.deal(game.deck, this)
  });
  $('.shuffle').on('click', function(){
    game.controller.shuffle(game.deck);
  });
  $('.refresh').on('click', function(){
    game.deck=game.deck.concat(game.drawPile)
    game.drawPile=[];
    game.view.updateDiscardPile();
    for(let i = 0;i<game.players.length;i++){
      let player  = game.players[i];
      player.hand = [];
      player.score = null;
    }
    $('.hasPlayer td, .total').text('')
  })
}


function Deal52(){
  this.view = new View();
  this.controller = new Controller();
  this.cardType = [{type: 'club', symbol: '♣' },{type: 'spades', symbol: '♠' },{type: 'hearts', symbol: '♥' },{type: 'diamond', symbol: '♦' }]
  this.deck =[];
  this.drawPile=[]
  this.turn = 1;
  this.playerCount = 0;
  this.players =[];
  this.addPlayer = function(elem){
    if(this.playerCount<4){
      let parent = $(elem).parent();
      if(!$(parent).hasClass('hasPlayer')){
        this.playerCount++;
        var player = new Player(this.playerCount, parent);
        this.players.push(player);
        $(parent).attr('playernum',this.playerCount);
        $(parent).addClass('hasPlayer');
        $(".playerName", parent).text(`Player ${this.playerCount}`)
      }
    }
  }
}

function Player(number, elem){
  this.name = 'player'+number
  this.num = number;
  this.hand = [];
  this.handCount = this.hand.length;
  this.score= null;
}

function View() {

    this.displayCard = function (card, parent, player) {
        let cardElem = $('.cardData' +player.hand.length+ '', parent)
        cardElem.text(card[0].type + ' ' + card[0].value)
    }
    this.displayPlayerScore = function(elem, score){
      $('.total', elem).text(score)
      this.updateDiscardPile();
    }
    this.updateDiscardPile=function(){
      $('.discard').text(game.drawPile.length)
    }
}

function Controller() {
    this.getHandValue = function(array){
      let sum = 0;
      for(var i=0;i<array.length;i++){
        sum+=array[i][0].value;
      }
      return sum;
    }

    this.randomizer = function () {
        return Math.floor(Math.random() * game.deck.length)
    }

    this.deal = function (array, elem) {
        let parent = $(elem).parent();
        let currentPlayer = game.players[parseInt($(parent).attr('playernum')) - 1];
        if(currentPlayer.hand.length<3){
          let randomNum = this.randomizer();
          let card = game.deck.splice(randomNum, 1);
          currentPlayer.hand.push(card);
          game.drawPile.push(card);
          game.view.displayCard(card, parent, currentPlayer);
          currentPlayer.score = this.getHandValue(currentPlayer.hand)
          game.view.displayPlayerScore(parent, currentPlayer.score)
        }

        // this.shuffle(array)
        // return card;
    };

    this.shuffle = function (array) {
        var len = array.length;
        temp;
        i;
        while (len) {
            i = Math.floor(Math.random() * len--);
            temp = array[len];
            array[len] = array[i];
            array[i] = temp;
        }
        return array
    };

    this.makeDeck = function () {
        for (var type_i = 0; type_i < game.cardType.length; type_i++) {
            var tempCardDeck = [];
            for (var i = 1; i <= 13; i++) {
                let card = {
                    type: game.cardType[type_i].type,
                    symbol: game.cardType[type_i].symbol,
                    value: i
                };
                tempCardDeck.push(card)
            }
            game.deck.push(tempCardDeck);
        }
        game.deck = game.deck[0].concat(game.deck[1], game.deck[2], game.deck[3])
    }
}
