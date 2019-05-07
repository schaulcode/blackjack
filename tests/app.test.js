const app = require("../app.js");

describe("check if array have valid entries", ()=>{
    test("card array", () =>{
        const expected = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        expect(app.cards).toEqual(expect.arrayContaining(expected));
    })
    test("suite array", ()=>{
        const expected = ["♦", "♠", "♣", "♥"];
        expect(app.suite).toEqual(expect.arrayContaining(expected));
    })
});

describe("Player class", ()=>{
    const Player = new app.Player("hi");
    test("name property", ()=>{
        expect(Player).toHaveProperty('name');
    });
    test("hand property", ()=>{
        expect(Player).toHaveProperty('hand');
    });
    test("handValue property", ()=>{
        expect(Player).toHaveProperty('handValue')
    })
});

describe("Deal cards", ()=>{
    var expectedDealt = [];
    for(i = 0; i <10; i++){
        test("should return a random and unique card, test number: " + i, ()=>{
            const expectedCards = app.cards;
            const expectedSuite = app.suite;
            const value = app.deal();
            expect(expectedCards).toContainEqual(value[0]);
            expect(expectedSuite).toContainEqual(value[1]);
            expect(expectedDealt).not.toContainEqual(value);
            expectedDealt.push(value);
            // console.log(expectedDealt);
        });
    }
    

    // test("should return a random and unique card", ()=>{
    //     const expectedCards = app.cards;
    //     const expectedSuite = app.suite;
    //     const value = deal();
    //     expect(value[0]).toEqual(expect.arrayContaining(expectedCards));
    //     expect(value[1]).toEqual(expect.arrayContaining(expectedDealt));
    //     expectedDealt.push(value);
        
    // });

    // test("should return a random and unique card", ()=>{
    //     const expectedCards = app.cards;
    //     const expectedSuite = app.suite;
    //     const value = deal();
    //     expect(value[0]).toEqual(expect.arrayContaining(expectedCards));
    //     expect(value[1]).toEqual(expect.arrayContaining(expectedDealt));
    //     expectedDealt.push(value);
        
    // });

    // test("should return a random and unique card", ()=>{
    //     const expectedCards = app.cards;
    //     const expectedSuite = app.suite;
    //     const value = deal();
    //     expect(value[0]).toEqual(expect.arrayContaining(expectedCards));
    //     expect(value[1]).toEqual(expect.arrayContaining(expectedDealt));
    //     expectedDealt.push(value);
        
    // });

    // test("should return a random and unique card", ()=>{
    //     const expectedCards = app.cards;
    //     const expectedSuite = app.suite;
    //     const value = deal();
    //     expect(value[0]).toEqual(expect.arrayContaining(expectedCards));
    //     expect(value[1]).toEqual(expect.arrayContaining(expectedDealt));
    //     expectedDealt.push(value);
        
    // });

    // test("should return a random and unique card", ()=>{
    //     const expectedCards = app.cards;
    //     const expectedSuite = app.suite;
    //     const value = deal();
    //     expect(value[0]).toEqual(expect.arrayContaining(expectedCards));
    //     expect(value[1]).toEqual(expect.arrayContaining(expectedDealt));
    //     expectedDealt.push(value);
        
    // });

    // test("should return a random and unique card", ()=>{
    //     const expectedCards = app.cards;
    //     const expectedSuite = app.suite;
    //     const value = deal();
    //     expect(value[0]).toEqual(expect.arrayContaining(expectedCards));
    //     expect(value[1]).toEqual(expect.arrayContaining(expectedDealt));
    //     expectedDealt.push(value);
        
    // });

    // test("should return a random and unique card", ()=>{
    //     const expectedCards = app.cards;
    //     const expectedSuite = app.suite;
    //     const value = deal();
    //     expect(value[0]).toEqual(expect.arrayContaining(expectedCards));
    //     expect(value[1]).toEqual(expect.arrayContaining(expectedDealt));
    //     expectedDealt.push(value);
        
    // });

    // test("should return a random and unique card", ()=>{
    //     const expectedCards = app.cards;
    //     const expectedSuite = app.suite;
    //     const value = deal();
    //     expect(value[0]).toEqual(expect.arrayContaining(expectedCards));
    //     expect(value[1]).toEqual(expect.arrayContaining(expectedDealt));
    //     expectedDealt.push(value);
        
    // });

    // test("should return a random and unique card", ()=>{
    //     const expectedCards = app.cards;
    //     const expectedSuite = app.suite;
    //     const value = deal();
    //     expect(value[0]).toEqual(expect.arrayContaining(expectedCards));
    //     expect(value[1]).toEqual(expect.arrayContaining(expectedDealt));
    //     expectedDealt.push(value);
        
    // });
});

