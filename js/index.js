$("document").ready(function() {
  //setting main vars
  var mode = 0;
  var turn = 0;
  var signs = ["O", "X"];
  var table = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  var moves = 0;
  var win = false;

  //Menu

  $("#menu").modal();
  $(".singleModeBtn").css("color", "#008000");
  $(".multiModeBtn").css("color", "#7F0000");
  $("[class$='ModeBtn']").on("click", function() {
    if (
      ($(this).attr("class") == "singleModeBtn" && mode == 1) ||
      ($(this).attr("class") == "multiModeBtn" && mode == 0)
    ) {
      $("[class$='ModeBtn']").css("color", "#7F0000");
      $(this).css("color", "#008000");
      mode = (mode + 1) % 2;
    }
  });

  $(".OSignBtn").css("color", "#008000");
  $(".XSignBtn").css("color", "#7F0000");
  $("[class$='SignBtn']").on("click", function() {
    if (
      $(this)
        .attr("class")
        .slice(0, 1) == signs[1]
    ) {
      $("[class$='SignBtn']").css("color", "#7F0000");
      $(this).css("color", "#008000");
      temp = signs[0];
      signs[0] = signs[1];
      signs[1] = temp;
    }
  });

  //main game

  $("[id^='cell']").on("click", function() {
    if ((mode == 0 && turn == 0) || mode == 1) {
      var pos = $(this)
        .attr("id")
        .slice(-2);
      var x = pos[0];
      var y = pos[1];
      if (table[x][y] == 0) {
        table[x][y] = turn + 1;
        var target = "#cell" + x + y;
        $(target).html(signs[turn]);
        $(target).css("color", "#36454f");
        moves++;
        checkWin(x, y);
        checkTie();
        turn = (turn + 1) % 2;
        $("#turn").html(turn + 1);
        if (mode == 0 && win === false) PCTurn();
      }
    }
  });

  //AI for singleplayer mode
  function PCTurn() {
    //check if there's a winning option
    for (var i = 0; i <= 2; i++) {
      if (table[i][0] == table[i][1] && table[i][0] != 0 && table[i][2] == 0) {
        PCPlays(i, 2);
        return;
      }
      if (table[i][0] == table[i][2] && table[i][0] != 0 && table[i][1] == 0) {
        PCPlays(i, 1);
        return;
      }
      if (table[i][1] == table[i][2] && table[i][1] != 0 && table[i][0] == 0) {
        PCPlays(i, 0);
        return;
      }
    }
    for (var i = 0; i <= 2; i++) {
      if (table[0][i] == table[1][i] && table[0][i] != 0 && table[2][i] == 0) {
        PCPlays(2, i);
        return;
      }
      if (table[0][i] == table[2][i] && table[0][i] != 0 && table[1][i] == 0) {
        PCPlays(1, i);
        return;
      }
      if (table[1][i] == table[2][i] && table[1][i] != 0 && table[0][i] == 0) {
        PCPlays(0, i);
        return;
      }
    }
    for (var i = 0; i <= 2; i++) {
      if (
        table[i][i] == 0 &&
        table[(i + 1) % 3][(i + 1) % 3] != 0 &&
        table[(i + 1) % 3][(i + 1) % 3] == table[(i + 2) % 3][(i + 2) % 3]
      ) {
        PCPlays(i, i);
        return;
      }
    }
    if (table[0][2] == 0 && table[1][1] != 0 && table[1][1] == table[2][0]) {
      PCPlays(0, 2);
      return;
    }
    if (table[1][1] == 0 && table[0][2] != 0 && table[0][2] == table[2][0]) {
      PCPlays(1, 1);
      return;
    }
    if (table[2][0] == 0 && table[1][1] != 0 && table[1][1] == table[0][2]) {
      PCPlays(2, 0);
      return;
    }
    //if there´s no clear option make a random choice
    GenRandPlay();

    //aux functions
    function PCPlays(x, y) {
      table[x][y] = turn + 1;
      var target = "#cell" + x + y;
      $(target).html(signs[turn]);
      $(target).css("color", "#36454f");
      moves++;
      checkWin(x, y);
      checkTie();
      turn = (turn + 1) % 2;
      $("#turn").html(turn + 1);
    }

    function GenRandPlay() {
      var posiblePlay = [
        Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 3)
      ];
      if (table[posiblePlay[0]][posiblePlay[1]] == 0) {
        PCPlays(posiblePlay[0], posiblePlay[1]);
      } else {
        GenRandPlay();
      }
    }
  }

  //cheking if the game is over
  function checkWin(x, y) {
    if (table[x][0] == table[x][1] && table[x][0] == table[x][2]) {
      var target = "[id^=cell" + x + "]";
      $(target).css("color", "red");
      if (mode === 0 && turn == 1) {
        $("#lose-sign").modal();
      } else {
        $("#winner").html(turn + 1);
        $("#win-sign").modal();
      }
      win = true;
    }
    if (table[0][y] == table[1][y] && table[0][y] == table[2][y]) {
      var target = "[id$=" + y + "]";
      $(target).css("color", "red");
      if (mode === 0 && turn == 1) {
        $("#lose-sign").modal();
      } else {
        $("#winner").html(turn + 1);
        $("#win-sign").modal();
      }
      win = true;
    }
    if (
      table[0][0] == table[1][1] &&
      table[0][0] == table[2][2] &&
      table[0][0] != 0
    ) {
      $("#cell00 , #cell11 ,#cell22").css("color", "red");
      if (mode === 0 && turn == 1) {
        $("#lose-sign").modal();
      } else {
        $("#winner").html(turn + 1);
        $("#win-sign").modal();
      }
      win = true;
    }
    if (
      table[0][2] == table[1][1] &&
      table[0][2] == table[2][0] &&
      table[0][2] != 0
    ) {
      $("#cell02 , #cell11 ,#cell20").css("color", "red");
      if (mode === 0 && turn == 1) {
        $("#lose-sign").modal();
      } else {
        $("#winner").html(turn + 1);
        $("#win-sign").modal();
      }
      win = true;
    }
  }

  //Restarting the game after someone wins or there's a tie
  $("[id$='sign']").on("hide.bs.modal", function() {
    table = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    turn = 0;
    moves = 0;
    $("p")
      .css("color", "rgba(0,0,0,0)")
      .html("X");
    $("#turn").html(1);
    win = false;
  });

  //cheking if the game ended in a tie
  function checkTie() {
    if (moves == 9 && win === false) {
      $("#tie-sign").modal();
    }
  }
});