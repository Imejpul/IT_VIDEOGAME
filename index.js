"use strict";
var rooms;
var player;
startGame();

function startGame()
{
    //reset the global rooms and player objects
    rooms = getRooms();
    player = getPlayer();

    //This explains the game to a new player
    var text = "Welcome to NoName City!";
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

function getPlayer()
{
    return {
        name: "Iván",
        score: 0,
        currentRoom: rooms["Abandoned_Red_St"],
        inventory: [],
        itemsLeftToFix: 6
    };
}

function moveToRoom()
{
    textRoomDescription();
    isThereAnItem();
    fixBrokenThing();
    showScore();
    showInventory();

    if (checkGameOver())  //watch the parentheses
    {
        alertGameWon();
        checkPlayAgain();
    }
    else        //ask for a direction
    {
        var direction = getDirection();

        if (direction)
        {
            player.currentRoom = rooms[direction];
            moveToRoom();
        }
    }
}

function textRoomDescription()
{
    var text = "";
    text += "You are in the ";
    text += player.currentRoom.name + ". ";
    text += player.currentRoom.description;
    alert(text);
}

function isThereAnItem()
{
    var item = player.currentRoom.itemFound;

    if (item)
    {
        alert("You found the " + item + "!");
        player.inventory.push(item);
        player.currentRoom.itemFound = null;
    }
}

function fixBrokenThing()
{
    //helper variables to make the code easier to read
    var brokenThing = player.currentRoom.brokenThing;
    var fixWith = player.currentRoom.fixWith;

    //test: Is there a broken thing?
    if (brokenThing)
    {
        //get ready to announce there's a broken thing
        var text = "There is a broken ";
        text += brokenThing + " in this street. ";

        //helper variable
        var index = player.inventory.indexOf(fixWith);

        //test: if fixWith is NOT in inventory
        if (index === -1)
        {
            text += "You need the " + fixWith;
            text += " to fix it.";
        }
        else //the item IS in the inventory
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

function showScore()
{
    player.score = Math.max(0, player.score);
    alert("Score: " + player.score);
}

function showInventory()
{
    var text = "Inventory: ";

    var length = player.inventory.length;

    for (var i = 0; i < length; i++)
    {
        text += "[";
        text += player.inventory[i];
        text += "] ";
    }

    alert(text);
}

function checkGameOver()
{
    return player.itemsLeftToFix === 0;
}

function alertGameWon()
{
    var text = "Congratulations, " + player.name +"! ";
    text += "You fixed everything in the city! ";
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
            name: "Abandoned_Red_St",
            brokenThing: "Unused sex toy",
            description: "A long time ago a place with lust..",
            fixWith: "love",
            points: 25,
            itemFound: "rear virginity",
            north: null,
            south: null,
            east: "Philosophy_JunkYard_St",
            west: null
        };

    var diningRoom =
        {
            name: "Philosophy_JunkYard_St",
            description: "Where ideas were junk..",
            brokenThing: "Descartes's Robot",
            fixWith: "consciousness",
            points: 15,
            itemFound: "empathy",
            north: null,
            south: "Lanbide_St",
            east: null,
            west: "Abandoned_Red_St"
        };

    var kitchen =
        {
            name: "Lanbide_St",
            description: "You will find here people in search for its own place in the \"Work\"..",
            brokenThing: "unemployed gravedigger",
            fixWith: "empathy",
            points: 35,
            itemFound: "shovel to bury memories",
            north: "Philosophy JunkYard St.",
            south: null,
            east: "Heaven_St",
            west: "Toysrus_St"
        };

    var hallway =
        {
            name: "Toysrus_St",
            description: "Happiness here has a cost..",
            brokenThing: "raped teddy bear",
            fixWith: "rear virginity",
            points: 45,
            itemFound: "desire to punish",
            north: null,
            south: null,
            east: "Lanbide_St",
            west: null,
            northeast: null,
            southeast: null
        };

    var bathroom =
        {
            name: "Heaven_St",
            description: "Place to come back if You are a prodigal son..",
            brokenThing: "friendly Devil",
            fixWith: "desire to punish",
            points: 20,
            itemFound: "love",
            north: null,
            south: "Hell_St",
            east: null,
            west: "Lanbide_St",
            southwest: null
        };

    var office =
        {
            name: "Hell_St",
            description: "This place is a mess.. but You can do roguery..",
            brokenThing: "Hitler's soul",
            fixWith: "shovel to bury memories",
            points: 40,
            itemFound: "consciousness",
            north: "Heaven_St",
            south: null,
            east: null,
            west: null
        };

    /*var basement =
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
        };*/

    /*var den =
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
        };*/

    /*var catDen =
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
        };*/

    /*var pantry =
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

        };*/

    var rooms = {};
    rooms[livingRoom.name] = livingRoom;
    rooms[diningRoom.name] = diningRoom;
    rooms[kitchen.name] = kitchen;
    rooms[hallway.name] = hallway;
    rooms[bathroom.name] = bathroom;
    rooms[office.name] = office;
    /*rooms[basement.name] = basement;
    rooms[den.name] = den;
    rooms[catDen.name] = catDen;
    rooms[pantry.name] = pantry;*/

    return rooms;
}
