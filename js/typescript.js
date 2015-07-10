var text = "A solar system consists of a Sun and all of the planets that orbit it. Our solar system has eight planets. It used to have nine until it was discovered that Pluto was just a dwarf planet. Mercury is the closest planet to the Sun and it has no atmosphere. Venus is the second planet from the Sun and it is the hottest planet. Earth is the next planet and it is the only one where life is known to exist. The next planet is called Mars and it is famous for being red. There is a region called the asteroid belt after Mars, and there are a lot of asteroids and minor planets here. There are four major objects here and they are called Ceres, Vesta, Pallas and Hygiea. After the asteroid belt, we have Jupiter. Jupiter is the largest planet in our solar system and it has a large storm that looks like an eye. Saturn is a very interesting planet because it has rings around it. It also has lots of moons around it. The next planet is called Uranus and it is classified as an ice giant. It has an atmosphere that is mostly hydrogen and helium. It is also the coldest planet in our solar system. The final planet in our solar system is Neptune. It is the densest planet and it has a very blue hue. It is named after the Neptune who was the Roman god of the sea. This planet is not visible to the naked eye and you need to use a telescope to see it."
var storyTextarea = document.getElementById("storytext");
storyTextarea.value = text;

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
$('textarea').bind("cut paste", function (e) {
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

//Jump to next word to be typed
function textJump(jumpIndex){
    var textStr = text.substring(0, jumpIndex);
    storyTextarea.value = textStr;
    storyTextarea.scrollTop = storyTextarea.scrollHeight;
    storyTextarea.value = text;
}

//Jump to specified line of TextArea
//OLD METHOD DO NOT USE
function textareaJump(line){
  storyTextarea = document.getElementById("storytext");
  var lht = (storyTextarea.clientHeight / storyTextarea.rows)*0.875;
  var jump = (line - 1) * lht;
  storyTextarea.scrollTop = jump;
}

//Refresh the highlighted area
function updateHighlight(){
    $('#storytext').highlightTextarea('destroy');
    $('#storytext').highlightTextarea({ ranges: highlightArgs });
}

function typeTest(){
    
  function updateUsertext(){
    usertext = $('textarea#usertext').val();
    var usertextLatestArr = usertext.split(" ");
    usertextArr.push(usertextLatestArr[usertextLatestArr.length-1]);
    count = usertextArr.length - 1;
    var wordLen = textArr[count].length;
    var charBufferIndex = textArr[count].length < 3 ? 5 : 2;

    //Word spelling matches
    if(textArr[count] === usertextArr[count]){
      if (mistakes[mistakes.length-1] === count){ mistakes.pop() }
      score++;
      highlightArgs.push({ color: '#c1f5b0', start: highlightIndex, length: wordLen })
      highlightIndex += (wordLen + 1);
    }

    //Missed one word
    //any more than a single consecutive missed word counts as an error
    else if(textArr[count+1] === usertextArr[count]){
      usertextArr.splice(count, 0, "blank");
      if (mistakes[mistakes.length-1] === count){ mistakes.pop() }
      score++;
      mistakes.push(count);
      highlightArgs.push({ color: '#febbb9', start: highlightIndex, length: wordLen })
      highlightIndex += (wordLen + 1);
      highlightArgs.push({ color: '#c1f5b0', start: highlightIndex, length: textArr[count+1].length })
      highlightIndex += (textArr[count+1].length + 1);
    }

    //Spelling mistake
    else{
      highlightArgs.push({ color: '#febbb9', start: highlightIndex, length: wordLen })
      highlightIndex += (wordLen + 1);
      mistakes.push(count);
    }

    //Rebuild the highlight object
    updateHighlight();

    //Jump to the next word
    var jumpIndex = highlightIndex + (wordLen + 1) + charBufferIndex;
    textJump(jumpIndex);
  };

  //User presses backspace
  $('#usertext').on('keydown', function(e) {
    var lastChar = $('textarea#usertext').val().slice(-1);
    var secondLastChar = $('textarea#usertext').val().slice(-2).substring(0, 1);;
    if(e.keyCode == 8 && lastChar === " " && secondLastChar !== " "){
      usertextArr.pop();
      mistakes.pop();
      highlightArgs.pop();
      updateHighlight();
      highlightIndex -=  ( textArr[count].length + 1 );
      count--;
    }
  });

  $('#usertext').on('keydown', function(e) {
    var lastChar = $('textarea#usertext').val().slice(-1);
    var spaceTest = lastChar === " " ? true : false;
    if(e.keyCode == 32 && spaceTest == false){
      updateUsertext();
    }
  }); 
}