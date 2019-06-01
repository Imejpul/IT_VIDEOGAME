"use strict";
var rooms;
var player;
startGame();

function startGame() {
//reset the global rooms and player objects
    rooms = getRooms();
    player = getPlayer();

//This explains the game to a new player
    var text = "Welcome to the NoName City!";
    text += " You are " + player.name;
    text += " and you are in a city";
    text += " where many things are broken.";
    text += " Go from street to street";
    text += " to find the items you need";
    text += " to fix what's broken.";
    text += " Earn points for fixing things.";
    text += " There are " + player.itemsLeftToFix;
    text += " things that need to be fixed.";
    text += " You start in the ";
    text += player.currentRoom.name + ".";
    text += " Good luck!";
    alert(text);

//move the player into their current room
//to display the description and start the game
    moveToRoom();
}

function getPlayer() {
    return {
        name: "Lica",
        score: 0,
        currentRoom: rooms["living room"],
        inventory: [],
        itemsLeftToFix: 10
    };
}

function moveToRoom() {
    textRoomDescription();
    isThereAnItem();
    fixBrokenThing();
    showScore();
    showInventory();

    if (checkGameOver())  //watch the parentheses
    {
        alertGameWon();
        checkPlayAgain();
    } else        //ask for a direction
    {
        var direction = getDirection();
        if (direction) {
            player.currentRoom = rooms[direction];
            moveToRoom();
        }
    }
}

function textRoomDescription() {
    var text = "";
    text += "You are in the ";
    text += player.currentRoom.name + ". ";
    text += player.currentRoom.description;
    alert(text);
}

function isThereAnItem() {
    var item = player.currentRoom.itemFound;
    if (item) {
        alert("You found the " + item + "!");
        player.inventory.push(item);
        player.currentRoom.itemFound = null;
    }
}

function fixBrokenThing() {
//helper variables to make the code easier to read
    var brokenThing = player.currentRoom.brokenThing;
    var fixWith = player.currentRoom.fixWith;

//test: Is there a broken thing?
    if (brokenThing) {
//get ready to announce there's a broken thing
        var text = "There is a broken ";
        text += brokenThing + " in this room. ";

//helper variable
        var index = player.inventory.indexOf(fixWith);

//test: if fixWith is NOT in inventory
        if (index === -1) {
            text += "You need the " + fixWith;
            text += " to fix it.";
        } else //the item IS in the inventory
        {
            text += "You fixed the " + brokenThing;
            text += " with the " + fixWith + "!";
            text += " You earn ";
            text += player.currentRoom.points;
            text += " points.";

            player.currentRoom.brokenThing = null;
            player.score += player.currentRoom.points;
            player.itemsLeftToFix--;
            player.inventory.splice(index, 1);
        }
        alert(text);
    }
}

function showScore() {
    player.score = Math.max(0, player.score);
    alert("Score: " + player.score);
}

function showInventory() {
    var text = "Inventory: ";

    var length = player.inventory.length;

    for (var i = 0; i < length; i++) {
        text += "[";
        text += player.inventory[i];
        text += "] ";
    }

    alert(text);
}

function checkGameOver() {
    return player.itemsLeftToFix === 0;
}

function alertGameWon() {
    var text = "Congratulations, " + player.name + "! ";
    text += "You fixed everything in the house! ";
    text += "You should be proud of yourself! ";
    text += "You finished the game with a score of ";
    text += player.score + " points! ";
    text += "Play again soon!";
    alert(text);
}

function checkPlayAgain() {
    var text = "Would you like to play again? ";
    text += "Click OK to replay. ";
    text += "Click CANCEL to end. ";

    var again = confirm(text);
    if (again) {
        startGame();
    }
}

function getDirection() {
    var text = "Which way do you want to go? ";
    var direction;

    while (!direction) {
        text += "There are exits: ";
        var north = player.currentRoom["north"];
        if (rooms[north]) {
            text += " north ";
        }
        var south = player.currentRoom["south"];
        if (rooms[south]) {
            text += " south ";
        }
        var east = player.currentRoom["east"];
        if (rooms[east]) {
            text += " east ";
        }
        var west = player.currentRoom["west"];
        if (rooms[west]) {
            text += " west ";
        }
        var northeast = player.currentRoom["northeast"];
        if (rooms[northeast]) {
            text += " northeast ";
        }
        var southeast = player.currentRoom["southeast"];
        if (rooms[southeast]) {
            text += " southeast ";
        }
        var northwest = player.currentRoom["northwest"];
        if (rooms[northwest]) {
            text += " northwest ";
        }
        var southwest = player.currentRoom["southwest"];
        if (rooms[southwest]) {
            text += " southwest ";
        }

        direction = prompt(text);
        direction = direction.toLowerCase();
        if (direction === "name") {
            continue;
        }

        var exitTo = player.currentRoom[direction];

        if (rooms[exitTo]) {
//we CAN go this way, send back the exitTo
            return exitTo;
        } else if (direction === "quit") {
            break;
        }
        text = "You can't go " + direction + ". ";
        text += "Please try again. ";
        text += "Use compass points like north.";
        direction = null;
    }
}

