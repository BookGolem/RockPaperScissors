function randomBot(){
    this.getChoice = function(){
        //return 1 (Rock), 2 (Paper), or 3 (Scissors) randomly.
        return Math.floor(Math.random() * 3) + 1;
    };

    this.name = "RandomBot";
    this.points = 0;
    
    this.ownMoves = [];
    this.oppMoves = [];
}