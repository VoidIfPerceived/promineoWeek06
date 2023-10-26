var expect = chai.expect;

describe('testFunctions', function() {
    describe('#game.createStartDeck', function() {
        it('should create a deck of 52 cards', function() {
            let game = new Game;
            let createStartDeck = game.createStartDeck();
            let startDeckLength = createStartDeck.length;
            expect(startDeckLength).to.equal(52);
        });
    });
});

//DOES NOT WORK, REFACTOR IN PROGRESS