function getRooms() {
    var livingRoom =
        {
            name: "living room",
            brokenThing: "fireplace screen",
            description: "A cozy room with a fireplace.",
            fixWith: "new wire",
            points: 25,
            itemFound: "batteries",
            north: "dining room",
            south: null,
            east: "hallway",
            west: null
        };

    var diningRoom =
        {
            name: "dining room",
            description: "A great place to enjoy a meal.",
            brokenThing: "chandelier",
            fixWith: "light bulb",
            points: 15,
            itemFound: "new wire",
            north: null,
            south: "living room",
            east: "kitchen",
            west: null
        };

    var kitchen =
        {
            name: "kitchen",
            description: "It needs a little attention, but the kitchen has everything you need to have a snack or host a huge party.",
            brokenThing: "faucet",
            fixWith: "wrench",
            points: 35,
            itemFound: "package with color ink",
            north: null,
            south: "hallway",
            east: "pantry",
            west: "dining room"
        };

    var hallway =
        {
            name: "hallway",
            description: "The hallway helps make the house feel grand, though the old carpet curls up and it's easy to trip over.",
            brokenThing: "rug",
            fixWith: "special carpet tape",
            points: 45,
            itemFound: "light bulb",
            north: "kitchen",
            south: "basement",
            east: "office",
            west: "living room",
            northeast: "bathroom",
            southeast: "den"
        };

    var bathroom =
        {
            name: "bathroom",
            description: "You take pride in your pristine bathroom. It's a relaxing place to take care of necessities.",
            brokenThing: "mirror",
            fixWith: "new mirror",
            points: 20,
            itemFound: "screwdriver",
            north: null,
            south: null,
            east: null,
            west: null,
            southwest: "hallway"
        };

    var office =
        {
            name: "office",
            description: "This place is a mess. It's a wonder you ever get any work done in here.",
            brokenThing: "color printer",
            fixWith: "package with color ink",
            points: 40,
            itemFound: "garbage bag",
            north: null,
            south: null,
            east: null,
            west: "hallway"
        };

    var basement =
        {
            name: "basement",
            description: "You hide your eyes behind your hands so you don't have to see everything that's out of place down here.",
            brokenThing: "door hinge",
            fixWith: "screwdriver",
            points: 30,
            itemFound: "catnip",
            north: "hallway",
            south: null,
            east: null,
            west: null
        };

    var den =
        {
            name: "den",
            description: "The den is a comfortable spot to watch TV and catch up on the latest movies.",
            brokenThing: "TV remote",
            fixWith: "batteries",
            points: 10,
            itemFound: "wrench",
            northwest: "hallway",
            north: null,
            south: "cat den",
            east: null,
            west: null
        };

    var catDen =
        {
            name: "cat den",
            description: "An offshoot of another room, the cat den is a place the cats come to play, nap, and meow merrily.",
            brokenThing: "cat toy",
            fixWith: "catnip",
            points: 100,
            itemFound: "new mirror",
            north: "den",
            south: null,
            east: null,
            west: null
        };

    var pantry =
        {
            name: "pantry",
            description: "You have all shelves organized so you can find the food supplies you need.",
            brokenThing: "box of spaghetti",
            fixWith: "garbage bag",
            points: 15,
            itemFound: "special carpet tape",
            north: null,
            south: null,
            east: null,
            west: "kitchen"
        };

    var rooms = {};
    rooms[livingRoom.name] = livingRoom;
    rooms[diningRoom.name] = diningRoom;
    rooms[kitchen.name] = kitchen;
    rooms[hallway.name] = hallway;
    rooms[bathroom.name] = bathroom;
    rooms[office.name] = office;
    rooms[basement.name] = basement;
    rooms[den.name] = den;
    rooms[catDen.name] = catDen;
    rooms[pantry.name] = pantry;

    return rooms;
}


