/*JavaScript for the timer functionality of the type tester.*/

function timer(duration, elementId, scoreID, mistakesID){
	var start = Date.now();
	var min, sec, diff;

	function timerCompute(){
		diff = duration - (((Date.now() - start) / 1000) | 0);

		min = ( diff / 60 ) | 0;
		sec = ( diff % 60 ) | 0;

		//If less than 10, add zero in front of it to keep tens place
		min = min < 10 ? "0" + min : min;
		sec = sec < 10 ? "0" + sec : sec;

		elementId.textContent = min + ":" + sec;

		if ( diff <= 0 ){
			elementId.textContent = "0:00";
			scoreID.textContent = score;
			document.getElementById("usertext").readOnly = true;
			
			$("#resultsContainer").fadeIn(900);

			if(mistakes.length > 0){
				var mistakesStr = "";

				for(var i = 0; i < mistakes.length; i++){
					mistakesStr += i > 0 ? ", " : "";
					usertextArr[mistakes[i]] = usertextArr[mistakes[i]] === "" ? "blank" : usertextArr[mistakes[i]];
					mistakesStr += usertextArr[mistakes[i]] + " instead of " + textArr[mistakes[i]];;
				}
				mistakesID.textContent = mistakesStr;
				$("#mistakesContainer").fadeIn(900);
			}
			return;
		}

	};

	timerCompute();
	setInterval(timerCompute, 1000);
}

var timerStarted = false;
$('#usertext').on('keydown', function() {
    var time = 60 * 0.1,
    display = document.querySelector('#time');
    scoreDisplay = document.querySelector('#score');
    mistakesDisplay = document.querySelector('#mistakes');
    if ( timerStarted === false ){
    	timer(time, display, scoreDisplay, mistakesDisplay);
    	typeTest();
    	timerStarted = true;
    }
});