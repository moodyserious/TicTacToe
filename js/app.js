

$(".homenav").click(function(){
    $(".homeimage").slideDown("slow");
    $(".multi_page").addClass("hide");
    $(".multi_page").removeClass("show");
    $(".multimodal").addClass("show");
    $(".multimodal").removeClass("hide");
});

$(".multinav").click(function() {
    //$(".multimodal").show();
    //$(".multi_page").show();
    $(".multi_page").addClass("show");
    $(".multi_page").removeClass("hide");
    $(".multimodal").addClass("show");
    $(".multimodal").removeClass("hide");
});



/*---------------------------------VARIABLES -------------------------------------------*/

var player1name ="";
var player2name = "";
var turn ="X";
var player1scorenumber=0;
var player2scorenumber =0;
var turncount=0;
var again =0;
var multimode = false;
var boardscores = [0, 0, 0, 0, 0, 0, 0, 0, 0];




$(".submit").click(function(){
    $(".homeimage").hide();
    clear();
    getplayers(true);
    showgame(true);
    setplayerturns(true);

});

$(".s_submit").click(function(){
    $(".homeimage").hide();
    clear();
    showgame(false);
    setplayerturns(false);

});

function getplayers(multimode)
{
    if(multimode == true) {
        player1name = $(".player1input").val();
        player2name = $(".player2input").val();
        ("player1 name is set to " + player1name);
        ("player2 name is set to " + player2name);
        $(".player1input").val(" ");
        /*input fields */
        $(".player2input").val(" ");
    }


}

function showgame(multimode){
    $(".tictactoeboard").show(1000);
    $(".playagain").show(1000);
    $(".scoreboard").show(1000);

    if(multimode == true)
    {
        $(".multi_page").show(1000);
        $(".player1name_scoreboard").text(player1name);
        $(".player2name_scoreboard").text(player2name);
    }

    else
    {
        $(".player1name_scoreboard").text("You");
        $(".player2name_scoreboard").text("Computer");
    }

}

function randomgene(){
    return Math.floor((Math.random() * 8) + 0);
}
function computercheck(){

    if($(".box0").text() == "X" && $(".box2").text() == "X" && $(".box1").text() == ""  || $(".box4").text() == "X" && $(".box7").text() =="X" && $(".box1").text() == "" )
    {
            $(".box1").text("O");
            boardscores[1]=2;
    }
    else
    {
        boxnumber = randomgene();
        if ($(".box" + boxnumber).text() == "") {
            $(".box" + boxnumber).text("O");
            boardscores[boxnumber] = 2;
        }

        else {
            computercheck();
        }
    }



}

function init(player1name, player2name) {

    $(".player1name").text(player1name + " turns").prepend('-> ');
    $(".player2name").text(player2name);
    turn = "X";
}

function setplayerturns(multimode) {

    var gamestate;
    if(multimode == false) {
        var boxnumber;
        var boxposition;

        $("td").click(function () {
            if ($(this).text() == "") {
                boxposition = $(this).attr("class");
                boxposition = boxposition[3];
                $(this).text("X");
                boardscores[boxposition]=1;


                if (turncount >= 2) {
                    gamestate = checkwin();  // check for winner
                    if(gamestate == 1 || gamestate == 2) {
                        declarewin(turncount, false, gamestate);
                        return;
                    }

                    else if(turncount == 4)
                    {
                        declarewin(turncount, false, gamestate);
                    }
                }

                if (turncount < 4)
                    computercheck();  // computer turn

                if (turncount >= 2) {
                    gamestate = checkwin();  // check for winner
                    if(gamestate == 1 || gamestate == 2) {
                        declarewin(turncount, false, gamestate);
                        return;
                    }
                }
                turncount++;
            }
        });

        again = 1;
    }

    else if (multimode == true) {
        init(player1name, player2name);
        $("td").click(function () {

            if ($(this).text() == "") {

                boxposition = $(this).attr("class");
                boxposition = boxposition[3];

                if (turn == "X") {
                    $(this).text("X");
                    boardscores[boxposition] = 1;
                    turn = "O";
                    $(".player1name").text(player1name + " ");
                    $(".player2name").text(player2name + " turns").prepend('-> ');
                }

                else if (turn == "O") {
                    $(this).text("O");
                    boardscores[boxposition] = 2;
                    turn = "X";
                    $(".player2name").text(player2name + " ");
                    $(".player1name").text(player1name + " turns").prepend('-> ');
                }
                turncount++;
                again = 2;
            }

            if (turncount >= 5) {
                gamestate = checkwin();
                if (gamestate == 1 || gamestate == 2 || gamestate == 0)
                    declarewin(turncount, true, gamestate);
            }

        });

    }

}

