//Prevent pasting into user text box
$('textarea').bind('paste', function (e) {
  e.preventDefault();
});

//Keep highlighted text responsive
$(window).on('resize', function(){
    $(".highlightTextarea").css('width','100%');
    $(".highlightTextarea-container").css('width','99%');
});

var text = "Invasive species are alien organisms that are very aggressive with native species ";
document.getElementById("storytext").value = text;

var textArr = text.split(" ");
var usertext;
var usertextArr = new Array();
var mistakes = new Array();
var score = 0;
var highlightCount = 0;

function typeTest(){
  console.log("test");
  var count = 0;

  function updateUsertext(){
    usertext = $('textarea#usertext').val();
    var usertextLatestArr = usertext.split(" ");
    usertextArr.push(usertextLatestArr[usertextLatestArr.length-1]);
    count = usertextArr.length - 1;
    var wordLen = textArr[count].length;


    if(textArr[count] === usertextArr[count]){
      if (mistakes[mistakes.length-1] === count){ mistakes.pop() }

      $('#storytext').highlightTextarea({ ranges: [{ color: '#c1f5b0', start: highlightCount, length: wordLen}] });

      console.log("Highlight count is " + highlightCount);
      score++;

      highlightCount += (textArr[count].length + 1);
    }

    //missed one word
    //any more than a single consecutive missed word counts as an error
    else if(textArr[count+1] === usertextArr[count]){
      usertextArr.splice(count, 0, "blank");
      if (mistakes[mistakes.length-1] === count){ mistakes.pop() }
      score++;
      mistakes.push(count);
    }

    else{
      $('#storytext').highlightTextarea({ ranges: [{ color: '#febbb9', start: highlightCount, length: wordLen}] });
      highlightCount += (textArr[count].length + 1);
      mistakes.push(count);
    }
  };

  //User presses backspace
  $('#usertext').on('keydown', function(e) {
    if(e.keyCode == 8){
      usertextArr.pop();
      mistakes.pop();
    }
  });

  $('#usertext').on('keydown', function(e) {
    if(e.keyCode == 32){
      updateUsertext();
    }
  }); 
  
}

