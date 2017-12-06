$(document).ready(init)

var game;
function init(){
  game = new Deal52()
  game.controller.makeDeck()
  addClickHandlers();
}

function addClickHandlers(){
  $('.player').on('click', game.addPlayer(this))
}
function addPlayer(){
  game.add
}

function Deal52(){
  this.view = new View();
  this.controller = new Controller();
  this.cardType = ['club','spades','hearts','diamonds']
  this.deck =[];
  this.drawPile=[]
  this.turn = 1;
  this.players =[];
  this.addPlayer = function(elem){
    elem.text(this.player[elem.])
  }



}
function Player(){
  this.hand = [obj];
  this.cardVal= null;
}

function View(){
  this.playerDisplay = $('.player')


}

function Controller(){
  this.randomizer = function(){
    return Math.floor(Math.random()*game.deck.length)
  }
  this.deal = function(array){
    var randomNum = this.randomizer();
    game.deck.splice(randomNum)
  }


  this.makeDeck = function(){
    for(var type_i=0; type_i<game.cardType.length;type_i++){
      var tempCardDeck = []
        for(var i=1;i<=13;i++){
          var card = {
            type: game.cardType[type_i],
            value: i
          }
          tempCardDeck.push(card)
        }
        game.deck.push(tempCardDeck);
    }
    game.deck = game.deck[0].concat(game.deck[1],game.deck[2],game.deck[3])
  }
}