describe.each([["J", "J", 21], ["A", "5", 15], ["5", "6", 11], ["A", "Q", 20], ["J", "Q", 20]])("check the total of cards %s and %s", (a,b,expected)=>{
    test("face value", ()=>{
        expect(app.checkCardsValue([a,b])).toBe(expected);
    })
 
});

describe.each([["J", "J", "5", 25], ["A", "K", "5", 16], ["5", "6", "A", 21], ["A", "Q", "K", 21], ["8", "9", "A",18 ]])("check the total of cards %s, %s and %s", (a,b,c,expected)=>{
    test("face value", ()=>{
        expect(app.checkCardsValue([a,b,c])).toBe(expected);
    })
 
});

describe.each([["J", "5", "J", "A", 26], ["A", "K", "5", "5", 21], ["5", "6", "A", "K", 22], ["A", "Q", "K","2", 23], ["8", "9", "A", "A", 19]])("check the total of cards %s, %s, %s and %s", (a,b,c,d,expected)=>{
    test("face value", ()=>{
        expect(app.checkCardsValue([a,b,c,d])).toBe(expected);
    })
 
});

describe("COM Player", ()=>{
    test("if card value under 16 deal another card", ()=>{
        const deal = jest.fn()
        const com = new app.Player("Computer");
        com.hand = [["5","♣"], ["9", "♥"]];
        com.handValue = 14;
        app.comPlayer(com,deal);
        expect(deal).toHaveBeenCalled()

    })

    test("if card value between 16 and 21 deal another card only if Math.Random returns <= 0.5", ()=>{
        const deal = jest.fn()
        const com = new app.Player("Computer");
        com.hand = [["8","♣"], ["9", "♥"]];
        com.handValue = 17;
        app.comPlayer(com,deal,0.5);
        expect(deal).toHaveBeenCalled()

    })
    test("if card value between 16 and 21 don't deal another card only if Math.Random returns > 0.5", ()=>{
        const deal = jest.fn()
        const com = new app.Player("Computer");
        com.hand = [["J","♣"], ["9", "♥"]];
        com.handValue = 19;
        app.comPlayer(com,deal,0.6);
        expect(deal).not.toHaveBeenCalled()

    })

    test("if card value above 21 don't deal another card", ()=>{
        const deal = jest.fn()
        const com = new app.Player("Computer");
        com.hand = [["5","♣"], ["9", "♥"], ["10", "♠"]];
        com.handValue = 24;
        app.comPlayer(com,deal);
        expect(deal).not.toHaveBeenCalled()

    })
});

test("check if player won", ()=>{
    const player = new app.Player("player");
    player.handValue = 20;
    const com = new app.Player("Computer");
    com.handValue = 18;
    expect(app.checkWinner(player,com)).toBe(player.name)
})

test("check if player lost", ()=>{
    const player = new app.Player("player");
    player.handValue = 19;
    const com = new app.Player("Computer");
    com.handValue = 21;
    expect(app.checkWinner(player,com)).toBe(com.name)
})

