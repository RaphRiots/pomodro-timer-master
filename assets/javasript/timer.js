const el = document.querySelector(".clock");
const bell = document.querySelector("audio");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
  let btn = localStorage.getItem("btn");


  /*If btn is focus, get focusTime from localStorage. If btn is not focus(else), 
    set Brake and get breakTime from localStorage.
    Then start timer with time limit (either focusTime or breakTime).
    With + it is converted to a Nummber*/
  if (btn === "focus") {
    mins = +localStorage.getItem("focusTime") || 1;
  } else {
    mins = +localStorage.getItem("breakTime") || 1;
  }
  /*Convert minutes to Seconds */
  seconds = mins * 60;
  totalsecs = mins * 60;
  /*Set Timer to decrement(function)  */
  setTimeout(decremenT(), 60);
  /* Set scale to 0 after button got Pressed. (It will disappear) */
  startBtn.style.transform = "scale(0)";
  /*After Timer is started, paused will be set to false */
  paused = false;
});

function decremenT() {
  /*If seconds is 116,then Math.floor(seconds/60) will be 1 */
  mindiv.textContent = Math.floor(seconds / 60);
  /*Divide 2 Nummbers and get the rest of it. 
    The 0$ puts a Zero(0) before the number if it is >9*/
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  /*If it dont check and remove the danger Class from circle,
    then it will start the timer once again without reloading
    the page.*/
  if (circle.classList.contains("danger")) {
    circle.classList.remove("danger");
  }
  /*If seconds > 0  it will run the Timer and decrement*/
  if (seconds > 0) {
  /*Calculates the percentage, it will substract the seconds from
    totalsecsonds, and then divide it by totalseconds and
    multiply by 100.
    Math.ceil ensures the number will be a whole number
    between 0 & 100*/
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    setProgress(perc);
    seconds--;
  /*Also setTimout("decremenT") to initial variable so that later 
    on for pausing and reseting, we can acces this Timout.
    Every 1 sec, this decremenT() function will be called, 
    textContent for min, secs will be reassignend, seconds will be
    decremented by 1 and later circular progress will be set until 
    seconds reaches 0  */
    initial = window.setTimeout("decremenT()", 1000);
    if (seconds < 10) {
    /*If seconds is < 10, it will add this danger Class(ring becomes Red)
    Like above seen*/
      circle.classList.add("danger");
    }
  } else {
  /*If seconds reaches 0, then mins and seconds will be reset to 0
    and the bell will be played(HeyListen).
    Then it will get the "btn" from localStorage and if btn is on
    Focus,therefore the timer ran for focusTime, next we will start 
    the timer for braekTime so it will set btn's value to "break on 
    localStorage else vice-versa for if btn is break"  */
    mins = 0;
    seconds = 0;
    bell.play();
    let btn = localStorage.getItem("btn");
  /*If focus timer is 0, the button will change to break  */
    if (btn === "focus") {
      startBtn.textContent = "BREAK";
      startBtn.classList.add("break");
      localStorage.setItem("btn", "break");
    } else {
  /*If break timer is 0, the button will change to focus  */
      startBtn.classList.remove("break");
      startBtn.textContent = "FOCUS";
      localStorage.setItem("btn", "focus");
    }
    /*startBtn should be shown again */
    startBtn.style.transform = "scale(1)";
  }
}
