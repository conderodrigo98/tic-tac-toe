$("document").ready(function(){
  
  //setting main vars
  var mode="multi";
  var turn=0;
  var signs=["O","X"];
  var table=[[0,0,0],[0,0,0],[0,0,0]];
  var moves=0;
  var win=false;
  
    
  
  $("[id^='cell']").on("click",function(){
    var pos=$(this).attr("id").slice(-2);
    var x=pos[0];
    var y=pos[1];
    if(table[x][y]==0){
      table[x][y]=turn+1;
      var target="#cell"+x+y;
      $(target).html(signs[turn]);
      $(target).css("color","#36454f");
      moves++;
      checkWin(x,y);
      console.log("moves"+moves);
      checkTie();
      turn=(turn+1)%2;
      $("#turn").html(turn+1);
    }
  });
  
  //cheking if the game is over
  function checkWin(x,y){
    console.log(table);
    if (table[x][0]==table[x][1] && table[x][0]==table[x][2]){
      var target="[id^=cell"+x+"]";
      $(target).css("color","red");
      $("#winner").html(turn+1);
      $("#win-sign").modal()
    }
    console.log(table[0][y]+table[2][y])
    if (table[0][y]==table[1][y] && table[0][y]==table[2][y]){
      var target="[id$="+y+"]";
      $(target).css("color","red");
      $("#winner").html(turn+1);
      $("#win-sign").modal()
      win=true;
    }
    if(table[0][0]==table[1][1] && table[0][0]==table[2][2] && table[0][0]!=0){
      $("#cell00 , #cell11 ,#cell22").css("color","red");
      $("#winner").html(turn+1);
      $("#win-sign").modal()
      win=true;
    }
    if(table[0][2]==table[1][1] && table[0][2]==table[2][0]  && table[0][2]!=0){
      $("#cell02 , #cell11 ,#cell20").css("color","red");
      $("#winner").html(turn+1);
      $("#win-sign").modal()
      win=true;
    }
  }
  
  //Restarting the game after someone wins or there's a tie
  $("#win-sign").on("hide.bs.modal",function(){
    table=[[0,0,0],[0,0,0],[0,0,0]];
    turn=0;
    moves=0;
    $("p").css("color","rgba(0,0,0,0)").html("X");
    $("#turn").html(1);
    win=false;
  });
  $("#tie-sign").on("hide.bs.modal",function(){
    table=[[0,0,0],[0,0,0],[0,0,0]];
    turn=0;
    moves=0;
    $("p").css("color","rgba(0,0,0,0)").html("X");
    $("#turn").html(1);
  });
  
  //cheking if the game ended in a tie
  function checkTie(){
    if (moves==9 && win===false){
      $("#tie-sign").modal()
    }
  }
  
});