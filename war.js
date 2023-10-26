/*
Needs:
    Cards (52 cards, values 2-14 with 4 of each)
        > Ace = 14, King = 13, Queen = 12, Jack = 11
        > Possibly write a class and object chain to create a card for each card in the deck (includes suits and card values for easier for printing and tracking)
    Game:
        Instantaneous finish for whole deck
        Deck assigned at start randomly with 26 cards for each player
            Check that no card is duplicated (ignore if number has already been chosen)
        On a turn:
            "Play a card from each deck":
                check the top card (card[0]) from both decks
                compare the values of each card
                add a point to the winner (if tied add nothing to either)
                add the comparison between the two decks to a print function
                remove card from each deck
                
        At the end of game:
            Return the game turn by turn string with total score and winner



        
    
*/



class Deck {
    constructor(player) {
        this.player = player;
        this.cards = [];
    }

    describe() {
        return `This is ${this.player}'s deck`;
    }
}

class Card {
    constructor(value, suit, name) {
        this.name = name;
        this.value = value;
        this.suit = suit;
    }



    describe() {
        return `This ${this.name} of ${this.suit} has a value of ${this.value}`;
    }
}

class Game {
    getRandInt(number) {
        return Math.floor(Math.random() * number);
    }

    constructor(){
        this.decks = [];
        this.currentDeck = null;
        this.currentCard = null;
    }

    createStartDeck() {
        let name = null;
        let suit = null;
        this.decks.push(new Deck('starterDeck'));
        this.currentDeck = this.decks[0];

        while (this.currentDeck.cards.length < 52) {
            for (let value = 2; value <= 14; value++) { //Loop through all card values
                switch(value) { //Switch case for name of card based on value of card
                    case 11:
                        name = 'Jack';
                        break;
                    case 12:
                        name = 'Queen';
                        break;
                    case 13:
                        name = 'King';
                        break;
                    case 14:
                        name = 'Ace';
                        break; 
                    default:
                        name = value;
                }
                    for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
                        switch(suitIndex) {
                            case 0:
                                suit = 'Spades';
                                this.currentDeck.cards.push(new Card(value, suit, name));
                                break;
                            case 1:
                                suit = 'Clubs';
                                this.currentDeck.cards.push(new Card(value, suit, name));
                                break;
                            case 2:
                                suit = 'Hearts';
                                this.currentDeck.cards.push(new Card(value, suit, name));
                                break;
                            case 3:
                                suit = 'Diamonds';
                                this.currentDeck.cards.push(new Card(value, suit, name));
                                break;
                            
                        }
                    }
            }
        }
    }

    createPlayerDeck() {
        let player = prompt(`Please Enter Player ${this.decks.length}'s Name`);
            if (typeof player != 'string') {
                throw new Error('Please Enter a name for this player');
            }
        this.decks.push(new Deck(player));
        this.currentDeck = this.decks[this.decks.length - 1];
            console.log(this.currentDeck.player);


        while (this.currentDeck.cards.length < 26) {
            let index = this.getRandInt(this.decks[0].cards.length);
            console.log(index);
            let currentCard = this.decks[0].cards[index];
            this.decks[0].cards.splice(index, 1);
            this.decks[this.decks.length - 1].cards.push(currentCard);

        }
    }

    compare() {
        let enter = prompt('Please type 0 to continue and 1 to leave.');
        let playerOnePoints = 0;
        let playerTwoPoints = 0;
        switch(enter) {
            case('0'):
            let gameString = 'Game Stats:' + '\n'
                for (let turn = 0; turn < 26; turn++) {
                    let turnCards = [];
                        for (let i = 1; i <= 2; i++) {
                            turnCards.push(this.decks[i].cards[0].value);
                        }
                        if (turnCards[0] > turnCards[1]) {
                            playerOnePoints += 1;
                        }   else if (turnCards[1] > turnCards[0]) {
                            playerTwoPoints += 1;
                        }
                    gameString += `Turn ${turn + 1}) ${this.decks[1].cards[0].name} of ${this.decks[1].cards[0].suit} vs. ${this.decks[2].cards[0].name} of ${this.decks[2].cards[0].suit}\n`;
                    this.decks[1].cards.splice(0, 1);
                    this.decks[2].cards.splice(0, 1);
                }
                if (playerOnePoints > playerTwoPoints) {
                    gameString += this.decks[1].player + ' Wins! Final Score: ' + playerOnePoints + ' to ' + playerTwoPoints;
                }   else if (playerTwoPoints > playerOnePoints) {
                    gameString += this.decks[2].player + ' Wins! Final Score: ' + playerOnePoints + ' to ' + playerTwoPoints;
                }   else { 
                    gameString += 'The game is a tie! Final Score: ' + playerOnePoints + ' to ' + playerTwoPoints;
                }
                return gameString;
                break;
            default:
                break;

        }
    }

    play() {
        this.createStartDeck();
        console.log(this.deckInfo(this.currentDeck));
        this.createPlayerDeck();
        console.log(this.deckInfo(this.currentDeck));
        console.log(this.deckInfo(this.decks[0]));
        this.createPlayerDeck();
        console.log(this.deckInfo(this.currentDeck));


    }

    deckInfo(currentDeck) {
        this.currentDeck = currentDeck;
        let deckInfo = 'Deck for: ' + this.currentDeck.player + '\n';
            for (let i = 0; i < this.currentDeck.cards.length; i++) {
                let currentCard = this.currentDeck.cards[i];
                deckInfo += (i + 1) + ') ' + currentCard.name + ' of ' + currentCard.suit + '\n';
            }
        return deckInfo;
    }


}
    
let game = new Game;
game.play();
alert(game.compare());