function declarewin(turncount, multimode, winner)
{
    var id=0;

   if(multimode == false && winner == 1)
   {

       $(".gamestatus").text("You WON!!");
       $(".single_looserimg" ).hide();
       $(".multi_winnerimg").show();
       $("#winnermodal").modal("show");
       $("td").off("click");
       player1scorenumber++;
       id =1;
       turncount=0;
   }

   else if(multimode == false && winner == 2){
       $(".gamestatus").text("Computer WON!!");
       $(".multi_winnerimg").hide();
       $(".single_looserimg" ).show();
       $("#winnermodal").modal("show");
       $("td").off("click");
       player2scorenumber++;
       id =2;
       turncount=0;
   }

   else if(multimode == true && winner == 1)
   {
       $(".gamestatus").text(player1name + " WON!!");
       $(".single_looserimg" ).hide();
       $(".multi_winnerimg").show();
       $("#winnermodal").modal("show");
       $(".player1name").text(player1name + "");
       $(".player2name").text(player2name + "");
       $("td").off("click");

       player1scorenumber++;
       id = 1;
       turncount = 0;
   }

   else if(multimode == true && winner == 2)
   {
       $(".gamestatus").text(player2name + " WON!!");
       $(".single_looserimg" ).hide();
       $(".multi_winnerimg").show();
       $("#winnermodal").modal("show");
       $(".player1name").text(player1name + "");
       $(".player2name").text(player2name + "");

       $("td").off("click");
       player2scorenumber++;
       id = 2;
       turncount = 0;
   }

   else if(turncount == 9 && multimode == true  && winner == 0 || turncount == 4 && multimode == false && winner == 0)
   {
       $(".gamestatus").text("Tie!!");
       $("#winnermodal").modal("show");
       $(".player1name").text("");
       $(".player2name").text("");
       $("td").off("click");
       $(".greenbtn").hide();
       turncount = 0;
   }

    updatescoreboard(player1scorenumber, player2scorenumber, id);
}

function checkwin() {
    for (var state = 1; state < 3; state++)  // to check for both X and O
    {
        for (var i = 0, j = 0; i < 9; i += 3, j++) // row checking
        {
            if (boardscores[i] == state && boardscores[i + 1] == state && boardscores[i + 2] == state) {
                $(".box" + i).css("background-color", "green");
                $(".box" + (i + 1)).css("background-color", "green");
                $(".box" + (i + 2)).css("background-color", "green");
                return state;
            }

            else if (boardscores[j] == state && boardscores[j + 3] == state && boardscores[j + 6] == state) // column checking
            {
                $(".box" + j).css("background-color", "green");
                $(".box" + (j + 3)).css("background-color", "green");
                $(".box" + (j + 6)).css("background-color", "green");
                return state;
            }

            else if (boardscores[0] == state && boardscores[4] == state && boardscores[8] == state) {
                $(".box0, .box4, .box8").css("background-color", "green");
                return state;
            }


            else if (boardscores[2] == state && boardscores[4] == state && boardscores[6] == state) {
                $(".box2, .box4, .box6").css("background-color", "green");
                return state;
            }

        }


    }
    return state = 0;
}

function updatescoreboard(player1scorenumber, player2scorenumber, id) {
    if (player1scorenumber > 0 && id == 1) {
        $(".player1score").text(player1scorenumber);
        $(".player2score").text(player2scorenumber);
    }
    else if (player2scorenumber > 0 && id == 2) {
        $(".player2score").text(player2scorenumber);
        $(".player1score").text(player1scorenumber);
    }
    else {
        $(".player1score").text(player1scorenumber);
        $(".player2score").text(player2scorenumber);
    }

}
    $(".playagain").click(function () {   // play again button
        for (var i = 0; i < 9; i++) {
            $(".box" + i).text("");
            $(".box" + i).css("background-color", "#4B0082"); // reset the background color
            boardscores[i] = 0;
        }

        $(".gameboardscores").text("");

        turncount = 0;
        if (again == 1) {
            setplayerturns(false);
        }

        else if (again == 2) {
            setplayerturns(true);
        }
    });


    function clear() {
        for (var i = 0; i < 9; i++) {
            $(".box" + i).text("").css("background-color", "#4B0082"); // reset the background color
            boardscores[0] = 0;
        }
        $(".gameboardscores").text("");   // clear game boardscores

        $(".player1name").text("");  // clear player1 name
        $(".player2name").text("");  // clear player2 name
        $(".player1name_scoreboard").text("");  // clear player1name in scorebooard
        $(".player2name_scoreboard").text("");  // clear player2name in scorebooard
        player1scorenumber = 0;
        player2scorenumber = 0;
        $(".player1score").text(player1scorenumber);       // clear player1 score
        $(".player2score").text(player2scorenumber);       // clear player2score
        turncount = 0;
        player1name = "";
        player2name = "";
        turn = "X";
        player1scorenumber = 0;
        player2scorenumber = 0;
        turncount = 0;
        $("td").off("click");
    }




