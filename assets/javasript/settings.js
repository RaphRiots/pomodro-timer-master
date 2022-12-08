const focusTimeInput = document.querySelector("#focusTime");
const breakTimeInput = document.querySelector("#breakTime");
const pauseBtn = document.querySelector(".pause");

focusTimeInput.value = localStorage.getItem("focusTime");
breakTimeInput.value = localStorage.getItem("breakTime");
/* Here it will have the Eventlisteners for the btn's */
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("focusTime", focusTimeInput.value);
  localStorage.setItem("breakTime", breakTimeInput.value);
});

document.querySelector(".reset").addEventListener("click", () => {
/*startBtn will scale(1) the button back again,
  clearTimout will reset when reset will be necessary*/
  startBtn.style.transform = "scale(1)";
  clearTimeout(initial);
  setProgress(0);
  mindiv.textContent = 0;
  secdiv.textContent = 0;
});
 
pauseBtn.addEventListener("click", () => {
  if (paused === undefined) {
    return;
  }
  /*When it starts the timer, it will set the value
    of pauseed to false, get from Resume to Pause again
    and change the Class*/
  if (paused) {
    paused = false;
    initial = setTimeout("decremenT()", 60);
    pauseBtn.textContent = "PAUSE";
    pauseBtn.classList.remove("resume");
  } else {
  /*Else it will clearTimout(initial) and set paused to true
    and change the text in the btn to Resume and change the Class */
    clearTimeout(initial);
    pauseBtn.textContent = "RESUME";
    pauseBtn.classList.add("resume");
    paused = true;
  }
});