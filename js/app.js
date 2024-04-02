arr = [{ url: "Assets/audio/m1.m4a" }];
const PlayPause = document.querySelector("#pause");
const loop = document.querySelector("#loop");
const mutedBtn = document.querySelector("#muted");
const playBtn = document.querySelector("#playbtn");
let audio = new Audio();

// playPauseFn function
let click = 0;
const playPauseFn = () => {
  const newTime = progress.value;

  audio.src = arr[0].url;
  if (click === 0) {
    audio.play();
    click = 1;
    audio.currentTime = newTime;
    playBtn.src = "Assets/img/pause.svg";
  } else if (click === 1) {
    audio.pause();
    click = 0;

    playBtn.src = "Assets/img/play.svg";
    audio.currentTime = newTime;
  }
};

// loop music function
let Loop_Intreaction = 0;
const loopFn = () => {
  if (Loop_Intreaction === 0) {
    audio.loop = true;
    Loop_Intreaction = 1;
    console.log(audio.loop, "lopp", Loop_Intreaction);
  } else if (Loop_Intreaction === 1) {
    audio.loop = false;
    Loop_Intreaction = 0;
  }
};

// Muted the autio
let interaction = 0;
const muted = () => {
  if (interaction === 0) {
    audio.muted = true;
    interaction = 1;
  } else if (interaction === 1) {
    audio.muted = false;
    interaction = 0;
  }
};

// Timer strat and end or progress bar
const startTimer = document.querySelector("#start-time");
const endTime = document.querySelector("#end-time");
const progress = document.getElementById("progress");

audio.addEventListener("timeupdate", () => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  progress.addEventListener("input", () => {
    // Calculate the new time based on the value of the progress bar
    const newTime = progress.value;

    // Set the current time of the audio to the new time
    audio.currentTime = newTime;
  });

  const currentTimeFormatted = formatTime(audio.currentTime);
  const endTimeFormatted = formatTime(audio.duration);

  progress.max = audio.duration; // Set the maximum value to the total duration of the audio
  progress.value = audio.currentTime; // Set the current value of the progress bar to the current time of the audio

  startTimer.textContent = currentTimeFormatted;
  endTime.textContent = endTimeFormatted;
});

PlayPause.addEventListener("click", playPauseFn);
loop.addEventListener("click", loopFn);
mutedBtn.addEventListener("click", muted);
