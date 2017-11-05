//Rock == 1
//Paper == 2
//Scissors == 3

//List of competing bots
var randomBot = new randomBot();
var rockBot = new rockBot();
var paperBot = new paperBot();
var scissorsBot = new scissorsBot();

var bots = [
    randomBot,
    rockBot,
    paperBot,
    scissorsBot
]

var choices = [null, "ROCK", "PAPER", "SCISSORS"];

//Once the page is loaded, run the application.
document.addEventListener("DOMContentLoaded", function(event) { 

    var contestantsData = ""
    for(var i = 0; i < bots.length; i++){
        contestantsData = contestantsData + "<li>" + bots[i].name + "</li>";
    }
    document.getElementById("contestants").innerHTML = contestantsData;

    document.getElementById("run").addEventListener('click',function ()
    {
        runRPSTourney(bots);
    });
});


function runRPSTourney(listOfBots){
    numContestants = listOfBots.length;

    for(var i = 0; i < numContestants; i++){
        for(var j = i+1; j < numContestants; j++){
            runRPSMatch(listOfBots[i], listOfBots[j]);
        }
    }
    
    //Display final results
    listOfBots.sort(function(a, b) {
        return b.points - a.points;
    });

    var finalResults = "<div>" +
                        "<b>Final results:</b>" +
                        "<table><tr><th>Contestant</th><th>Final Score</th></tr>";

    for(var i=0; i < numContestants; i++){
        finalResults = finalResults +
                        "<tr><td>" + listOfBots[i].name + "</td><td>" + listOfBots[i].points + "</td></tr>";
    }

    finalResults = finalResults + "</table>";
    document.getElementById("results").innerHTML += finalResults;
}

//A series of 3 rounds of Rock Paper Scissors between two bots.
//Win: 3 points
//Draw: 1 point
//Loss: 0 points
function runRPSMatch(player1, player2){

    player1.ownMoves = [];
    player1.oppMoves = [];
    player2.ownMoves = [];
    player2.oppMoves = [];

    var breakdown = "<div class='inABlock'><b>" +
                    player1.name + " VS " + player2.name + "</b><br>";

    for(var i = 0; i<3; i++){
        var results = runRPSRound(player1, player2);
        var winner = "";

        if(results.Winner == "Player1"){
            player1.points += 3;
            winner = player1.name + " wins!";
        }else if(results.Winner == "Player2"){
            player2.points += 3;
            winner = player2.name + " wins!";
        }else if(results.Winner = "Draw"){
            player1.points += 1;
            player2.points += 1;
            winner = "Draw!";
        }else{
            comsole.log("ERROR: Winner was " + results.Winner);
        }

        breakdown = breakdown +
                     "<b>Round " + (i+1) + "</b><br>" + 
                     player1.name + " chose " + results.Player1ChoiceDescription + "<br>" +
                     player2.name + " chose " + results.Player2ChoiceDescription + "<br>" +
                     winner + "<br>" +
                     "SCORES: " + player1.name + ": " + player1.points + " || " + player2.name + ": " + player2.points + "<br>";
        
        
    }
    breakdown = breakdown + "</div>";
    document.getElementById("results").innerHTML += breakdown;
}

//A single round of Rock Paper Scissors
function runRPSRound(player1, player2){
    var player1Choice = player1.getChoice();
    var player2Choice = player2.getChoice();

    // 1-3= -2  //player 1
    // 1-1= 0   //draw
    // 1-2= -1  //player 2

    // 2-3= -1  //player 2
    // 2-1= 1   //player 1
    // 2-2= 0    //draw

    // 3-3= 0   //Draw 
    // 3-1= 2   //player 2
    // 3-2= 1   //player 1

    // Draw: 0
    // Player 1: -2, 1, 1
    // Player 2: -1, -1, 2
    
    var stats = {
            Player1Choice: player1Choice,
            Player1ChoiceDescription: choices[player1Choice],
            Player2Choice: player2Choice,
            Player2ChoiceDescription: choices[player2Choice],            
            Winner: null
        }
        
    var result = player1Choice - player2Choice;

    if(result == 0){
        stats.Winner = "Draw";
    }else if(result == -2 || result==1){
        stats.Winner = "Player1";
    }else if(result == -1 || result == 2){
        stats.Winner = "Player2";
    }else{
        stats.Winner = "ERROR";
    }

    return stats;

}