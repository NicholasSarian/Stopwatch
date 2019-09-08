var hr = document.getElementById("hours");
var min = document.getElementById("minutes");
var sec = document.getElementById("seconds");
var ms = document.getElementById("milliseconds");

var start = document.getElementById("start");
var pause = document.getElementById("pause");
var resetButton = document.getElementById("reset");
var lapButton = document.getElementById("lap");

var lapDIV = document.getElementById("lapsRecord");
var lapCount = document.getElementById("lapCount");
var time = document.getElementsByClassName("time");
var i, h;

var milliseconds;

pause.setAttribute("disabled", "true");
resetButton.setAttribute("disabled", "true");
lapButton.setAttribute("disabled", "true");

function startStopWatch() {
	//isPaused = false;
	pause.removeAttribute("disabled");
	resetButton.removeAttribute("disabled");
	lapButton.removeAttribute("disabled");
	start.setAttribute("disabled", "true");
	
	for (i = 0; i < time.length; i++) {
		time[i].classList.remove("animate");
	}
	
	milliseconds = setInterval(function () {
		switch (true) {
			case (parseInt(ms.innerHTML) !== 99):
				incrementTime(ms, "");
				break;
			case (parseInt(sec.innerHTML) !== 59):
				incrementTime(sec, ms);
				break;
			case (parseInt(min.innerHTML) !== 59):
				incrementTime(min, sec, ms);
				break;
			case (parseInt(hr.innerHTML) !== 24):
				incrementTime(hr, min, sec, ms);
				break;
		}
	}, 10);
}

function incrementTime(time1, time2, time3, time4) {
	//console.log("Seconds is " + sec.innerHTML + " milliseconds is " + ms.innerHTML);
	if (time1.id !== "milliseconds") {
		time2.innerHTML = "00";
		if (time1.id !== "seconds") {
			time3.innerHTML = "00";
			if (time1.id !== "minutes") {
				time4.innerHTML = "00";
			}
		}
	}
	
	if (time1.innerHTML < 9) {
		time1.innerHTML = "0" + (parseInt(time1.innerHTML) + 1);
	} else {
		time1.innerHTML = parseInt(time1.innerHTML) + 1;
	}
}
 
function pauseStopWatch() {
	clearInterval(milliseconds);
	lapButton.setAttribute("disabled", "true");
	start.removeAttribute("disabled");
	for (h = 0; h < time.length; h++) {
		time[h].classList.add("animate");
	}
	pause.setAttribute("disabled", "true");
	start.innerHTML = "Resume";
}

function resetStopWatch() {
	clearInterval(milliseconds);
	
	hr.innerHTML = "00";
	min.innerHTML = "00";
	sec.innerHTML = "00";
	ms.innerHTML = "00";
	lapCount.innerHTML = "";
	start.innerHTML = "Start";
	
	pause.setAttribute("disabled", "true");
	resetButton.setAttribute("disabled", "true");
	lapButton.setAttribute("disabled", "true");
	start.removeAttribute("disabled");
	
	for (i = 0; i < time.length; i++) {
		time[i].classList.remove("animate");
	}
}

function laps() {
	var totalTime = document.getElementsByClassName("marginRight");
	var timeDiff = document.getElementsByClassName("timeDiff");
	// To get HTML of last child:
	// document.querySelectorAll(".timeDiff:last-child")[0].innerHTML;
	var total = document.createElement("span");
	total.setAttribute("class", "marginRight");
	total.innerHTML = hr.innerHTML + ":" + min.innerHTML + ":" + sec.innerHTML + ":" + ms.innerHTML;
	lapCount.append(total);
	
	var br = document.createElement("br");
	if (totalTime.length > 1) {
		var timeMS = timeInMS();
		
		var Hour = parseInt(timeMS / 360000);
		if (Hour < 1) {
			Hour = "00";
		}
		var Minute = parseInt(timeMS / 6000);
		if (Minute < 1) {
			Minute = "00";
		} else {
			var minInHr = 0;
			if (parseInt(Minute) > 59) {
				while (Minute > 59) {
					Minute -= 60;
					minInHr++;
				}
				Hour = parseInt(Hour) + minInHr;
			}
			if (Minute.toString().length < 10) {
				Minute = "0" + Minute;
			}
		}
		var Second = getSeconds(timeMS);
		var Milliseconds = getMilliseconds(timeMS);
		
		var time = document.createElement("span");
		time.setAttribute("class", "timeDiff");
		time.innerHTML = Hour + ":" + Minute + ":" + Second + ":" + Milliseconds;
		lapCount.append(time);
		lapCount.append(br);
	} else {
		//lapCount.append(total);
		var total = document.createElement("span");
		total.setAttribute("class", "timeDiff");
		total.innerHTML = hr.innerHTML + ":" + min.innerHTML + ":" + sec.innerHTML + ":" + ms.innerHTML;
		lapCount.append(total);
		lapCount.append(br);
	}
}

function timeInMS() {
	var num2 = document.querySelectorAll(".marginRight"),
		numSecond2Last = num2[num2.length - 2].innerHTML,
		numLast = num2[num2.length - 1].innerHTML;	
	var arr1 = numSecond2Last.split(":");
	var arr2 = numLast.split(":");
	var time1 = (parseInt(arr1[0]) * 60 * 60 * 100) +
				(parseInt(arr1[1]) * 60 * 100) +
				(parseInt(arr1[2]) * 100) +
				parseInt(arr1[3]);
	var time2 = (parseInt(arr2[0]) * 60 * 60 * 100) +
				(parseInt(arr2[1]) * 60 * 100) +
				(parseInt(arr2[2]) * 100) +
				parseInt(arr2[3]);
	var msTime = time2 - time1;
	
	return msTime;
}

function getSeconds(time) {
	if (time > 6000) {
		while (time / 6000 > 1) {
			time -= 6000;
		}
	}
	// Now that the number is lower than 6000, get the first two digits of the number.
	if (time.toString().length > 2) {
		var x = secondsInNum(time);
		return x;
	} else {
		return "00";
	}
}

function secondsInNum(num) {
	if (num.toString().length > 3) {
		var firstDigit = num.toString()[0];
		var secondDigit = num.toString()[1];
		var x = firstDigit + secondDigit;
		return x;
	} else if (num.toString().length == 3) {
		return "0" + num.toString()[0];
	} else {
		return num;
	}
}

function getMilliseconds(time) {
	var remainder = time % 100;
	if (remainder < 10) {
		return "0" + remainder;
	} else {
		return remainder;
	}
}