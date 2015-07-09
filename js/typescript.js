var text = "Invasive species are alien organisms that are very aggressive with native species ";
document.getElementById("storytext").value = text;

var textArr = text.split(" ");
var usertext = "";
var lastWord = ""
var usertextArr = new Array();
var mistakes = new Array();
var highlightArgs = new Array();
var score = 0;
var count = 0;
var highlightIndex = 0;

//Prevent pasting into user text box
$('textarea').bind('paste', function (e) {
  e.preventDefault();
});

//Keep highlighted text responsive
$(window).on('resize', function(){
    $(".highlightTextarea").css('width','100%');
    $(".highlightTextarea-container").css('width','99%');

    if (highlightArgs.length > 0){
        updateHighlight();
    }
});

function updateHighlight(){
    $('#storytext').highlightTextarea('destroy');
    $('#storytext').highlightTextarea({ ranges: highlightArgs });
}

function typeTest(){
  console.log("test");

  function updateUsertext(){
    usertext = $('textarea#usertext').val();
    var usertextLatestArr = usertext.split(" ");
    usertextArr.push(usertextLatestArr[usertextLatestArr.length-1]);
    count = usertextArr.length - 1;
    var wordLen = textArr[count].length;


    if(textArr[count] === usertextArr[count]){
      if (mistakes[mistakes.length-1] === count){ mistakes.pop() }
      score++;

      highlightArgs.push({ color: '#c1f5b0', start: highlightIndex, length: wordLen })
      highlightIndex += (wordLen + 1);
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
      highlightArgs.push({ color: '#febbb9', start: highlightIndex, length: wordLen })
      highlightIndex += (textArr[count].length + 1);
      mistakes.push(count);
    }

    updateHighlight();
  };

  //User presses backspace
  $('#usertext').on('keydown', function(e) {
    var usertextStr = $('textarea#usertext').val();
    var lastChar = usertextStr.slice(-1);
    if(e.keyCode == 8 && lastChar === " "){
      console.log(usertextStr)
      usertextArr.pop();
      mistakes.pop();
      highlightArgs.pop();
      updateHighlight();
      highlightIndex -=  ( textArr[count].length + 1 );
    }
  });

  $('#usertext').on('keydown', function(e) {
    if(e.keyCode == 32){
      updateUsertext();
    }
  }); 
  
}

